import React from "react";
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
import { addMovie } from "../../../api/fetchData";

// TODO:
const EditSchema = Yup.object().shape({
  room: Yup.number(),
  startTime: Yup.string().required("Need password to confirm")
});

class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: false,
      movieTitle: "",
      duration: 0,
      synopsis: "",
      image: "",
      message: null
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
    const { movieTitle, duration, synopsis, image } = values;
    const movie = {
      name: movieTitle,
      duration,
      synopsis,
      imagePath: image
    };
    addMovie(movie).then(res => {
      if (res.movieId) {
        this.setState({ message: "success" });
      }
      this.setState({ message: res.message });
    });
  };

  render() {
    const { open, error, message } = this.state;
    console.log("que te falta", message);
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
                movieTitle: "title",
                duration: 200,
                synopsis: " short",
                image: "google/image"
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
                        name="movieTitle"
                        label="Title"
                        fullWidth
                        onChange={handleChange}
                        value={values.movieTitle}
                      />

                      <ErrorMessage
                        name="movieTitle"
                        render={msg => <Typography>{msg}</Typography>}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        autoFocus
                        margin="dense"
                        name="duration"
                        label="Duration"
                        fullWidth
                        onChange={handleChange}
                        value={values.duration}
                      />

                      <ErrorMessage
                        name="duration"
                        render={msg => <Typography>{msg}</Typography>}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoFocus
                        margin="dense"
                        name="synopsis"
                        label="Synopsis"
                        fullWidth
                        onChange={handleChange}
                        value={values.synopsis}
                      />

                      <ErrorMessage
                        name="synopsis"
                        render={msg => <Typography>{msg}</Typography>}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        id="image"
                        type="text"
                        name="image"
                        label="image"
                        onChange={handleChange}
                        values={values.image}
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
