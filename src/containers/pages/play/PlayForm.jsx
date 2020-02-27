import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { MenuItem, Container, Grid, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import { Select } from "formik-material-ui";

import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

import { addPlay } from "../../../api/fetchData";

// TODO:
const PlaySchema = Yup.object().shape({
  room: Yup.number(),
  startTime: Yup.string().required("Need password to confirm")
});
// "2022-10-10T19:00:00"
const defaultStartTimes = [
  "2020-10-10T10:00:00",
  "2020-10-10T15:00:00",
  "2020-10-10T20:00:00",
  "2020-10-11T10:00:00",
  "2020-10-11T15:00:00",
  "2020-10-11T20:00:00",
  "2020-10-13T10:00:00",
  "2020-10-13T15:00:00",
  "2020-10-13T20:00:00",
  "2020-10-14T10:00:00",
  "2020-10-14T15:00:00",
  "2020-10-14T20:00:00"
];

class PlayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      startTime: "",
      movies: [],
      rooms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      error: false
    };
  }

  componentDidMount() {
    const { movieData, open } = this.props;
    this.setState({ open, movies: movieData });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => this.props.onClose();

  handleSubmit = values => {
    console.log(values);
    const playPK = {
      movieId: values.movie.movieId,
      roomId: values.room,
      startTime: moment(values.startTime).toISOString()
    };
    const res = addPlay(playPK);
    res.then(response => {
      if (response) {
        console.log("success");
      } else {
        this.setState({ error: true });
      }
    });
  };

  render() {
    const { movies, rooms, open, error, startTime } = this.state;
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
            <DialogTitle id="form-dialog-title">Create a Play</DialogTitle>
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
            {movies ? (
              <Formik
                initialValues={{
                  movie: this.state.movies[0],
                  room: this.state.rooms[0],
                  startTime
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
                        <Field
                          name="movie"
                          label="Movie"
                          type="text"
                          fullWidth
                          component={Select}
                          onChange={handleChange}
                          value={values.movie}
                        >
                          {movies.map(movie => (
                            <MenuItem key={movie.movieId} value={movie}>
                              {movie.name}
                            </MenuItem>
                          ))}
                        </Field>

                        <ErrorMessage
                          name="movie"
                          render={msg => <Typography>{msg}</Typography>}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          autoFocus
                          margin="dense"
                          name="room"
                          label="Rooms"
                          fullWidth
                          component={Select}
                          onChange={handleChange}
                          value={values.room}
                        >
                          {rooms.map(room => (
                            <MenuItem key={room} value={room}>
                              {room}
                            </MenuItem>
                          ))}
                        </Field>

                        <ErrorMessage
                          name="movie"
                          render={msg => <Typography>{msg}</Typography>}
                        />
                      </Grid>
                      <Grid item xl={12} />
                      <Grid item xs={12}>
                        <TextField
                          autoFocus
                          margin="dense"
                          name="startTime"
                          label="Movie Start Time"
                          type="datetime-local"
                          InputLabelProps={{
                            shrink: true
                          }}
                          fullWidth
                          onChange={handleChange}
                          value={values.startTime}
                        />

                        <ErrorMessage
                          name="movie"
                          render={msg => <Typography>{msg}</Typography>}
                        />
                      </Grid>
                      <Grid item xl={12} />
                      <Button type="submit" color="primary">
                        Accept
                      </Button>
                    </Form>
                  </Grid>
                )}
              </Formik>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default PlayForm;
