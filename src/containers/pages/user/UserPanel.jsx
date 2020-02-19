import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import _ from "lodash";
import TableWithActions from "../../../components/TableWithActions";

import { enabledActions } from "./userData";
// import { getUserId } from "../../../helpers/authHelper";
import {
  getMovies,
  fetchPlays,
  fetchBookings,
  deleteMovie,
  deleteBooking,
  deletePlay
} from "../../../api/fetchData";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

class UserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingsData: [],
      movieData: [],
      playData: []
    };
  }

  componentDidMount() {
    const userId = ""; //TODO
    getMovies().then(data => {
      this.setState({ movieData: data });
    });
    fetchPlays().then(data => {
      this.setState({ playData: data });
    });
    fetchBookings(userId).then(data => {
      this.setState({ bookingsData: data });
    });
  }
  // Move HERE
  /*   deleteAction = rowData => {
    const { type } = this.state;
    const { bookId } = rowData;
    const { movieId } = rowData;
    const { playPK } = rowData;
    switch (type) {
      case "booking":
        deleteBooking(bookId);
        break;
      case "movie":
        deleteMovie(movieId);
        break;
      case "play":
        deletePlay(playPK);
        break;
      default:
        break;
    }
  }; */

  editAction = data => {};

  render() {
    // const classes = useStyles();
    const { movieData, bookingsData, playData } = this.state;
    return (
      <div>
        {_.map(enabledActions(), action => {
          return (
            <ExpansionPanel key={action.type}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>{action.title}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TableWithActions
                  type={action.type}
                  movieData={movieData}
                  playData={playData}
                  bookingsData={bookingsData}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}
export default UserPanel;
