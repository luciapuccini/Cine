import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Container } from 'semantic-ui-react';

export default class Home extends Component {
state = {
  // user : this.props.location.state.user || ''
}
componentDidMount(){
  //TODO: fetch info for that user and set state
}
  render() {
    const { location: { state } } = this.props;
    return (
      <Container>
        <Header>Welcome</Header>
        {state.user.email}
        <Link to="/seats">pick a seat</Link>
      </Container>
    );
  }
}
