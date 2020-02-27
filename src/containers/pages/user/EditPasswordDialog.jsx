import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Grid } from "@material-ui/core";

const EditSchema = Yup.object().shape({
  password: Yup.string()
    .min(5)
    .required("Required"),
  confirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  )
});

const EditUserDialog = ({ open, handleClose, handleSubmit }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <Button onClick={handleClose} color="primary">
          X
        </Button>
      </Container>

      <DialogContent>
        <Formik
          initialValues={{
            password: "",
            confirm: ""
          }}
          validationSchema={EditSchema}
          onSubmit={values => {
            handleSubmit(values.password);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Grid container spacing={2}>
              <Form style={{ width: "100%" }}>
                <Grid item xl={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="New Password"
                    type="text"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="password"
                    render={msg => <Typography>{msg}</Typography>}
                  />
                </Grid>
                <Grid item xl={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="confirm"
                    label="Confirm Password"
                    type="confirm"
                    fullWidth
                    value={values.confirm}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="confirm"
                    render={msg => <Typography>{msg}</Typography>}
                  />
                </Grid>

                <Button type="submit" color="primary">
                  Accept
                </Button>
              </Form>
            </Grid>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default EditUserDialog;
