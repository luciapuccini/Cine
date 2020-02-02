/* eslint-disable import/prefer-default-export */
import _ from "lodash";

const buildBookingsData = data => {
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

const buildPlaysData = data => {
  const formated = [];

  data.forEach((play, index) => {
    formated.push({
      movieTitle: index,
      duration: play.movie.duration,
      movieStartTime: play.playPK.startTime,
      room: play.sala.id
    });
  });
  return formated;
};

export const tableConfig = (type, bookingsData, movieData, playData) => {
  const lookupMovies = mapSelectable(["Star Wars", "Harry Potter"]);

  switch (type) {
    case "booking":
      return {
        title: `Table ${type}`,
        columns: [
          { title: "Movie Title", field: "movieTitle" },
          { title: "Movie Start Time", field: "movieStartTime" },
          { title: "Room", field: "room" }
        ],
        data: buildBookingsData(JSON.parse(localStorage.getItem("user")).books)
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
        data: buildPlaysData(playData)
      };
    default:
      return {};
  }
};

const mapSelectable = titles => {
  let lookup = {};
  titles.forEach((movie, index) => {
    lookup[index] = movie;
  });

  return lookup;
};
