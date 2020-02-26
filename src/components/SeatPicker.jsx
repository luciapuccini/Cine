import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import { Button } from "@material-ui/core";
import _ from "lodash";
import { fetchPlay, getPlayBookedSeats } from "../api/fetchData";

const buildRows = takenSeats => {
  const rows = [];
  const ids = takenSeats.map(seat => seat);
  let otro = 1;
  for (let seat = 0; seat < 6; seat++) {
    const column = [];
    for (let i = 1; i < 13; i++) {
      if (i === 4 || i === 9) {
        column.push(null);
      } else {
        column.push({
          id: otro,
          number: otro,
          isReserved: ids.includes(otro)
        });
        ++otro;
      }
    }
    rows.push(column);
  }
  return rows;
};

const buildTaken = taken => {
  const real = [];
  taken.forEach(seat => {
    real.push(seat.seatPk.seatId);
  });
  return real;
};

class CustomSeatPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      play: {},
      selectedSeats: [],
      rows: [],
      takenSeats: []
    };
  }

  componentDidMount() {
    const { playPK } = this.props.selectedPlay;
    const play = fetchPlay(playPK);
    const takenSeats = getPlayBookedSeats(playPK);

    play.then(play => {
      this.setState({ play });
    });
    takenSeats.then(taken => {
      const rows = buildRows(buildTaken(taken));
      this.setState({ rows });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { playPK } = this.props.selectedPlay;

    if (prevState.play !== this.state.play) {
      const takenSeats = getPlayBookedSeats(playPK);
      takenSeats.then(taken => {
        console.log("tengo takens2", taken);
        const rows = buildRows(buildTaken(taken));
        this.setState({ rows });
      });
    }
  }

  addSeatCallback = (row, number, id, cb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise(resolve => setTimeout(resolve, 100));

        cb(row, number);
        this.setState(prevState => ({
          loading: false,
          selectedSeats: [...prevState.selectedSeats, id]
        }));
      }
    );
    this.props.selectSeat(id);
  };

  render() {
    const { rows, play } = this.state;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        {play && !_.isEmpty(rows) ? (
          <>
            <SeatPicker
              addSeatCallback={this.addSeatCallback}
              rows={rows}
              maxReservableSeats={60}
              alpha
              visible
              selectedByDefault
            />
          </>
        ) : null}
      </div>
    );
  }
}
export default CustomSeatPicker;
