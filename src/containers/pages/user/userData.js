/* eslint-disable import/prefer-default-export */
// CREATE A CONFIG OBJECT DEPENDING ON THE USER TYPE
import { isLoggedInAdmin } from "../../../helpers/authHelper";
import _ from "lodash";

const AdminActions = [
  "Add Movie",
  "Update Movie",
  "Delete Movie",
  "Add User",
  "Disable User"
];

export const enabledActions = () => {
  let UserActions = ["Book a Movie"];
  if (isLoggedInAdmin()||true) {
    UserActions = _.concat(UserActions, AdminActions);
  }
  return UserActions;
};
