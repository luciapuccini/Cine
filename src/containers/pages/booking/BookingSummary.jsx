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

const BookingSummary = ({ selectedMovie }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {selectedMovie.url ? (
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              image={selectedMovie.url}
              title="Selected Movie"
              className={classes.media}
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
            MOVIE: {selectedMovie.title}
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
};
export default BookingSummary;
