/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import _ from "lodash";
import UserPanel from "../containers/pages/user/UserPanel";
import UserProfile from "../containers/pages/user/UserProfile";
import { fetchUser } from "../api/fetchData";
import Alert from "@material-ui/lab/Alert";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      expired: false
    };
  }

  componentDidMount() {
    const us = fetchUser();

    us.then(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ expired: true });
      }
    });
  }

  render() {
    const { user, expired } = this.state;
    return (
      <>
        {!_.isEmpty(user) && !expired ? (
          <Grid container justify="space-around" spacing={2}>
            <Grid item xs={4}>
              <UserProfile user={user} />
            </Grid>
            <Grid item xs={8}>
              <UserPanel user={user} />
            </Grid>
          </Grid>
        ) : expired ? (
          <Alert severity="error">EXPIRED SESSION, PLEASE LOG IN</Alert>
        ) : (
          <CircularProgress />
        )}
      </>
    );
  }
}

export default Home;
