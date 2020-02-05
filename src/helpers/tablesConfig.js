/* eslint-disable import/prefer-default-export */
import _ from "lodash";

const buildBookingsData = () => {
  const data = JSON.parse(localStorage.getItem("user")).books;
  const data2 = [];
  data.forEach(book => {
    const { play } = book;
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

export const buildPlaysData = (data, lookup) => {
  const formated = [];
  if (!_.isEmpty(data)) {
    console.log(data, "data");
    data.forEach((play, index) => {
      console.log(play);
      const movieId = play.movie.name === lookup[index] ? index : null;
      formated.push({
        movieTitle: movieId,
        duration: play.movie.duration,
        movieStartTime: play.playPk.startTime, // WARNING: CHECK PK vs Pk
        room: play.sala.id
      });
    });
  }

  return formated;
};

export const tableConfig = (type, movieData, playData) => {
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
  const lookup = {};
  movies.forEach((movie, index) => {
    lookup[index] = movie.name;
  });
  return lookup;
};
