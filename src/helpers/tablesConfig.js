/* eslint-disable import/prefer-default-export */
import _ from "lodash";

export const tableConfig = (type, data) => {
  const lookupMovies = mapSelectable(["Star Wars", "Harry Potter"]);
  console.log(lookupMovies);
  switch (type) {
    case "booking":
      return {
        title: `Table ${type}`,
        columns: [
          { title: "Movie Title", field: "movieTitle" },
          { title: "Movie Start Time", field: "movieStartTime" },
          { title: "Room", field: "room" }
        ],
        data: [
          {
            movieTitle: "Start Wars",
            movieStartTime: "10-10-2020 18:30",
            room: 3
          },
          {
            movieTitle: "Start Wars",
            movieStartTime: "10-10-2020 18:30",
            room: 2
          }
        ]
      };
    case "movie":
      return {
        title: `Table ${type}`,
        columns: [
          { title: "Movie Title", field: "movieTitle" },
          { title: "Duration", field: "duration" },
          { title: "Room", field: "room" }
        ],
        data: [
          {
            movieTitle: "Start Wars",
            duration: "200",
            room: 3
          },
          {
            movieTitle: "Start Wars",
            duration: "200",
            room: 2
          }
        ]
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
        data: [
          {
            movieTitle: 0,
            movieStartTime: "10-10-2020 10:30",
            duration: "200",
            room: 3
          },
          {
            movieTitle: 1,
            movieStartTime: "10-10-2020 10:30",
            duration: "200",
            room: 2
          }
        ]
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
