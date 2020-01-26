/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";
import TopMenu from "./TopMenu";
import MainContent from "./MainContent";
import Footer from "./Footer";

// import { siteLinks } from '../config';

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Grid container direction="column">
        <Grid item style={{ marginBottom: "70px" }}>
          <TopMenu />
        </Grid>

        <Grid item>
          <MainContent children={children} />
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
