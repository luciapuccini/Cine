import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';


import Application from '../containers/Application';
import Home from '../components/Home';
import SeatPiker from '../components/SeatPicker';
import LoginForm from '../containers/LoginForm';

const PublicRoutes = (props) => (
  <Router>
    <Route exact path="/" component={Application} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/user" component={Home} />
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/signUp" component={Home} />

    <Route path="/seats" component={SeatPiker} />
  </Router>
);

export default PublicRoutes;
