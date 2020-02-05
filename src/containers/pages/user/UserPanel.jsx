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
import { getMovies, fetchPlays } from "../../../api/fetchData";

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
      // bookingsData: JSON.parse(localStorage.getItem("user")).books, //TODO: mocky
      bookingsData: [],
      movieData: [],
      playData: []
    };
  }

  componentDidMount() {
    getMovies().then(data => {
      this.setState({ movieData: data });
    });
    fetchPlays().then(data => {
      this.setState({ playData: data });
    });
  }

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
