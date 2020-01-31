import { isLoggedInWeb } from "../helpers/authHelper";
/* eslint-disable import/prefer-default-export */

export const login = (email, password, history) => {
  let user = { email, password };
  let headers = new Headers({ "Content-Type": "application/json" });
  fetch("http://localhost:8080/user/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: headers
  })
    .then(response => response.json())
    .then(data => {
      //WIP: check
      if (data.isAdmin) {
        localStorage.setItem("cinema_adm_key", true);
      } else {
        localStorage.setItem("cinema_user_key", true);
      }

      return data;
    });

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
