import React from 'react';
import PropTypes from 'prop-types';
import TopMenu from './TopMenu';
import MainContent from './MainContent';
import SideMenu from './SideMenu';
import Footer from './Footer';

// import { siteLinks } from '../config';

const Layout = ({ children }) => (
  <div style={{ display: 'flex' }}>
    <TopMenu  />
    <SideMenu />
    <MainContent content={children} />
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
