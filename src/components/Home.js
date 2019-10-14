import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Container } from 'semantic-ui-react';

export default class Home extends Component {
  state = {
   users : []
  }

  componentDidMount() {
     fetch('http://localhost:8080/user/all')
      .then(response => response.json() )
      .then(users => this.setState({users}, ()=> console.log('set state user',this.state)))
  }

  render() {
    const users = this.state.users
    console.log(this.state.users);
  
    return (
      <Container>
        <Header>Welcome</Header>
        <div style={{margin:'10px'}}>
        { users.length !== 0 ?
          users[0].email
          : ' '
         }
        </div>
  
        <Link to="/seats">pick a seat</Link>
      </Container>
    );
  }
}
