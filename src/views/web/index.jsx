// tslint:disable: no-any
import React from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';

import Navbar from '../../components/layout/NavBar';
import ProtectedRoute from '../../routes/ProtectedRoute';

import Auth from '../web/auth';
import Landing from '../../containers/Landing';
import Profile from '../../containers/Profile';

const ViewWeb = ({ match }) => {
  const renderLanding  = (props) => <Landing {...props} />;
  const renderProfile  = (props) => <Profile {...props} />;
  const renderAuth  = (props) => <Auth {...props} />;
console.log('WEB', match.url)
  return (
    
        <Switch>
          <Route
            path={`${match.url}/`}
            exact={true}
            render={renderLanding}
          />
          <Route
            path={`${match.url}/auth`}
            render={renderAuth}
          />
          <ProtectedRoute
            isWeb={true}
            path={`${match.url}/profile`}
            component={renderProfile}
          />
          <Redirect to="/error" />
        </Switch>
    
  );
};

export default ViewWeb;
