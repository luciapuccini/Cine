import React, { useState, useEffect } from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import BookMark from "@material-ui/icons/Bookmark";
import { Link } from "react-router-dom";
import { getMovies } from "../api/fetchData";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginTop: "20px"
  },
  gridList: {
    width: "100%",
    height: "100%"
  },
  gridListTile: {
    opacity: 0.9,
    backgroundColor: "#77777a"
  },
  icon: {
    color: "#fff"
  },
  box: {
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

const MovieList = () => {
  const classes = useStyles();
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    const movies = getMovies();
    movies.then(movies => {
      setMovieData(movies);
    });
  }, []);

  const getImage = movie => {
    const placeholder = require("../assets/placeholder.png");
    console.log(_.isEmpty(movie.imagePath), placeholder);
    if (_.isEmpty(movie.imagePath)) {
      return placeholder;
    }
    // const image = `http://localhost:8080/movies/image/download/${movie.movieId}`;
    return !_.isEmpty(false) ? placeholder : placeholder;
  };

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={500}
        spacing={30}
        cols={3}
        className={classes.gridList}
      >
        {movieData.map(movie => (
          <GridListTile key={movie.movieId}>
            <img
              src={getImage(movie)}
              className={classes.box}
              alt={movie.title}
              key={movie.movieId}
            />
            <GridListTileBar
              className={classes.gridListTile}
              title={movie.name}
              actionIcon={(
                <Link
                  className={classes.buttonLink}
                  to={{
                    pathname: `/app/bookings/${movie.movieId}`
                  }}
                >
                  <IconButton
                    aria-label={`info about ${movie.title}`}
                    className={classes.icon}
                  >
                    <BookMark />
                  </IconButton>
                </Link>
              )}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default MovieList;
