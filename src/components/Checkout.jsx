import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";
import { getCurrentPrices } from "../api/fetchData";

const Checkout = ({ play, seats }) => {
  const [price, setPrice] = useState(0);
  const [superPrice, setSuperPrice] = useState(0);

  useEffect(() => {
    getCurrentPrices().then(res => {
      setPrice(res.regularSeatPrice);
      setSuperPrice(res.superSeatprice);
    });
  }, []);
  // fecha hora sala cantidad de asientos precio x asiento --> precio total
  return (
    <Paper>
      <Typography gutterBottom variant="h5" color="primary">
        COST
      </Typography>
    </Paper>
  );
};
export default Checkout;
