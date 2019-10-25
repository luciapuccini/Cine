
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NavBar from './NavBar';
import CustomCarousel from '../CustomCarousel';

class DesktopContainer extends Component {
  render() {
    return (
      <NavBar>
        {this.props.children}
      </NavBar>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

export default DesktopContainer;
