// const API = "http://tranquil-garden-64415.herokuapp.com";
const API = "http://localhost:8080";

// -------------------------- USER ---------------------------
export const fetchUser = () => {
  const token = localStorage.getItem("JWT");
  return fetch(`${API}/user/getUser`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(user => {
      if (user.status) {
        throw Error(user.message);
      }
      localStorage.setItem("isAdmin", user.role === "ROLE_ADMIN");
      localStorage.setItem("USER_ID", user.id);
      return user;
    })
    .catch(error => {
      console.log("[BAD USER REQUEST]:", error);
    });
};

export const editUser = user => {
  const token = localStorage.getItem("JWT");
  console.log("EDIT", user);
  return fetch(`${API}/user/modify`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(u => {
      if (u.status) {
        throw Error(u.message);
      }
      return u;
    })
    .catch(error => {
      console.log(error);
    });
};

export const createUser = (email, name, password) => {
  const token = localStorage.getItem("JWT");
  const user = { email, name, password };
  return fetch(`${API}/user/add`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(u => {
      if (u.status) {
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
  const token = localStorage.getItem("JWT");

  return fetch(`${API}/books/add`, {
    method: "POST",
    body: JSON.stringify(booking),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(booking => {
      if (booking.status) {
        throw Error(booking.message);
      }
      return booking;
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchBookings = userId => {
  const token = localStorage.getItem("JWT");

  const bookingsData = fetch(`${API}/books/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(bookings => bookings);
  return bookingsData;
};

export const deleteBooking = bookingId => {
  const token = localStorage.getItem("JWT");

  return fetch(`${API}/books/delete`, {
    method: "POST",
    body: JSON.stringify(bookingId),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(booking => {
      if (booking.status) {
        throw Error(booking.message);
      }
      return booking;
    })
    .catch(error => {
      console.log(error);
    });
};

export const bookTemporalSeat = booking => {
  const token = localStorage.getItem("JWT");

  return fetch(`${API}/books/bookTemporalSeat`, {
    method: "POST",
    body: JSON.stringify(booking),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(booking => {
      return booking;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

// -------------------------- MOVIES ----------------------------------

export const getMovies = () => {
  const movieData = fetch(`${API}/movies/all`)
    .then(response => response.json())
    .then(movies => {
      if (movies.status) {
        throw Error(movies.message);
      }
      return movies;
    })
    .catch(error => {
      console.log(error);
    });
  return movieData;
};

export const addMovie = (movie, image) => {
  const token = localStorage.getItem("JWT");

  const formData = new FormData();
  formData.append("movie", JSON.stringify(movie));
  formData.append("imageFile", image);

  return fetch(`${API}/movies/add`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(mov => {
      if (mov.status) {
        throw Error(mov.message);
      }
      return mov;
    })
    .catch(error => {
      return error;
      console.log(error);
    });
};

export const deleteMovie = movieId => {
  const token = localStorage.getItem("JWT");
  return fetch(`${API}/movies/delete`, {
    method: "POST",
    body: JSON.stringify({ id: movieId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(movie => {
      if (movie.status) {
        throw Error(movie.message);
      }
      return movie;
    })
    .catch(error => {
      console.log(error);
    });
};

export const editMovie = movie => {
  const token = localStorage.getItem("JWT");

  return fetch(`${API}/movies/modify`, {
    method: "PUT",
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(mov => {
      if (mov.status) {
        throw Error(mov.message);
      }
      return mov;
    })
    .catch(error => {
      alert(error);
      console.log(error);
    });
};

export const fetchMovie = id => {
  const token = localStorage.getItem("JWT");
  const movieId = { id };
  return fetch(`${API}/movies/getMoviePlays`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(movieId)
  })
    .then(response => {
      return response.json();
    })
    .then(movie => {
      if (movie.status) {
        throw Error(movie.message);
      }
      return movie;
    })
    .catch(error => {
      console.log("[BAD movie REQUEST]:", error);
    });
};

// ------------------------- PLAYS -----------------------------------

export const fetchPlays = () => {
  const token = localStorage.getItem("JWT");
  return fetch(`${API}/plays/all`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(plays => {
      if (plays.status) {
        throw Error(plays.message);
      }
      return plays;
    })
    .catch(error => {
      console.log(error);
    });
};

export const addPlay = play => {
  const token = localStorage.getItem("JWT");

  return fetch(`${API}/plays/add`, {
    method: "POST",
    body: JSON.stringify(play),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(p => {
      if (p.status) {
        throw Error(p.message);
      }
      return p;
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchPlay = playPk => {
  const token = localStorage.getItem("JWT");

  return fetch(`${API}/plays/getPlay`, {
    method: "POST",
    body: JSON.stringify(playPk),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(play => {
      if (play.status) {
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
  const token = localStorage.getItem("JWT");

  return fetch(`${API}/plays/delete`, {
    method: "POST",
    body: JSON.stringify(playPk),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(play => {
      if (play.status) {
        throw Error(play.message);
      }
      return play;
    })
    .catch(error => {
      console.log(error);
    });
};

export const getPlayBookedSeats = playPk => {
  const token = localStorage.getItem("JWT");

  return fetch(`${API}/plays/getPlayBookedSeats`, {
    method: "POST",
    body: JSON.stringify(playPk),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(play => {
      if (play.status) {
        throw Error(play.message);
      }
      return play;
    })
    .catch(error => {
      console.log(error);
    });
};

// --------------------------PRICES---------------------------------

export const getCurrentPrices = () => {
  const token = localStorage.getItem("JWT");

  return fetch(`${API}/price/getCurrentPrices`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(plays => {
      if (plays.status) {
        throw Error(plays.message);
      }
      return plays;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

export const addPrice = price => {
  const token = localStorage.getItem("JWT");

  return fetch(`${API}/price/add`, {
    method: "POST",
    body: JSON.stringify(price),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(price => {
      console.log("PRICE", price);
      if (!price.status) {
        throw Error(price.message);
      }
      return price;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

export const fetchPrices = () => {
  const token = localStorage.getItem("JWT");

  return fetch(`${API}/price/getAll`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(price => {
      if (price.status) {
        throw Error(price.message);
      }
      return price;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

// ----------------------------- AUTH -------------------------------

export const login = (email, password) => {
  const user = { email, password };
  return fetch(`${API}/user/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.status) {
        throw Error(data.message);
      } else if (data.jwk !== undefined) {
        localStorage.setItem("JWT", data.jwt);
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
