
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import {Link } from 'react-router-dom'
import  CustomCarousel  from "../CustomCarousel";
import {getWidth} from '../../helpers/dimensions'

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state
    const {user} =this.props

    return (
      // FIXME: getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}
      <Responsive >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 300, padding: '1em 0em' }}
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
                <Link to='/home'>Home</Link>
                </Menu.Item>
          
               <Menu.Item >
                <Link to='/seats'>Booking</Link>
                   </Menu.Item>
                 <Menu.Item >

                <Link to='/user'>Profile</Link>
                  </Menu.Item>
               
                <Menu.Item position='right'> 
                  <Button inverted={!fixed}>
                    <Link to='/login'>Log in</Link>
                  </Button>

                  <Button inverted={!fixed} style={{ marginLeft: '0.5em' }}>
                    <Link to='/signUp'>Sing Up</Link>
                  </Button>
                </Menu.Item>

              </Container>
              
            </Menu>
            <CustomCarousel />

          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

export default DesktopContainer