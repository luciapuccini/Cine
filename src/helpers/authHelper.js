const isLoggedIn = () => {
  const token = getJWT();
  return !!token;
};

const getJWT = () => {
  return localStorage.getItem("JWT");
};

const isLoggedInAdmin = () => {
  const role = localStorage.getItem("isAdmin");
  return role;
};

const getAuthHeaders = () => {
  const token = getJWT();
  return { Authorization: `Bearer ${token}` };
};

// TODO: const getUserId = () => JSON.parse(localStorage.getItem()).id;
export {
  isLoggedInAdmin,
  isLoggedIn,
  getAuthHeaders,
  getJWT
  // getUserId
};
