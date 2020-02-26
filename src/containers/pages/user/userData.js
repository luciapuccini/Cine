/* eslint-disable import/prefer-default-export */
// CREATE A CONFIG OBJECT DEPENDING ON THE USER TYPE
import _ from "lodash";
import { isLoggedInAdmin } from "../../../helpers/authHelper";

const AdminActions = [
  { title: "Manage Movies", type: "movie" },
  { title: "Manage Plays", type: "play" },
  { title: "Manage Prices", type: "price" }
];

export const enabledActions = () => {
  let UserActions = [{ title: "Manage Bookings", type: "booking" }];
  if (isLoggedInAdmin()) {
    UserActions = _.concat(UserActions, AdminActions);
  }
  return UserActions;
};
