import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Bookings from '../../containers/Bookings';

const App = props => {
  const { match } = props;
  console.log('in app [match]', match);
  // TODO: define  auth routes
  return (
    <Layout>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/landing`} />
        <Route path={`${match.url}/bookings`} render={Bookings} />
        {/* <Route path={`${match.url}/profile`} render={renderUsers} /> */}
        <Redirect to="/app/error-admin" />
      </Switch>
    </Layout>
  );
};

export default withRouter(App);
