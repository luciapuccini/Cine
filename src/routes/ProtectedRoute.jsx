import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedInWeb } from "../helpers/authHelper";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const renderRoute = props =>
    isLoggedInWeb() ? (
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
