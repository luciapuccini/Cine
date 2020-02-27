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

const classes = {
  cardArea: {
    display: "flex",
    alignItems: "flex-start"
  }
};

class BookingSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      selectedMovie,
      selectedPlay,
      selectedSeat,
      total,
      onConfirm
    } = this.props;
    const placeholder = require("../../../assets/placeholder.png");
    return (
      <Card style={{ display: "flex", flexDirection: "column" }}>
        <CardActionArea style={classes.cardArea}>
          <div style={{ width: "50%" }}>
            <CardMedia
              component="img"
              alt="Selected Movie"
              image={selectedMovie.imagePath || placeholder}
              title="Selected Movie"
            />
          </div>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div>
              <Typography
                gutterBottom
                variant="h5"
                color="primary"
                style={{ margin: "5px" }}
              >
                Movie Summary
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginTop: "20px" }}
              >
                {selectedMovie ? `MOVIE: ${selectedMovie.name}` : null}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginTop: "20px" }}
              >
                {!_.isEmpty(selectedPlay)
                  ? `PLAY: ${selectedPlay.movieStartTime} `
                  : null}
              </Typography>
              {selectedSeat ? (
                <>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginTop: "20px" }}
                  >
                    SEAT:
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedSeat}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginTop: "20px" }}
                  >
                    Total cost: $ 
{' '}
{total}
                  </Typography>
                </>
              ) : null}
            </div>
          </CardContent>
        </CardActionArea>

        <Button
          size="small"
          variant="outlined"
          style={{ alignSelf: "flex-end", color: "green", margin: "10px" }}
          onClick={() => onConfirm()}
        >
          Confirm
        </Button>
      </Card>
    );
  }
}

export default BookingSummary;
