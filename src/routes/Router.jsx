import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';


import Application from '../containers/Application';
import Home from '../components/Home';
import SeatPiker from '../components/SeatPicker';
import LoginForm from '../containers/LoginForm';
import UserPage from '../containers/pages/UserPage';
import SignUpPage from '../containers/pages/SignUpPage'
;
const PublicRoutes = (props) => (
  <Router>
    <Route exact path="/" component={Application} />
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/movie" component={Home} />
    <Route exact path="/user" component={UserPage} />
    <Route exact path="/booking" component={Home} />
    <Route exact path="/signUp" component={SignUpPage} />

    <Route path="/seats" component={SeatPiker} />
  </Router>
);

export default PublicRoutes;
