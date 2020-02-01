import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container } from "@material-ui/core";

const handleSubmit = () => {
  console.log("save");
};

const fakedata = {
  name: "Lucia",
  email: "lucia@gmailc.om",
  password: "asdasd"
};

const EditSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(5)
    .required("Required")
});

const EditUserDialog = ({ open, handleClose, user }) => {
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
              password: user.password
            }}
            validationSchema={EditSchema}
            onSubmit={values => {
              handleSubmit(values);
            }}
          >
            {({ values, handleChange }) => (
              <Form>
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
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                />
                <Button type="submit" color="primary">
                  Accept
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EditUserDialog;
