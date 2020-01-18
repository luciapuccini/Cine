import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginForm from '../../containers/forms/LoginForm';
import Layout from '../../components/layout/Layout';

const ViewAdmin = ({ match }) => {
  const renderLogin=(props) => <LoginForm {...props} />;
console.log('aca',match.url)
  // const renderForgot = (props) => <ForgotPassword {...props} />;
//FIXME:
  return (
    // <Layout>
        <Switch>
          <Redirect exact={true} from={`${match.url}/`} to={`${match.url}/auth`} />
          <Route
            path={`${match.url}/auth`}
            render={renderLogin}
          />
          <Redirect to="/error-admin" />
        </Switch>
    // </Layout>
  );
};

export default ViewAdmin;
