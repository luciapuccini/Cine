import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import { Button } from "@material-ui/core";
import _ from "lodash";
import { fetchPlay } from "../api/fetchData";

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

const getTakenSeats = books => {
  const taken = [];
  if (!_.isEmpty(books)) {
    books.forEach(book => {
      book.seats.forEach(seat => {
        taken.push(seat.seatPk.seatId);
      });
    });
  }
  return taken;
};

class CustomSeatPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      play: {},
      selectedSeats: [],
      rows: []
    };
  }

  componentDidMount() {
    const { playPK } = this.props.selectedPlay;
    const play = fetchPlay(playPK);
    play.then(play => {
      this.setState({ play });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.play !== this.state.play) {
      const taken = getTakenSeats(this.state.play.books);
      const rows = buildRows(taken);
      this.setState({ rows });
    }
  }

  addSeatCallback = (row, number, id, cb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log(`Added seat ${number} id ${id}`);
        cb(row, number);
        this.setState(prevState => ({
          loading: false,
          selectedSeats: [...prevState.selectedSeats, id]
        }));
      }
    );
  };

  render() {
    const { loading, rows, play } = this.state;
    const { selectSeats } = this.props;
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
            <Button
              variant="outlined"
              style={{ color: "#fff", borderColor: "#fff" }}
              onClick={() => selectSeats(this.state.selectedSeats)}
            >
              Accept
            </Button>
          </>
        ) : null}
      </div>
    );
  }
}
export default CustomSeatPicker;
