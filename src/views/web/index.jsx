import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ProtectedRoute from "../../routes/ProtectedRoute";

import LoginForm from "../../containers/forms/LoginForm";
import MovieList from "../../containers/MovieList";
import Profile from "../../containers/Profile";
import TopMenu from "../../components/layout/TopMenu";

const ViewWeb = ({ match }) => {
  const renderMovies = props => <MovieList {...props} />;
  const renderProfile = props => <Profile {...props} />;
  const renderAuth = props => <LoginForm {...props} />;
  return (
    <>
      <TopMenu />
      <Switch>
        <Route path={`${match.url}/`} exact={true} render={renderMovies} />
        <Route path={`${match.url}/auth`} render={renderAuth} />
        <ProtectedRoute
          isWeb
          path={`${match.url}/profile`}
          component={renderProfile}
        />
        <Redirect to="/error" />
      </Switch>
    </>
  );
};

export default ViewWeb;
