import React from 'react';
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

// TODO:
import ProtectedRoute from './ProtectedRoute';
import Landing from '../containers/Landing';
import Movies from '../containers/Movies';

import Admin from '../containers/Admin';
import Main from '../views';
import Error from '../views/app/error';
import App from '../views/app';

const Routes = () => (
  <Router>
    <Switch>
      <ProtectedRoute path="/app" component={App} isWeb/>
      <Route path="/web" render={routeProps => <Landing {...routeProps} />} />
      <Route path="/movies" render={routeProps => <Movies {...routeProps} />} />
      <Route path="/admin" render={routeProps => <Admin {...routeProps} />} />
      <Route
        path="/error"
        exact
        render={routeProps => <Error {...routeProps} />}
      />
      <Route
        path="/error-admin"
        render={routeProps => <Error {...routeProps} />}
      />
      <Route path="/" exact render={routeProps => <Main {...routeProps} />} /> {/*/web*/}
      <Redirect to="/error" />
    </Switch>
  </Router>
);

export default Routes;
