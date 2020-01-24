import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import AuthHelper from "../helpers/authHelper";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const renderRoute = props =>
    AuthHelper.isLoggedInWeb() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{ pathname: "/web/auth", state: { from: props.location } }}
      />
    );

  return <Route {...rest} render={renderRoute} />;
};

ProtectedRoute.defaultProps = {
  isWeb: false
};

export default ProtectedRoute;
