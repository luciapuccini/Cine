const isLoggedInAdmin = () => {
  return !!localStorage.getItem("cinema_adm_key");
};

const isLoggedInWeb = () => {
  return !!localStorage.getItem("cinema_user_key");
};

const getWebHeaders = () => {
  const token = localStorage.getItem("cinema_user_key");
  return { Authorization: `Bearer ${token}` };
};

const getAdminHeaders = () => {
  const token = localStorage.getItem("cinema_adm_key");
  return { Authorization: `Bearer ${token}` };
};

const logout = () => {
  localStorage.clear();
  // eslint-disable-next-line no-restricted-globals
  location.reload();
};

export {
  isLoggedInAdmin,
  isLoggedInWeb,
  getAdminHeaders,
  getWebHeaders,
  logout
};
