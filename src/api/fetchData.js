// -------------------------- USER ---------------------------

export const fetchUser = () => {
  const token = localStorage.getItem("JWT");
  return fetch("http://localhost:8080/user/getUser", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(user => {
      if (user.code) {
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

  console.log("EDIT", Headers, user);
  return fetch("http://localhost:8080/user/modify", {
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
  const token = localStorage.getItem("JWT");
  const user = { email, name, password };
  return fetch("http://localhost:8080/user/add", {
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
  const token = localStorage.getItem("JWT");

  return fetch("http://localhost:8080/books/add", {
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
  console.log("fetch booki");
  const token = localStorage.getItem("JWT");

  const bookingsData = fetch(`http://localhost:8080/books/${userId}`, {
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

  return fetch("http://localhost:8080/books/delete", {
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
      if (booking.code) {
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

  return fetch("http://localhost:8080/books/bookTemporalSeat", {
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
      console.log(booking, "1");
      return booking;
    })
    .catch(error => {
      console.log(error);
      return error;
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

export const addMovie = (movie, image) => {
  const token = localStorage.getItem("JWT");

  const formData = new FormData();
  formData.append("movie", JSON.stringify(movie));
  formData.append("imageFile", image);

  return fetch("http://localhost:8080/movies/add", {
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
      if (mov.code) {
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

  return fetch("http://localhost:8080/movies/delete", {
    method: "POST",
    body: JSON.stringify({ movieId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
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
  const token = localStorage.getItem("JWT");

  console.log("que madno", movie);
  return fetch("http://localhost:8080/movies/modify", {
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
      if (mov.code) {
        throw Error(mov.message);
      }
      return mov;
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchMovie = id => {
  const token = localStorage.getItem("JWT");
  const movieId = { id };
  return fetch("http://localhost:8080/movies/getMoviePlays", {
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
      if (movie.code) {
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
  return fetch("http://localhost:8080/plays/all", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
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
  const token = localStorage.getItem("JWT");

  return fetch("http://localhost:8080/plays/add", {
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
  const token = localStorage.getItem("JWT");

  return fetch("http://localhost:8080/plays/getPlay", {
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
  const token = localStorage.getItem("JWT");

  return fetch("http://localhost:8080/plays/delete", {
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
      if (play.code) {
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

  return fetch("http://localhost:8080/plays/getPlayBookedSeats", {
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
      if (play.code) {
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

  return fetch("http://localhost:8080/price/getCurrentPrices", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
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
      return error;
      console.log(error);
    });
};

export const addPrice = price => {
  console.log(price);
  const token = localStorage.getItem("JWT");

  return fetch("http://localhost:8080/price/add", {
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
  console.log("get prices", token);
  return fetch("http://localhost:8080/price/getAll", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(price => {
      if (price.code) {
        throw Error(price.message);
      }
      return price;
    })
    .catch(error => {
      return error;
      console.log(error);
    });
};

// ----------------------------- AUTH -------------------------------
export const login = (email, password, history) => {
  const user = { email, password };
  return fetch("http://localhost:8080/user/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.code) {
        console.log(data);
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
