import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { LoginForm, SignUpForm } from "../../containers/forms";
import MovieList from "../../containers/MovieList";
import TopMenu from "../../components/layout/TopMenu";

const ViewWeb = ({ match }) => {
  const renderMovies = props => <MovieList {...props} />;
  const renderAuth = props => <LoginForm {...props} />;
  const renderSignUp = props => <SignUpForm {...props} />;

  return (
    <>
      <TopMenu />
      <Switch>
        <Route path={`${match.url}/`} exact={true} render={renderMovies} />
        <Route path={`${match.url}/auth`} render={renderAuth} />
        <Route path={`${match.url}/register`} render={renderSignUp} />
        <Redirect to="/error" />
      </Switch>
    </>
  );
};

export default ViewWeb;
