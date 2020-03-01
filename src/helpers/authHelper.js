const isLoggedIn = () => {
  const token = getJWT();
  return !!token;
};

const getJWT = () => {
  return localStorage.getItem("JWT");
};

const isLoggedInAdmin = () => {
  const role = localStorage.getItem("isAdmin");
  return role === "true";
};

const getAuthHeaders = () => {
  const token = getJWT();
  return { Authorization: `Bearer ${token}` };
};

let PLAYS = true;
export const setPlays = has => {
  PLAYS = has;
};
export const getPlays = () => {
  return PLAYS;
};
export { isLoggedInAdmin, isLoggedIn, getAuthHeaders, getJWT };
