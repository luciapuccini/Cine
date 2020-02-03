import React, { Component } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Paper
} from "@material-ui/core";
import _ from "lodash";
import TableWithActions from "../../../components/TableWithActions";

class PlayList extends Component {
  render() {
    const { playData, selectPlay } = this.props;
    console.log("STEPER", playData);

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {!_.isEmpty(playData) ? (
            <ExpansionPanel key="play">
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>{playData[0].movie.title}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TableWithActions
                  playData={playData}
                  type="play"
                  onlyRequest
                  selectPlay={selectPlay}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ) : null}
        </Grid>
      </Grid>
    );
  }
}
export default PlayList;
