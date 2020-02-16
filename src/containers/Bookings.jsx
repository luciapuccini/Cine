import React, { Component } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import _ from "lodash";
import BookingSummary from "./pages/booking/BookingSummary";
import StepperProgress from "../components/StepperProgress";

import { getUserId } from "../helpers/authHelper";
import { createBooking } from "../api/fetchData";

export default class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: {},
      moviePlays: [],
      selectedPlay: {},
      selectedSeats: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    // llego con el id de la peli, fetch data de esa plays con em movie id /plays
    fetch(`http://localhost:8080/movies/${id}`)
      .then(response => response.json())
      .then(jsonArray => {
        this.setState({
          moviePlays: jsonArray,
          selectedMovie: !_.isEmpty(jsonArray)
            ? jsonArray[0].movie
            : { name: "no plays to show" }
        });
      });
  }

  selectPlay = play => {
    this.setState({ selectedPlay: play });
  };

  selectSeats = seats => {
    this.setState({ selectedSeats: seats });
  };

  confirmBook = () => {
    const { selectedSeats, selectedPlay } = this.state;
    const book = this.buildBook(selectedSeats, selectedPlay.playPK);
    const resp = createBooking(book);
    // resp.then();
  };

  buildBook = (seats, playPk) => {
    return {
      bookDate: new Date().toISOString(),
      seats,
      playPk,
      userId: getUserId()
    };
  };

  render() {
    // mostrar: horarios play de esa movie, seats disponibles, resumen costos
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
              selectSeats={this.selectSeats}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}
