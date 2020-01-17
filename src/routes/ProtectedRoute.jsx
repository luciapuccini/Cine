import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import AuthHelper from '../helpers/authHelper';

const ProtectedRoute = ({ component: Component, isWeb, ...rest }) => {
  let renderRoute;
// this will check if you are trying to get into the web (users) or the admin, and for each if you are logged
  if (isWeb) {
    renderRoute = props =>
      AuthHelper.isLoggedInWeb() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/web/auth', state: { from: props.location } }}
        />
      );
  } else {
    renderRoute = props =>
      AuthHelper.isLoggedInAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/admin/login', state: { from: props.location } }}
        />
      );
  }

  return <Route {...rest} render={renderRoute} />;
};

ProtectedRoute.defaultProps = {
  isWeb: false,
};

export default ProtectedRoute;
