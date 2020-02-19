import { stringify } from "querystring";

//check exp
const isLoggedIn = () => {
  return !!localStorage.getItem("JWT");
};
const getJWT = () => {
  return localStorage.getItem("JWT");
};


const isLoggedInAdmin = () => {
 //TODO: return JSON.parse(localStorage.getItem()).isAdmin;
};
const getWebHeaders = () => {
  const token = localStorage.getItem("cinema_user_key");
  return { Authorization: `Bearer ${token}` };
};

const getAdminHeaders = () => {
  const token = localStorage.getItem("cinema_adm_key");
  return { Authorization: `Bearer ${token}` };
};
//TODO: const getUserId = () => JSON.parse(localStorage.getItem()).id;
export {
  isLoggedInAdmin,
  isLoggedIn,
  getAdminHeaders,
  getWebHeaders,
  getJWT
  //getUserId
};
