import React, { Component } from 'react';
import { Menu, Container, Tab, Segment } from 'semantic-ui-react';

import DesktopContainer from '../../components/layout/DesktopContainer';
import NavBar from '../../components/layout/NavBar';
import UserForm from '../UserForm'

export default class UserPage extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    const { id } = this.props;
    fetch(`http://localhost:8080/user/${id}`)
      .then((response) => response.json())
      .then((user) => this.setState({ user }, () => console.log('set state user', this.state)));
  }

  render() {
    const { user } = this.state
    const panes = [
      { menuItem: 'Edit profile', render: () => <Tab.Pane><UserForm /></Tab.Pane> },
      { menuItem: 'Movies', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
      { menuItem: 'Bookings', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]

    return (
      <NavBar>
        <h1>Welcome to your profile</h1>

        <Segment>
          <Tab panes={panes} />
        </Segment>
        {user ?
          <h1>hay user</h1>
          : null
        }
      </NavBar>




    );
  }
}
