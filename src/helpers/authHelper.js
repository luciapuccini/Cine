import { stringify } from "querystring";

const isLoggedIn = () => {
  return !!localStorage.getItem("login_token");
};

const isLoggedInAdmin = () => {
  return JSON.parse(localStorage.getItem("user")).isAdmin;
};
const getWebHeaders = () => {
  const token = localStorage.getItem("cinema_user_key");
  return { Authorization: `Bearer ${token}` };
};

const getAdminHeaders = () => {
  const token = localStorage.getItem("cinema_adm_key");
  return { Authorization: `Bearer ${token}` };
};
const getUserId = () => JSON.parse(localStorage.getItem("user")).id;
export {
  isLoggedInAdmin,
  isLoggedIn,
  getAdminHeaders,
  getWebHeaders,
  getUserId
};
