/* eslint-disable no-else-return */
import React from "react";
import { Grid } from "@material-ui/core";
import UserPanel from "../containers/pages/user/UserPanel";
import UserProfile from "../containers/pages/user/UserProfile";
import {getJWT} from '../helpers/authHelper'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{}
    };
  }
  componentDidMount(){
    console.log('ACAAA',`Bearer ${getJWT() }`)
    const headers = new Headers({ "Authorization": `Bearer ${getJWT() }` });
    fetch("http://localhost:8080/user/getUser",{
         method:"GET",
         headers
       })
        .then(response => {
          if (response.code) {
            throw Error(response.message);
          }
          return response.json();

        })
        .then(user => {
          console.log('si llega',user)
          this.setState({user})
        })
        .catch(error => {
          console.log("[BAD USER REQUEST]:", error);
        });
    };    



  render() {
    console.log(this.state.user)
    return (
      <>
        <Grid container justify="space-around" spacing={2}>
          <Grid item xs={4}>
            <UserProfile />
          </Grid>
          <Grid item xs={8}>
            <UserPanel />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Home;
