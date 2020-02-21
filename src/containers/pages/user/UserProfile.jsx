import React from "react";
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
import { isLoggedInAdmin } from "../../../helpers/authHelper";
// import { getUserId } from "../../../helpers/authHelper";

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
    const { user } = this.props;
    this.setState({ loading: true });
    this.setState({ user, loading: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    logout();
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
                  avatar={<Avatar>{isLoggedInAdmin() ? "AD" : "US"}</Avatar>}
                  action={
                    <IconButton aria-label="settings" onClick={this.handleOpen}>
                      <Create />
                    </IconButton>
                  }
                  title={user.name}
                  subheader={user.email}
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
