/* eslint-disable react/prefer-stateless-function */
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import {
  Input, Label, Button, Grid,
} from 'semantic-ui-react';


import React, { Component } from 'react';

export default class UserForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First Name is required'),
          lastName: Yup.string().required('Last Name is required'),
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        })}
        onSubmit={(fields) => {
          alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
        }}
        render={({ errors, status, touched }) => (
          <Form>


            <div className="form-group">
              <Label style={{ margin: '10px' }}>First Name</Label>
              <Field
                component={Input}
                name="firstName"
                type="text"
                className={
                  `form-control${
                    errors.firstName && touched.firstName ? ' is-invalid' : ''}`
                }
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <Label style={{ margin: '10px' }}>Last Name</Label>
              <Field
                component={Input}
                name="lastName"
                type="text"
                className={
                  `form-control${
                    errors.lastName && touched.lastName ? ' is-invalid' : ''}`
                }
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <Label style={{ margin: '10px' }}>Email</Label>
              <Field
                component={Input}
                name="email"
                type="text"
                className={
                  `form-control${
                    errors.email && touched.email ? ' is-invalid' : ''}`
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <Label style={{ margin: '10px' }}>Password</Label>
              <Field
                component={Input}
                name="password"
                type="password"
                className={
                  `form-control${
                    errors.password && touched.password ? ' is-invalid' : ''}`
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <Label style={{ margin: '10px' }}>Confirm Password</Label>
              <Field
                component={Input}
                name="confirmPassword"
                type="password"
                className={
                  `form-control${
                    errors.confirmPassword && touched.confirmPassword
                      ? ' is-invalid'
                      : ''}`
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <Button primary>
                Register
              </Button>
              <Button>
                Reset
              </Button>
            </div>
          </Form>
        )}
      />
    );
  }
}
