import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Bookings from "../../containers/Bookings";
import Home from "../../components/Home";
import Layout from "../../components/layout/Layout";

const App = props => {
  const { match } = props;
  console.log(match.url);
  return (
    <Layout>
      <Switch>
        <Redirect
          exact={true}
          from={`${match.url}/`}
          to={`${match.url}/home`}
        />
        <Route path={`${match.url}/home`} render={Home} />
        <Route path={`${match.url}/bookings`} render={Bookings} />
        <Redirect to="/app/error-admin" />
      </Switch>
    </Layout>
  );
};

export default withRouter(App);
