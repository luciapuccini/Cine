import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginAdmin from './LoginAdmin';
import Layout from '../../components/layout/Layout';

const ViewAdmin = ({ match }) => {
  const renderLogin=(props) => <LoginAdmin {...props} />;
console.log('aca',match.url)
  // const renderForgot = (props) => <ForgotPassword {...props} />;
//FIXME:
  return (
    // <Layout>
        <Switch>
          <Redirect exact={true} from={`${match.url}/`} to={`${match.url}/login`} />
          <Route
            path={`${match.url}/login`}
            render={renderLogin}
          />
          <Redirect to="/error-admin" />
        </Switch>
    // </Layout>
  );
};

export default ViewAdmin;
