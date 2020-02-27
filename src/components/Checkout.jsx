import React, { useState, useEffect } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { getCurrentPrices } from "../api/fetchData";

const Checkout = ({ play, seats, onConfirm }) => {
  const [price, setPrice] = useState(0);
  const [superPrice, setSuperPrice] = useState(0);

  useEffect(() => {
    getCurrentPrices().then(res => {
      setPrice(res.regularSeatPrice);
      setSuperPrice(res.superSeatprice);
    });
    //llama get total
  }, []);
  const total = "10";
  return (
    <Paper>
      <div style={{ padding: "15px" }}>
        <Typography gutterBottom variant="h6">
          TOTAL COST: {total}
        </Typography>
        <Typography gutterBottom variant="body1">
          Check you summary to make sure the purchase is correct!
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onConfirm()}
        >
          Confirm
        </Button>
      </div>
    </Paper>
  );
};
export default Checkout;
