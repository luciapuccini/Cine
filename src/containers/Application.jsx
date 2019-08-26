import React from 'react';

import ResponsiveContainer from '../components/layout/ResponsiveContainer';
import NewsSection from '../components/layout/NewsSection';
import CommentSection from '../components/layout/CommentSection';
import FooterSection from '../components/layout/FooterSection';
import CustomCarousel from '../components/CustomCarousel';

const Application = () => (
  <ResponsiveContainer>
    <CommentSection />
    <NewsSection />
    <FooterSection />
  </ResponsiveContainer>
);
export default Application;
