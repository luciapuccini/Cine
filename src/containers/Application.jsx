import React from 'react';

// import ResponsiveContainer from '../components/layout/ResponsiveContainer';
import DesktopContainer from '../components/layout/DesktopContainer';
import NewsSection from '../components/layout/NewsSection';
import CommentSection from '../components/layout/CommentSection';
import FooterSection from '../components/layout/FooterSection';

const Application = (props) => (
  <DesktopContainer>
    <CommentSection />
    <NewsSection />
    <FooterSection />
  </DesktopContainer>
);
export default Application;
