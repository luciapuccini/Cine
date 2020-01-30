import React, { Component } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import _ from "lodash";
import TableWithActions from "../../../components/TableWithActions";

class PlayList extends Component {
  render() {
    const { moviePlays, selectPlay } = this.props;

    return (
      <div>
        {!_.isEmpty(moviePlays) ? (
          <ExpansionPanel key="play">
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>{moviePlays[0].movie.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TableWithActions
                data={moviePlays}
                type="play"
                onlyRequest
                selectPlay={selectPlay}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ) : null}
      </div>
    );
  }
}
export default PlayList;
