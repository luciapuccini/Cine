import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import { Button } from "@material-ui/core";

const buildRows = takenSeats => {
  let rows = [];
  let ids = takenSeats.map(seat => seat.id);
  let otro = 1;
  for (let seat = 0; seat < 6; seat++) {
    let column = [];
    for (let i = 1; i < 13; i++) {
      if (i === 4 || i === 9) {
        column.push(null);
      } else {
        column.push({ id: otro, number: otro, isReserved: ids.includes(otro) });
        ++otro;
      }
    }
    rows.push(column);
  }
  return rows;
};

class CustomSeatPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedSeats: [],
      rows: []
    };
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
    const { loading, rows } = this.state;
    const { selectSeats } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <SeatPicker
          addSeatCallback={this.addSeatCallback}
          rows={rows}
          maxReservableSeats={60}
          alpha
          visible
          selectedByDefault
          loading={loading}
        />
        <Button
          variant="outlined"
          style={{ color: "#fff", borderColor: "#fff" }}
          onClick={() => selectSeats(this.state.selectedSeats)}
        >
          Accept
        </Button>
      </div>
    );
  }
}
export default CustomSeatPicker;
