class AuthHelper {
  static isLoggedInAdmin() {
    return !!localStorage.getItem('cinema_adm_key');
  }

  static isLoggedInWeb() {
    return !!localStorage.getItem('cinema_user_key');
  }

  static getWebHeaders() {
    const token = localStorage.getItem('cinema_user_key');
    return { Authorization: `Bearer ${token}` };
  }

  static getAdminHeaders() {
    const token = localStorage.getItem('cinema_adm_key');
    return { Authorization: `Bearer ${token}` };
  }
}

export default AuthHelper;
