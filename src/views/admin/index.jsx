import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LoginForm from "../../containers/forms/LoginForm";

const ViewAdmin = ({ match }) => {
  const renderLogin = props => <LoginForm {...props} />;
  return (
    <Switch>
      <Redirect exact={true} from={`${match.url}/`} to={`${match.url}/auth`} />
      <Route path={`${match.url}/auth`} render={renderLogin} />
      <Redirect to="/error-admin" />
    </Switch>
  );
};

export default ViewAdmin;
