import React, { Component } from 'react';
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
export default class NavBar extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  render() {
    const { user } = this.props || null
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 100, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item >
                  <Link to='/user'>User</Link>
                </Menu.Item>

                <Menu.Item >
                  <Link to='/booking'>Booking</Link>
                </Menu.Item>
                <Menu.Item >

                  <Link to='/movie'>Movies</Link>
                </Menu.Item>


                {
                  user ? null :
                    <Menu.Item position='right'>
                      <Button inverted={!fixed}>
                        <Link to='/login'>Log in</Link>
                      </Button>
                      <Button inverted={!fixed} style={{ marginLeft: '0.5em' }}>
                        <Link to='/signUp'>Sing Up</Link>
                      </Button>
                    </Menu.Item>
                }


              </Container>

            </Menu>

          </Segment>
        </Visibility>
        {children}
      </Responsive>
    );
  }
}
