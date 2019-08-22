import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import CustomCarousel from '../components/CustomCarousel';


const Application = () => (
  <div>
    <h1>APP</h1>
    <div style={{ justifyContent: 'center', alignItems: 'center', width: 500 }}>
      <CustomCarousel />

    </div>
    <Button>
      <Link to="/home">Go to home</Link>
    </Button>
  </div>
);


export default Application;
