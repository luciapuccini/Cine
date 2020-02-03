import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import SeatPicker from "react-seat-picker";

const takenSeats = [
  { id: 1, salaId: 1 },
  { id: 3, salaId: 1 },
  { id: 7, salaId: 1 },
  { id: 8, salaId: 1 },
  { id: 9, salaId: 1 }
];

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
      rows: buildRows(takenSeats)
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
        //fetch
      }
    );
  };

  render() {
    const { loading, rows } = this.state;
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SeatPicker
          addSeatCallback={this.addSeatCallback}
          rows={rows}
          maxReservableSeats={60}
          alpha
          visible
          selectedByDefault
          loading={loading}
        />
      </div>
    );
  }
}
export default CustomSeatPicker;
