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
  name: Yup.string(),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Need password to confirm")
});

const EditUserDialog = ({ open, handleClose, handleSubmit, user }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
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
              name: user.name,
              email: user.email,
              password: ""
            }}
            validationSchema={EditSchema}
            onSubmit={values => {
              handleSubmit(values);
            }}
          >
            {({ values, handleChange, errors, touched }) => (
              <Grid container spacing={2}>
                <Form>
                  <Grid item xl={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="User Name"
                      type="text"
                      fullWidth
                      value={values.name}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="name"
                      render={msg => <Typography>{msg}</Typography>}
                    />
                  </Grid>
                  <Grid item xl={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="email"
                      label="Email Address"
                      type="email"
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="email"
                      render={msg => <Typography>{msg}</Typography>}
                    />
                  </Grid>
                  <Grid item xl={12}>
                    <TextField
                      margin="dense"
                      required
                      autoFocus
                      id="password"
                      label="Password"
                      type="password"
                      fullWidth
                      value={values.password}
                      onChange={handleChange}
                      error={errors.password && touched.password}
                    />
                    <ErrorMessage
                      name="password"
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
    </div>
  );
};
export default EditUserDialog;
