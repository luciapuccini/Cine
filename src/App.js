import React from 'react';
import { Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SeatPiker from './components/SeatPicker';
import PublicRoutes from './routes/Router';

const DashApp = () => <PublicRoutes />;
export default DashApp;
