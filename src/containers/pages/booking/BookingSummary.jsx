import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

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
    const { selectedMovie } = this.props;
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
              {selectedMovie ? `MOVIE: ${selectedMovie.title}` : null}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              PLAY TIME: 10/10/2020 20:30
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Confirm
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default BookingSummary;
