import React, { Component } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import _ from "lodash";
import BookingSummary from "./pages/booking/BookingSummary";
import StepperProgress from "../components/StepperProgress";

import {
  createBooking,
  fetchMovie,
  bookTemporalSeat,
  getCurrentPrices
} from "../api/fetchData";

export default class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: {},
      moviePlays: [],
      selectedPlay: {},
      selectedSeat: 0,
      regularPrice: 0,
      superPrice: 0,
      total: 0
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
    getCurrentPrices().then(res => {
      this.setState({
        regularPrice: res.regularSeatPrice,
        superPrice: res.superSeatprice
      });
    });
  }

  selectPlay = play => {
    this.setState({ selectedPlay: play });
  };

  selectSeat = seat => {
    this.setState({ selectedSeat: seat }, () => this.makeTemporalBooking());
  };

  makeTemporalBooking = () => {
    const { regularPrice, superPrice } = this.state;
    const { room, playPK } = this.state.selectedPlay;
    const { pathName } = this.props.history;
    console.log("redirec on error", pathName);
    const temporalBooking = {
      seatId: this.state.selectedSeat,
      roomId: room,
      userId: localStorage.getItem("USER_ID"),
      playPk: playPK
    };

    bookTemporalSeat(temporalBooking).then(seat => {
      const price = seat.isSuperSeat ? superPrice : regularPrice;
      this.setState(state => ({ total: state.total + price }));
    });
  };

  confirmBook = () => {
    const { selectedPlay } = this.state;
    const userId = localStorage.getItem("USER_ID");
    const book = this.buildBook(userId, selectedPlay.playPK);
    createBooking(book);
  };

  buildBook = (userId, playPk) => {
    return {
      bookDate: new Date().toISOString(),
      playPk,
      userId
    };
  };

  render() {
    const {
      moviePlays,
      selectedMovie,
      selectedPlay,
      selectedSeat,
      total
    } = this.state;
    return (
      <>
        <Grid container justify="space-around" spacing={2}>
          <Grid item xs={4}>
            {selectedMovie ? (
              <BookingSummary
                selectedMovie={selectedMovie}
                selectedPlay={selectedPlay}
                selectedSeat={selectedSeat}
                total={total}
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
