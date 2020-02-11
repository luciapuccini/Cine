import React, { Component } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Paper,
  CircularProgress
} from "@material-ui/core";
import _ from "lodash";
import TableWithActions from "../../../components/TableWithActions";

class PlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playData: {}
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playData !== this.props.playData) {
      this.setState({ playData: this.props.playData });
    }
    return null;
  }

  render() {
    const { playData, selectPlay } = this.props;
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {!_.isEmpty(playData) ? (
            <>
              <Typography>{playData[0].movie.title}</Typography>
              <TableWithActions
                playData={playData}
                movieData={[]}
                type="play"
                onlyRequest
                selectPlay={selectPlay}
              />
            </>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    );
  }
}
export default PlayList;
