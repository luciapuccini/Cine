import React, { Component } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import _ from "lodash";
import { axios } from "axios";
import BookingSummary from "./pages/booking/BookingSummary";
import StepperProgress from "../components/StepperProgress";

// import { getUserId } from "../helpers/authHelper"; TODO
import { createBooking, fetchMovie } from "../api/fetchData";
import { getAuthHeaders, getJWT } from "../helpers/authHelper";

export default class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: {},
      moviePlays: [],
      selectedPlay: {},
      selectedSeat: 0
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const movie = fetchMovie(id);

    movie.then(mov => {
      this.setState({
        moviePlays: mov,
        selectedMovie: !_.isEmpty(mov)
          ? mov[0].movie
          : { name: "No plays to show" }
      });
    });
  }

  selectPlay = play => {
    this.setState({ selectedPlay: play });
  };

  selectSeat = seat => {
    console.log("[ SELECT SEAT x1 ]", seat);
    this.setState({ selectedSeat: seat }, () => this.makeTemporalBooking());
  };

  makeTemporalBooking = () => {
    const { room, playPK } = this.state.selectedPlay;
    console.log(this.state.selectedPlay);
    const temporalBooking = {
      seatId: this.state.selectedSeat,
      roomId: room,
      userId: localStorage.getItem("USER_ID"),
      playPK
    };
    console.log("[ temp book ]", temporalBooking);
  };

  confirmBook = () => {
    // const { selectedSeats, selectedPlay } = this.state;
    // const book = this.buildBook(selectedSeats, selectedPlay.playPK);
    // const resp = createBooking(book);
    // resp.then();
  };

  buildBook = (seats, playPk) => {
    return {
      bookDate: new Date().toISOString(),
      seats,
      playPk
      // userId: getUserId()
    };
  };

  render() {
    const {
      moviePlays,
      selectedMovie,
      selectedPlay,
      selectedSeats
    } = this.state;
    return (
      <>
        <Grid container justify="space-around" spacing={2}>
          <Grid item xs={4}>
            {selectedMovie ? (
              <BookingSummary
                selectedMovie={selectedMovie}
                selectedPlay={selectedPlay}
                selectedSeats={selectedSeats}
                onConfirm={() => this.confirmBook()}
              />
            ) : (
                <CircularProgress />
              )}
          </Grid>
          <Grid item xs={8}>
            <StepperProgress
              playData={moviePlays}
              selectPlay={this.selectPlay}
              selectedPlay={selectedPlay}
              selectSeat={this.selectSeat}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}
