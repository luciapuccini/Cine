import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Face";
import { MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    width: `100%`,
    marginLeft: drawerWidth
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  buttonLink: {
    textDecoration: "none",
    color: "#fdfdff"
  }
}));

const TopMenu = props => {
  const classes = useStyles();
  const isAdmin = localStorage.getItem("cinema_adm_key"); //FIXME: set a flg
  const isLogged = localStorage.getItem("cinema_user_key");
  return (
    <AppBar position="fixed">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <MenuItem>
            <Typography variant="h6" className={classes.title}>
              <Link
                className={classes.buttonLink}
                to={{
                  pathname: "/app"
                }}
              >
                Home
              </Link>
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant="h6" className={classes.title}>
              <Link
                className={classes.buttonLink}
                to={{
                  pathname: "/app/bookings"
                }}
              >
                Bookings
              </Link>
            </Typography>
          </MenuItem>
          {isAdmin ? (
            <MenuItem>
              <Typography variant="h6" className={classes.title}>
                <Link
                  className={classes.buttonLink}
                  to={{
                    pathname: "/app/admin"
                  }}
                >
                  Admin
                </Link>
              </Typography>
            </MenuItem>
          ) : null}
        </div>
        <div>
          {isLogged ? (
            <MenuItem>
              <Typography variant="h6" className={classes.title}>
                <Link
                  className={classes.buttonLink}
                  to={{
                    pathname: "/app/logout"
                  }}
                >
                  Log Out
                </Link>
              </Typography>
            </MenuItem>
          ) : null}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
