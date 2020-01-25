import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import movieData from "../helpers/movieData";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
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

const Landing = () => {
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
                <IconButton
                  aria-label={`info about ${movie.title}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default Landing;
