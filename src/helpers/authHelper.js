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
  console.log(token);
  return { Authorization: `Bearer ${token}` };
};

let PLAYS = true;
export const setPlays = has => {
  console.log(has);
  PLAYS = has;
};
export const getPlays = () => {
  return PLAYS;
};
// TODO: const getUserId = () => JSON.parse(localStorage.getItem()).id;
export {
  isLoggedInAdmin,
  isLoggedIn,
  getAuthHeaders,
  getJWT
  // getUserId
};
