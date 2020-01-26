/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

// TODO:
import ProtectedRoute from "./ProtectedRoute";
import ViewWeb from "../views/web"; //home for users
// import ViewAdmin from "../views/admin"; //home for Admins
// import Movies from "../containers/Movies";
import Main from "../views";
import Error from "../views/app/error";
import App from "../views/app";

const Routes = () => (
  <Router>
    <Switch>
      <ProtectedRoute path="/app" component={App} />
      <Route path="/web" render={routeProps => <ViewWeb {...routeProps} />} />
      <Route
        path="/error"
        exact
        render={routeProps => <Error {...routeProps} />}
      />
      <Route
        path="/error-admin"
        render={routeProps => <Error {...routeProps} />}
      />
      <Route path="/" exact render={routeProps => <Main {...routeProps} />} />
      <Redirect to="/error" />
    </Switch>
  </Router>
);

export default Routes;
