import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Form, Grid, Header, Message, Segment,
} from 'semantic-ui-react';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleEmailChange=(event)=> {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }

  handlePasswordChange=(event)=> {
    event.preventDefault();
    this.setState({ password: event.target.value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
        Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={email}
                onChange={this.handleEmailChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handlePasswordChange}
              />

              <Button color="teal" fluid size="large">
            <Link 
            style={{color:'teal'}}
            to={{
              pathname: "/home",
              state: { user: this.state }
            }} >
            Login

            </Link>
              </Button>
            </Segment>
          </Form>
          <Message>
            <Link to="/signUp">
            New to us?
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}


export default LoginForm;
