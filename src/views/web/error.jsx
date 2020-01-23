// tslint:disable: no-any
import React, { Suspense, ExoticComponent } from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';

import Navbar from '../../components/layout/NavBar';
import ProtectedRoute from '../../routes/ProtectedRoute';
import Landing from '../../containers/Landing'
import Auth from './auth'
const Web = ({ match }) => {
  const renderLanding =()=> <Landing {...props} />;
  // const renderProfile=()=> <Profile {...props} />;
  const renderAuth =()=> <Auth {...props} />;

  return (
    <>
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
          {/* <ProtectedRoute
            isWeb={true}
            path={`${match.url}/profile`}
            component={renderProfile}
          /> */}
          <Redirect to="/error" />
        </Switch>

    </>
  );
};

export default Web;
