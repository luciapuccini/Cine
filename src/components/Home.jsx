/* eslint-disable no-else-return */
import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import _ from "lodash";
import UserPanel from "../containers/pages/user/UserPanel";
import UserProfile from "../containers/pages/user/UserProfile";
import { fetchUser } from "../api/fetchData";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const us = fetchUser();
    us.then(user => {
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        {!_.isEmpty(user) ? (
          <Grid container justify="space-around" spacing={2}>
            <Grid item xs={4}>
              <UserProfile user={user} />
            </Grid>
            <Grid item xs={8}>
              <UserPanel user={user} />
            </Grid>
          </Grid>
        ) : (
            <CircularProgress />
          )}
      </>
    );
  }
}

export default Home;
