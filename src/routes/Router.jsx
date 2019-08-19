import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Application from '../containers/Application';
import Home from '../components/Home';
import SeatPiker from '../components/SeatPicker';

const PublicRoutes = props => (
        <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route path="/seats" component={SeatPiker} />
        </Router>
);

export default PublicRoutes;
