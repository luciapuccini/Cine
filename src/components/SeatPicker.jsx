import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import { Button } from "@material-ui/core";
import _ from "lodash";
import { fetchPlay, getPlayBookedSeats } from "../api/fetchData";

const buildRows = takenSeats => {
  const rows = [];
  const superSeats = [24, 25, 26, 27, 34, 35, 36, 37];
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
          isReserved: ids.includes(otro),
          tooltip: superSeats.includes(otro) ? "SUPER" : ""
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
        const rows = buildRows(buildTaken(taken));
        this.setState({ rows });
      });
    }
  }

  addSeatCallback = ({ row, number, id }, addCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        addCb(row, number, id);
        this.setState(prevState => ({
          loading: false,
          selectedSeats: [...prevState.selectedSeats, id]
        }));
      }
    );
    this.props.selectSeat(id);
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log(`Removed seat ${number}, row ${row}, id ${id}`);
        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        removeCb(row, number, newTooltip);
        this.setState(prevState => ({
          loading: false
        }));
      }
    );
    this.props.removeSeat(id);
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
              removeSeatCallback={this.removeSeatCallback}
              rows={rows}
              maxReservableSeats={60}
              alpha
              visible
              selectedByDefault
              tooltipProps={{ multiline: true }}
            />
          </>
        ) : null}
      </div>
    );
  }
}
export default CustomSeatPicker;
