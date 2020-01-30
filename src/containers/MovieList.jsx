import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import BookMark from "@material-ui/icons/Bookmark";
import movieData from "../helpers/movieData";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
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
  }
}));

const MovieList = () => {
  const classes = useStyles();
  //FIXME: missing real data
  const image = require("../assets/rick.png");
  return (
    <div className={classes.root}>
      <GridList cellHeight={400} spacing={30} className={classes.gridList}>
        {movieData.map(movie => (
          <GridListTile key={movie.img}>
            <img src={image} alt={movie.title} />
            <GridListTileBar
              className={classes.gridListTile}
              title={movie.title}
              actionIcon={
                <Link
                  className={classes.buttonLink}
                  to={{
                    pathname: `/app/bookings/${movie.id}`
                  }}
                >
                  <IconButton
                    aria-label={`info about ${movie.title}`}
                    className={classes.icon}
                  >
                    <BookMark />
                  </IconButton>
                </Link>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default MovieList;
