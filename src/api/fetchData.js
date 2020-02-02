import { isLoggedInAdmin } from "../helpers/authHelper";

/* eslint-disable import/prefer-default-export */

export const login = (email, password, history) => {
  let user = { email, password };
  let headers = new Headers({ "Content-Type": "application/json" });

  //http://localhost:8080/user/login
  return fetch("http://www.mocky.io/v2/5e3668403200007a00ae3c5e", {
    method: "POST",
    body: JSON.stringify(user),
    headers: headers
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw Error("cualquiera");
    })
    .then(data => {
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("login_token", true);
      localStorage.setItem("cinema_adm_key", data.isAdmin);
      history.push("/app");
      return data;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

// export const fetchUser = () => {
//   let user;
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then(response => response.json())
//     .then(users => {
//       console.log(users[0]);
//       user = users[0];
//     });
//   return user;
// };

///mock data http://localhost:8080/user/all
//http://www.mocky.io/v2/5e36264a3200005e00ae3c2b
export const fetchUser = () => {
  let user;
  fetch("http://www.mocky.io/v2/5e36264a3200005e00ae3c2b")
    .then(response => response.json())
    .then(users => {
      console.log("[FETCH USERS]", users);
      user = users[0];
    });
  return user;
};

// mock plays all
//http://www.mocky.io/v2/5e3626cf3200006400ae3c2c

export const fetchPlays = () => {
  return fetch("http://www.mocky.io/v2/5e3626cf3200006400ae3c2c")
    .then(response => response.json())
    .then(plays => {
      return plays;
    });
};

export const getMovies = () => {
  const movieData = fetch("http://www.mocky.io/v2/5e362a913200005e00ae3c2e")
    .then(response => response.json())
    .then(movies => movies);
  return movieData;
};
