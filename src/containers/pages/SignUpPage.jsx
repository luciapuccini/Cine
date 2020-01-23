import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import UserForm from '../UserForm';
import NavBar from '../../components/layout/NavBar';

export default class SignUpPage extends Component {
  render() {
    return (
        <Container textAlign="center">
          <UserForm />
        </Container>
    );
  }
}
