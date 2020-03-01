import React from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

import { Container, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addMovie, addPrice, fetchPrices } from "../../../api/fetchData";

class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: false,
      regular: 0,
      superPrice: 0,
      activation: "",
      message: ""
    };
  }

  componentDidMount() {
    const { open } = this.props;
    this.setState({ open });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => this.props.onClose();

  handleSubmit = values => {
    const { regular, superPrice, activation } = values;
    const price = {
      setDate: moment().toISOString(),
      regularSeatPrice: regular,
      superSeatPrice: superPrice,
      activationDate: moment(values.activation).toISOString()
    };
    addPrice(price).then(res => {
      if (res) {
        this.setState({ message: res.message });
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    });
  };

  render() {
    const {
      open,
      error,
      message,
      regular,
      superPrice,
      activation
    } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <DialogTitle id="form-dialog-title">Create a Movie</DialogTitle>
            <Button onClick={this.handleClose} color="primary">
              X
            </Button>
          </Container>

          <DialogContent>
            {error ? (
              <Alert severity="error" style={{ marginTop: "15px" }}>
                ERROR
              </Alert>
            ) : null}

            <Formik
              initialValues={{
                regular,
                superPrice,
                activation
              }}
              onSubmit={values => {
                this.handleSubmit(values);
              }}
            >
              {({ values, handleChange, errors, touched }) => (
                <Grid container>
                  <Form
                    style={{
                      display: "flex",
                      flex: 1,
                      flexDirection: "column"
                    }}
                  >
                    <Grid item xs={12}>
                      <TextField
                        autoFocus
                        margin="dense"
                        name="regular"
                        label="Regular Price"
                        fullWidth
                        onChange={handleChange}
                        value={values.regular}
                      />

                      <ErrorMessage
                        name="regular"
                        render={msg => <Typography>{msg}</Typography>}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        autoFocus
                        margin="dense"
                        name="superPrice"
                        label="Super Seat Price"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values.superPrice}
                      />

                      <ErrorMessage
                        name="superPrice"
                        render={msg => <Typography>{msg}</Typography>}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoFocus
                        margin="dense"
                        name="activation"
                        label="Activation Date"
                        type="datetime-local"
                        InputLabelProps={{
                          shrink: true
                        }}
                        fullWidth
                        onChange={handleChange}
                        value={values.activation}
                      />

                      <ErrorMessage
                        name="activation"
                        render={msg => <Typography>{msg}</Typography>}
                      />
                    </Grid>

                    <Grid item xl={12}>
                      <Button type="submit" color="primary">
                        Accept
                      </Button>
                    </Grid>
                  </Form>
                </Grid>
              )}
            </Formik>
            {message ? <Alert severity="info">{message}</Alert> : null}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default MovieForm;
