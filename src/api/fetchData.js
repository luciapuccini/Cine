import { isLoggedInWeb } from "../helpers/authHelper";
/* eslint-disable import/prefer-default-export */

export const login = (email, password, history) => {
  // fetch user
  // check user / admin flag
  // set localstorage with the retrived user/token
  // localStorage.setItem("cinema_adm_key", value);
  localStorage.setItem("cinema_user_key", true);
  console.log("fd", history);
  // redirect
  try {
    if (isLoggedInWeb()) {
      history.push("/app");
    }
  } catch (error) {
    console.log(error);
  }
};
