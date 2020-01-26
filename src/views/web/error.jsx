import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Landing from "../../containers/Landing";
import Auth from "./auth";
const Web = ({ match }) => {
  const renderLanding = () => <Landing {...props} />;
  const renderAuth = () => <Auth {...props} />;

  return (
    <>
      <Switch>
        <Route path={`${match.url}/`} exact={true} render={renderLanding} />
        <Route path={`${match.url}/auth`} render={renderAuth} />

        <Redirect to="/error" />
      </Switch>
    </>
  );
};

export default Web;
