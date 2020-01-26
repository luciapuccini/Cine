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

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const UserProfile = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>R</Avatar>}
          action={
            <IconButton aria-label="settings" onClick={handleOpen}>
              <Create />
            </IconButton>
          }
          title="USER NAME"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            User info
          </Typography>
        </CardContent>
      </Card>
      <EditUserDialog open={open} handleClose={handleClose} />
    </div>
  );
};
export default UserProfile;
