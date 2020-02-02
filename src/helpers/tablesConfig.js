/* eslint-disable import/prefer-default-export */
import _ from "lodash";

const buildBookingsData = () => {
  const data = JSON.parse(localStorage.getItem("user")).books;
  let data2 = [];
  data.forEach(book => {
    let { play } = book;
    if (play) {
      data2.push({
        movieTitle: play.movie.name,
        movieStartTime: play.playPK.startTime,
        room: play.room.id
      });
    } else {
      return [];
    }
  });
  return data2;
};

const buildMoviesData = data => {
  const formated = [];
  data.forEach(movie => {
    formated.push({
      movieTitle: movie.name,
      duration: movie.duration,
      synopsis: movie.synopsis
    });
  });
  return formated;
};

const buildPlaysData = (data, lookup) => {
  console.log(data, "plays");
  const formated = [];

  data.forEach((play, index) => {
    let movieId = play.movie.name === lookup[index] ? index : null;
    formated.push({
      movieTitle: movieId,
      duration: play.movie.duration,
      movieStartTime: play.playPK.startTime,
      room: play.sala.id
    });
  });
  console.log(formated, "asdas");
  return formated;
};

export const tableConfig = (type, bookingsData, movieData, playData) => {
  const lookupMovies = mapSelectableMovies(movieData);

  switch (type) {
    case "booking":
      return {
        title: `Table ${type}`,
        columns: [
          { title: "Movie Title", field: "movieTitle" },
          { title: "Movie Start Time", field: "movieStartTime" },
          { title: "Room", field: "room" }
        ],
        data: buildBookingsData()
      };
    case "movie":
      return {
        title: `Table ${type}`,
        columns: [
          { title: "Movie Title", field: "movieTitle" },
          { title: "Duration", field: "duration" },
          { title: "Synopsis", field: "synopsis" }
        ],
        data: buildMoviesData(movieData)
      };
    case "play":
      return {
        title: `Table ${type}`,
        columns: [
          {
            title: "Movie Title",
            field: "movieTitle",
            lookup: lookupMovies
          },
          { title: "Duration", field: "duration" },
          { title: "Movie Start Time", field: "movieStartTime" },
          { title: "Room", field: "room" }
        ],
        data: buildPlaysData(playData, lookupMovies)
      };
    default:
      return {};
  }
};

const mapSelectableMovies = movies => {
  let lookup = {};
  movies.forEach((movie, index) => {
    lookup[index] = movie.name;
  });
  console.log("arma", lookup);
  return lookup;
};
