/* eslint-disable import/prefer-default-export */
export const tableConfig = type => {
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
            lookup: { 1: "Star Wars 1", 2: "Star Wars 2" }
          },
          { title: "Duration", field: "duration" },
          { title: "Movie Start Time", field: "movieStartTime" },
          { title: "Room", field: "room" }
        ],
        data: [
          {
            movieTitle: 1,
            movieStartTime: "10-10-2020 10:30",
            duration: "200",
            room: 3
          },
          {
            movieTitle: 2,
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
