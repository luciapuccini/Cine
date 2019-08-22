import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';

export default class Home extends Component {
  // onClick() {}

  render() {
    return (
      <div>
        <Header>HOME PAGE</Header>
        <Link to="/seats">pick a seat</Link>
      </div>
    );
  }
}
