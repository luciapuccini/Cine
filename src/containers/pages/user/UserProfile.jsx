import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Create } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

import { editUser } from "../../../api/fetchData";

import EditUserDialog from "./EditUserDialog";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      user: {}
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user, loading: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = editedData => {
    const user = {
      // FIXME:  userId? + localsotage update
      userId: JSON.parse(localStorage.getItem("user")).id,
      name: editedData.name,
      email: editedData.email,
      password: editedData.password
    };
    const newUser = editUser(user);
    newUser.then(usu => {
      this.setState({ user: usu }, () => this.handleClose());
    });
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
                avatar={<Avatar>{user.isAdmin ? "A" : "U"}</Avatar>}
                action={
                  <IconButton aria-label="settings" onClick={this.handleOpen}>
                    <Create />
                  </IconButton>
                }
                title={this.state.user.name}
                subheader={this.state.user.email}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  User Data
                </Typography>
              </CardContent>
            </Card>
            <EditUserDialog
              open={this.state.open}
              handleClose={this.handleClose}
              user={this.state.user}
              handleSubmit={this.handleSubmit}
            />
          </>
        )}
      </div>
    );
  }
}
export default UserProfile;
