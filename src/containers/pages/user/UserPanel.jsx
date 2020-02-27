import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import _ from "lodash";
import TableWithActions from "../../../components/TableWithActions";

import { enabledActions } from "./userData";

import {
  getMovies,
  fetchPlays,
  fetchBookings,
  fetchPrices,
  editMovie
} from "../../../api/fetchData";

class UserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingsData: [],
      movieData: [],
      playData: [],
      priceData: [],
      type: ""
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("USER_ID");
    getMovies().then(data => {
      this.setState({ movieData: data });
    });
    fetchPlays().then(data => {
      this.setState({ playData: data });
    });

    fetchBookings(userId).then(data => {
      this.setState({ bookingsData: data });
    });

    fetchPrices().then(data => {
      this.setState({ priceData: data });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      fetchBookings(this.props.user.userId).then(data => {
        this.setState({ bookingsData: data });
      });
    }
  }

  editAction = (rowData, type) => {
    switch (type) {
      case "movie":
        // eslint-disable-next-line no-case-declarations
        const movie = {
          id: rowData.movieId,
          duration: rowData.duration,
          name: rowData.movieTitle
        };
        editMovie(movie).then(() =>
          getMovies().then(movies => this.setState({ movieData: movies }))
        );
        break;
      default:
        break;
    }
  };

  render() {
    const { movieData, bookingsData, playData, priceData } = this.state;
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
                  priceData={priceData}
                  editAction={this.editAction}
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
