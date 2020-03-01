import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Paper, Typography, Button } from "@material-ui/core";
import { getCurrentPrices } from "../api/fetchData";

const Checkout = ({ play, total, onConfirm }) => {
  let history = useHistory();

  return (
    <Paper>
      <div style={{ padding: "15px" }}>
        <Typography gutterBottom variant="h6">
          TOTAL COST: {total}
        </Typography>
        <Typography gutterBottom variant="body1">
          Check you summary to make sure the purchase is correct!
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onConfirm()}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="default"
            onClick={() => history.push("/web")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Paper>
  );
};
export default Checkout;
