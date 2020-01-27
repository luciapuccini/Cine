import { isLoggedInWeb } from "../helpers/authHelper";
/* eslint-disable import/prefer-default-export */

export const login = (email, password, history) => {
  let user = {email, password};
  let headers = new Headers({'Content-Type': 'application/json'})
  fetch("http://localhost:8080/user/login", {method: "POST", body: JSON.stringify(user), headers: headers})
    .then(response => response.json())
    .then(data => console.log(data));
  // fetch user
  // check user / admin flag
  // set localstorage with the retrived user/token
  // localStorage.setItem("cinema_adm_key", value);
  localStorage.setItem("cinema_user_key", true);
  // redirect
  try {
    if (isLoggedInWeb()) {
      history.push("/app");
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = () => {
  let user;
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
      console.log(users[0]);
      user = users[0];
    });
  return user;
};
export const fetchMovies = () => {};
export const fetchBookings = () => {};
