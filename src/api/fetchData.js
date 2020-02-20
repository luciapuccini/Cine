/* eslint-disable import/prefer-default-export */
import { getAuthHeaders } from "../helpers/authHelper";

const contentHeader = new Headers({ "Content-Type": "application/json" });
const authHeaders = new Headers(
  { "Content-Type": "application/json" },
  getAuthHeaders()
);
// -------------------------- USER ---------------------------

export const fetchUser = () => {
  return fetch("http://localhost:8080/user/getUser", {
    method: "GET",
    headers: getAuthHeaders()
  })
    .then(response => {
      return response.json();
    })
    .then(user => {
      if (user.code) {
        throw Error(user.message);
      }
      localStorage.setItem("isAdmin", user.role == "ROLE_ADMIN");
      console.log(user);
      return user;
    })
    .catch(error => {
      console.log("[BAD USER REQUEST]:", error);
    });
};

export const editUser = user => {
  console.log("EDIT", Headers, user);
  return fetch("http://localhost:8080/user/modify", {
    method: "PUT",
    body: JSON.stringify(user),
    headers: authHeaders
  })
    .then(response => {
      return response.json();
    })
    .then(u => {
      if (u.code) {
        throw Error(u.message);
      }
      return u;
    })
    .catch(error => {
      console.log(error);
    });
};

export const createUser = (email, name, password) => {
  const user = { email, name, password };
  return fetch("http://localhost:8080/user/add", {
    method: "POST",
    body: JSON.stringify(user),
    headers: contentHeader
  })
    .then(response => {
      return response.json();
    })
    .then(u => {
      if (u.code) {
        throw Error(u.message);
      }
      return u;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

// --------------------------BOOKINGS---------------------

export const createBooking = booking => {
  return fetch("http://localhost:8080/books/add", {
    method: "POST",
    body: JSON.stringify(booking),
    headers: contentHeader
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
    headers: contentHeader
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
    .then(movies => {
      if (movies.code) {
        throw Error(movies.message);
      }
      return movies;
    })
    .catch(error => {
      console.log(error);
    });
  return movieData;
};

export const addMovie = movie => {
  console.log("armar bien", movie);
  return fetch("http://localhost:8080/movies/add", {
    method: "POST",
    body: JSON.stringify(movie),
    headers: contentHeader
  })
    .then(response => {
      return response.json();
    })
    .then(mov => {
      if (mov.code) {
        throw Error(mov.message);
      }
      return mov;
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteMovie = movieId => {
  return fetch("http://localhost:8080/movies/delete", {
    method: "POST",
    body: JSON.stringify({ id: movieId }),
    headers: contentHeader
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
      console.log(error);
    });
};

export const editMovie = movie => {
  console.log("que madno", movie);
  return fetch("http://localhost:8080/movies/modify", {
    method: "PUT",
    body: JSON.stringify(movie),
    headers: contentHeader
  })
    .then(response => {
      return response.json();
    })
    .then(mov => {
      if (mov.code) {
        throw Error(mov.message);
      }
      return mov;
    })
    .catch(error => {
      console.log(error);
    });
};
// ------------------------- PLAYS -----------------------------------

// mock plays all
// http://www.mocky.io/v2/5e3626cf3200006400ae3c2c

export const fetchPlays = () => {
  return fetch("http://localhost:8080/plays/all")
    .then(response => {
      return response.json();
    })
    .then(plays => {
      if (plays.code) {
        throw Error(plays.message);
      }
      return plays;
    })
    .catch(error => {
      console.log(error);
    });
};

export const addPlay = play => {
  return fetch("http://localhost:8080/plays/add", {
    method: "POST",
    body: JSON.stringify(play),
    headers: contentHeader
  })
    .then(response => {
      return response.json();
    })
    .then(p => {
      if (p.code) {
        throw Error(p.message);
      }
      return p;
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchPlay = playPk => {
  return fetch("http://localhost:8080/plays/getPlay", {
    method: "POST",
    body: JSON.stringify(playPk),
    headers: contentHeader
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
      return error;
    });
};

export const deletePlay = playPk => {
  return fetch("http://localhost:8080/plays/delete", {
    method: "POST",
    body: JSON.stringify(playPk),
    headers: contentHeader
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
export const login = (username, password, history) => {
  // NOTE: email !!!!!
  const user = { username, password };
  return fetch("http://localhost:8080/user/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: contentHeader
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.code) {
        console.log(data);
        throw Error(data.message);
      }
      localStorage.setItem("JWT", data.jwt);

      return data;
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
