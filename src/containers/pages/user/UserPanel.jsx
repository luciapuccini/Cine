import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TableWithActions from "../../../components/TableWithActions";

import _ from "lodash";

import { enabledActions } from "./userData";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));



const getmovieData = async(movieData,setMovieData) => {
  var data = [];
  const response = await fetch("http://localhost:8080/movies/all")
  const json = await response.json();
  
          json.forEach(entry =>
            {

              setMovieData((oldData) => [...oldData, {
                movieTitle: entry.name, 
               duration: entry.duration,
               synopsis: entry.synopsis
              }]
                
              )
            })
};


/*
              data.push(
              {
                movieTitle: entry.name, 
               duration: entry.duration,
               synopsis: entry.synopsis
              })
            })
*/


const UserPanel = () => {
  const classes = useStyles();
  const [movieData, setMovieData]= useState([])
  getmovieData(movieData,setMovieData)

  return (
    <div className={classes.root}>
      {_.map(enabledActions(), action => {
        return (
          <ExpansionPanel key={action.type}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                {action.title}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TableWithActions type={action.type} bookingsData = {JSON.parse(localStorage.getItem("user")).books} movieData = {movieData} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
};
export default UserPanel;
