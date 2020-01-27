/* eslint-disable import/prefer-default-export */
// CREATE A CONFIG OBJECT DEPENDING ON THE USER TYPE
import { isLoggedInAdmin } from "../../../helpers/authHelper";
import _ from "lodash";

const AdminActions = [
  { title: "Manage Movies", type: "movie" },
  { title: "Manage Plays", type: "play" }
];

export const enabledActions = () => {
  let UserActions = [{ title: "Manage Bookings", type: "booking" }];
  if (isLoggedInAdmin()) {
    UserActions = _.concat(UserActions, AdminActions);
  }
  return UserActions;
};
