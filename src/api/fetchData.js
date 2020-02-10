/* eslint-disable import/prefer-default-export */
const headers = new Headers({ "Content-Type": "application/json" });

// -------------------------- USER ---------------------------
export const editUser = (email, name, password) => {
  const user = { email, name, password };
  return fetch("localhost:8080/user/modify", {
    method: "POST",
    body: JSON.stringify(user),
    headers
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw Error(response);
    })
    .then(user => {
      return user;
    })
    .catch(error => {
      console.log("[EDIT USER ERROR]", error);
    });
};

// /mock data http://localhost:8080/user/all
// http://www.mocky.io/v2/5e36264a3200005e00ae3c2b
export const fetchUser = () => {
  let user;
  fetch("http://localhost:8080/user/all")
    .then(response => response.json())
    .then(users => {
      user = users[0];
    });
  return user;
};

export const createUser = (email, name, password) => {
  const user = { email, name, password };
  return fetch("http://localhost:8080/user/add", {
    method: "POST",
    body: JSON.stringify(user),
    headers
  })
    .then(response => {
      return response.json();
    })
    .then(user => {
      if (user.code) {
        throw Error(user.message);
      }
      return user;
    })
    .catch(error => error);
};

// -------------------------- MOVIES ----------------------------------
// FIXME: doesnt exists
export const getMovies = () => {
  const movieData = fetch("http://localhost:8080/movies/all")
    .then(response => response.json())
    .then(movies => movies);
  return movieData;
};

// ------------------------- PLAYS -----------------------------------

// mock plays all
// http://www.mocky.io/v2/5e3626cf3200006400ae3c2c

export const fetchPlays = () => {
  return fetch("http://localhost:8080/plays/all")
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw Error(response);
    })
    .then(plays => {
      return plays;
    })
    .catch(error => {
      console.log("[BAD PLAYS REQUEST]:", error);
    });
};

// ----------------------------- AUTH -------------------------------
export const login = (email, password, history) => {
  const user = { email, password };

  return fetch("http://localhost:8080/user/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw Error("BAD REQUEST");
    })
    .then(data => {
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("login_token", true);
      localStorage.setItem("cinema_adm_key", data.isAdmin);
      history.push("/app");
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

export const logout = () => {
  localStorage.clear();
  // eslint-disable-next-line no-restricted-globals
  location.reload();
};
