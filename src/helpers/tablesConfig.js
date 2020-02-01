/* eslint-disable import/prefer-default-export */
import _ from "lodash";

const buildBookingsData = (data) => {
  console.log("entre");
  console.log(data);
  let data2 = [];
  data.forEach(book => {
   let {play} = book
    data2.push({movieTitle: play.movie.name, 
            movieStartTime: play.playPK.startTime,
            room: play.room.id})
  })
  return data2;
} 

const buildMoviesData =  () => {
 return[]
      
}

export const tableConfig = (type, bookingsData, movieData) => {
  
  const lookupMovies = mapSelectable(["Star Wars", "Harry Potter"]);
console.log('siiii', movieData )

  switch (type) {
    case "booking":
      return {
        title: `Table ${type}`,
        columns: [
          { title: "Movie Title", field: "movieTitle" },
          { title: "Movie Start Time", field: "movieStartTime" },
          { title: "Room", field: "room" }
        ],
        data: buildBookingsData(bookingsData)
      };
    case "movie":
      return {
        title: `Table ${type}`,
        columns: [
          { title: "Movie Title", field: "movieTitle" },
          { title: "Duration", field: "duration" },
          { title: "Synopsis", field: "synopsis" }
        ],
        data: [movieData]
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
