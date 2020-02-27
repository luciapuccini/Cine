/* eslint-disable lines-between-class-members */
import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import moment from "moment";

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

  formatPlay = play => {
    return {
      date: moment(play).format("dddd, MMMM Do YYYY"),
      time: moment(play).format("h:mm a")
    };
  };
  render() {
    const {
      selectedMovie,
      selectedPlay,
      selectedSeat,
      total,
      onConfirm
    } = this.props;

    const placeholder = require("../../../assets/placeholder.png");
    const { date, time } = this.formatPlay(selectedPlay.movieStartTime);

    return (
      <Card style={{ display: "flex", flexDirection: "row" }}>
        <CardMedia
          component="img"
          alt="Selected Movie"
          image={selectedMovie.imagePath || placeholder}
          title="Selected Movie"
          style={{ display: "flex", maxWidth: "180px" }}
        />

        <CardActionArea style={classes.cardArea}>
          <CardContent
            style={{
              display: "flex"
            }}
          >
            <div>
              <Typography gutterBottom variant="h5" color="primary">
                Movie Summary
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                style={{ marginTop: "20px" }}
              >
                {selectedMovie ? `MOVIE: ${selectedMovie.name}` : null}
              </Typography>
              {!_.isEmpty(selectedPlay) ? (
                <>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ marginTop: "20px" }}
                  >
                    DATE: {date}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ marginTop: "20px" }}
                  >
                    TIME: {time}
                  </Typography>
                </>
              ) : null}
              {selectedSeat ? (
                <>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ marginTop: "20px" }}
                  >
                    SEAT: {selectedSeat}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginTop: "20px" }}
                  >
                    Total cost: $ {total}
                  </Typography>
                </>
              ) : null}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default BookingSummary;
