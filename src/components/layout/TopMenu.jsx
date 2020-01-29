import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/LocalMovies";
import { MenuItem, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { logout } from "../../helpers/authHelper";

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
  const isLogged = localStorage.getItem("cinema_user_key");
  return (
    <AppBar position="sticky">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Link
              className={classes.buttonLink}
              to={{
                pathname: "/web"
              }}
            >
              <MenuIcon />
            </Link>
          </IconButton>

          {isLogged ? (
            <>
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
            </>
          ) : null}
        </div>
        <div>
          {isLogged ? (
            <MenuItem>
              <Button
                variant="outlined"
                style={{ color: "#fff", borderColor: "#fff" }}
                onClick={logout}
              >
                Log Out
              </Button>
            </MenuItem>
          ) : (
            <MenuItem>
              <Link
                className={classes.buttonLink}
                to={{
                  pathname: "/app/login"
                }}
              >
                Log In
              </Link>
            </MenuItem>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
