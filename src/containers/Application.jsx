import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const Application = () => (
  <div>
    <h1>APP</h1>
    <Button>
      <Link to="/home">Go to home</Link>
    </Button>
  </div>
);


export default Application;
