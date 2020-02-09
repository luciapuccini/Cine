import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import _ from "lodash";
// movie
// {
//   nombre,
//   path,
//   sinopsis,
//   duracion,
// }

class BookingSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      selectedMovie,
      selectedPlay,
      selectedSeats,
      onConfirm
    } = this.props;
    console.log("COMPLETANDO EL SUMMARY", selectedMovie, selectedPlay);
    return (
      <Card>
        <CardActionArea>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {selectedMovie.url ? (
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                image={selectedMovie.url}
                title="Selected Movie"
                className=""
              />
            ) : (
              <CircularProgress />
            )}
          </div>

          <CardContent>
            <Typography gutterBottom variant="h5" color="primary">
              Movie Summary
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {selectedMovie ? `MOVIE: ${selectedMovie.name}` : null}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {!_.isEmpty(selectedPlay)
                ? `PLAY: ${selectedPlay.movieStartTime} `
                : null}
            </Typography>
            {!_.isEmpty(selectedSeats) ? (
              <>
                <Typography variant="body2" color="textSecondary">
                  SEATS:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {selectedSeats.map(seat => `${seat},  `)}
                </Typography>
              </>
            ) : null}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => onConfirm()}>
            Confirm
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default BookingSummary;
