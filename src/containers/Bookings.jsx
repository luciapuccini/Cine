import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import BookingSummary from "../containers/pages/booking/BookingSummary";
import BookingProgress from "../containers/pages/booking/BookingProgress";

export default class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    // llego con el id de la peli, fetch data de esa peli
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then(response => response.json())
      .then(json => this.setState({ selectedMovie: json }));
  }

  render() {
    // mostrar: horarios play de esa movie, seats disponibles, resumen costos
    const { selectedMovie } = this.state;

    return (
      <>
        <Grid container justify="space-around" spacing={2}>
          <Grid item xs={4}>
            <BookingSummary selectedMovie={selectedMovie} />
          </Grid>
          <Grid item xs={8}>
            <BookingProgress />
          </Grid>
        </Grid>
      </>
    );
  }
}
