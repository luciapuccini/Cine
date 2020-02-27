import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Create } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

import { editUser, logout } from "../../../api/fetchData";

import EditUserDialog from "./EditUserDialog";
import EditPasswordDialog from "./EditPasswordDialog";
import { isLoggedInAdmin } from "../../../helpers/authHelper";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openPassword: false,
      loading: false,
      user: {}
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({ loading: true });
    this.setState({ user, loading: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handlePasswordOpen = () => {
    this.setState({ openPassword: true });
  };

  handlePasswordClose = () => {
    this.setState({ openPassword: false });
  };

  handleSubmit = editedData => {
    const user = {
      userId: this.state.user.id,
      name: editedData.name,
      email: editedData.email,
      password: editedData.password
    };
    const newUser = editUser(user);
    newUser.then(usu => {
      this.setState({ user: usu }, () => {
        this.handleClose();
        logout();
      });
    });
  };

  handlePasswordSubmit = value => {
    console.log("Change Password", value);
  };

  render() {
    const { user } = this.state;
    return (
      <div>
        {this.state.loading ? (
          <CircularProgress style={{ display: "flex" }} />
        ) : (
          <>
            <Card>
              <CardHeader
                avatar={<Avatar>{isLoggedInAdmin() ? "AD" : "US"}</Avatar>}
                action={
                  <IconButton aria-label="settings" onClick={this.handleOpen}>
                    <Create />
                  </IconButton>
                }
                title={
                  <Typography variant="h5" color="primary">
                    User Settings
                  </Typography>
                }
              />
              <CardContent>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{ paddingLeft: "8px" }}
                >
                  Email:
                  {user.email}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{ padding: "8px" }}
                >
                  Username:
                  {user.name}
                </Typography>
                <Typography component="span" style={{ marginBottom: "10px" }} />
                <Button color="primary" onClick={this.handlePasswordOpen}>
                  Change Password
                </Button>
              </CardContent>
            </Card>
            <EditUserDialog
              open={this.state.open}
              handleClose={this.handleClose}
              user={this.state.user}
              handleSubmit={this.handleSubmit}
            />
            <EditPasswordDialog
              open={this.state.openPassword}
              handleClose={this.handlePasswordClose}
              handleSubmit={this.handlePasswordSubmit}
            />
          </>
        )}
      </div>
    );
  }
}
export default UserProfile;
