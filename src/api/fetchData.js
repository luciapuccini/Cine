/* eslint-disable import/prefer-default-export */
const headers = new Headers({ "Content-Type": "application/json" });

// -------------------------- USER ---------------------------
export const editUser = user => {
  return fetch("http://localhost:8080/user/modify", {
    method: "PUT",
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

// --------------------------BOOKINGS---------------------

export const createBooking = booking => {
  return fetch("http://localhost:8080/books/add", {
    method: "POST",
    body: JSON.stringify(booking),
    headers
  })
    .then(response => {
      return response.json();
    })
    .then(booking => {
      if (booking.code) {
        throw Error(booking.message);
      }
      return booking;
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchBookings = userId => {
  const bookingsData = fetch(`http://localhost:8080/books/${userId}`)
    .then(response => response.json())
    .then(bookings => bookings);
  return bookingsData;
};

export const deleteBooking = bookingId => {
  return fetch("http://localhost:8080/books/delete", {
    method: "POST",
    body: JSON.stringify(bookingId),
    headers
  })
    .then(response => {
      return response.json();
    })
    .then(booking => {
      if (booking.code) {
        throw Error(booking.message);
      }
      return booking;
    })
    .catch(error => {
      console.log(error);
    });
};
// -------------------------- MOVIES ----------------------------------

export const getMovies = () => {
  const movieData = fetch("http://localhost:8080/movies/all")
    .then(response => response.json())
    .then(movies => movies);
  return movieData;
};

export const addMovie = movie => {
  console.log("armar bien", movie);
  return fetch("http://localhost:8080/movies/add", {
    method: "POST",
    body: JSON.stringify(movie),
    headers
  })
    .then(response => {
      return response.json();
    })
    .then(movie => {
      if (movie.code) {
        throw Error(movie.message);
      }
      return movie;
    })
    .catch(error => {
      console.log("[movies add error]", error);
    });
};

export const deleteMovie = movieId => {
  return fetch("http://localhost:8080/movies/delete", {
    method: "POST",
    body: JSON.stringify({ id: movieId }),
    headers
  })
    .then(response => {
      return response.json();
    })
    .then(movie => {
      if (movie.code) {
        throw Error(movie.message);
      }
      return movie;
    })
    .catch(error => {
      console.log("[mvovies delete error]", error);
    });
};

export const editMovie = movie => {
  console.log("que madno", movie);
  return fetch("http://localhost:8080/movies/modify", {
    method: "PUT",
    body: JSON.stringify(movie),
    headers
  })
    .then(response => {
      return response.json();
    })
    .then(movie => {
      if (movie.code) {
        throw Error(movie.message);
      }
      return movie;
    })
    .catch(error => {
      console.log("[mvovies delete error]", error);
    });
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

export const addPlay = play => {
  return fetch("http://localhost:8080/plays/add", {
    method: "POST",
    body: JSON.stringify(play),
    headers
  })
    .then(response => {
      return response.json();
    })
    .then(play => {
      if (play.code) {
        throw Error(play.message);
      }
      return play;
    })
    .catch(error => {
      console.log("[play add error]", error);
    });
};

export const fetchPlay = playPk => {
  return fetch("http://localhost:8080/plays/getPlay", {
    method: "POST",
    body: JSON.stringify(playPk),
    headers
  })
    .then(response => {
      return response.json();
    })
    .then(play => {
      if (play.code) {
        throw Error(play.message);
      }
      return play;
    })
    .catch(error => error);
};

export const deletePlay = playPk => {
  return fetch("http://localhost:8080/plays/delete", {
    method: "POST",
    body: JSON.stringify(playPk),
    headers
  })
    .then(response => {
      return response.json();
    })
    .then(play => {
      if (play.code) {
        throw Error(play.message);
      }
      return play;
    })
    .catch(error => {
      console.log(error);
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
