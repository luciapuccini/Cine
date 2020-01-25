/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";
import TopMenu from "./TopMenu";
import MainContent from "./MainContent";
import SideMenu from "./SideMenu";
import Footer from "./Footer";

// import { siteLinks } from '../config';

class Layout extends React.Component {
  componentDidMount() {
    document.body.classList.add("background");
  }

  componentWillUnmount() {
    document.body.classList.remove("background");
  }

  render() {
    return (
      <div id="app-container">
        <TopMenu history={this.props.history} />
        {/* <SideMenu /> */}
        <main>
          <div className="container-fluid">{this.props.children}</div>
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
