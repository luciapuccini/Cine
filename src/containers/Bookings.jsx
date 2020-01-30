import React, { Component } from "react";
import { Grid, CircularProgress } from "@material-ui/core";

import BookingSummary from "../containers/pages/booking/BookingSummary";
import BookingProgress from "../containers/pages/booking/BookingProgress";
import PlayList from "../containers/pages/play/PlayList";

export default class Bookings extends Component {
  // [{
  //   playPk: {
  //     movieId: "1",
  //     salaId: "1",
  //     startTime: ""
  //   },
  //   endTime: "",
  //   movie: {
  //     movieId: "1",
  //     title: "falopa",
  //     duracion:200,
  //     path:'fafa.com'
  //   },

  // }]

  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: {},
      moviePlays: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    // llego con el id de la peli, fetch data de esa plays con em movie id /plays
    fetch(`http://www.mocky.io/v2/5e30fe37320000790088822b`)
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
  };

  render() {
    // mostrar: horarios play de esa movie, seats disponibles, resumen costos
    const { moviePlays, selectedMovie } = this.state;
    return (
      <>
        <Grid container justify="space-around" spacing={2}>
          <Grid item xs={4}>
            {selectedMovie ? (
              <BookingSummary selectedMovie={selectedMovie} />
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Grid item xs={8}>
            {moviePlays ? (
              <PlayList moviePlays={moviePlays} selectPlay={this.selectPlay} />
            ) : (
              <CircularProgress />
            )}
            {/* <BookingProgress /> */}
          </Grid>
        </Grid>
      </>
    );
  }
}
