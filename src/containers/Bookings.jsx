import React, { Component } from "react";
import { Grid, CircularProgress } from "@material-ui/core";

import BookingSummary from "../containers/pages/booking/BookingSummary";
import PlayList from "../containers/pages/play/PlayList";
import StepperProgress from "../components/StepperProgress";

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
    // const { id } = this.props.match.params;
    // llego con el id de la peli, fetch data de esa plays con em movie id /plays
    fetch(`http://www.mocky.io/v2/5e3b7069300000620021456f`)
      .then(response => response.json())
      .then(jsonArray => {
        this.setState({
          moviePlays: jsonArray,
          selectedMovie: jsonArray[0].movie
        });
      });
  }

  selectPlay = play => {
    console.log("selecionaste play:", play);
    this.setState({ selectedPlay: play });
  };

  selectSeats = seats => {
    console.log("selecionaste seats:", seats);
    this.setState({ selectedSeats: seats });
  };

  confirmBook = () => {
    const { selectedSeats, selectedPlay } = this.state;
    const book = this.buildBook(selectedSeats, selectedPlay.movieStartTime);
    console.log("BOOK:", book);
  };

  buildBook = (seats, start) => {
    return {
      bookDate: new Date(),
      seats
      // playPK
      //id user
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
              takenSeats={selectedPlay.takenSeats}
              selectSeats={this.selectSeats}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}
