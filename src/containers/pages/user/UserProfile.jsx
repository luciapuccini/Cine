import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Create } from "@material-ui/icons";
import EditUserDialog from "./EditUserDialog";
import { userInfo } from "os";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

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
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => {
        console.log(users[0]);
        this.setState({ user: users[0], loading: false });
      });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    // const classes = useStyles();
    return (
      <div>
        {this.state.loading ? (
          <CircularProgress style={{ display: "flex" }} />
        ) : (
          <>
            <Card>
              <CardHeader
                avatar={<Avatar>R</Avatar>}
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
            />
          </>
        )}
      </div>
    );
  }
}
export default UserProfile;
