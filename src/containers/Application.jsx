import React from 'react';

import NavBar from '../components/layout/NavBar';
import NewsSection from '../components/layout/NewsSection';
import CommentSection from '../components/layout/CommentSection';
import FooterSection from '../components/layout/FooterSection';
import CustomCarousel from '../components/CustomCarousel';

const Application = (props) => (
  <NavBar>
    <CommentSection />
    <NewsSection />
    <FooterSection />
  </NavBar>
);
export default Application;
