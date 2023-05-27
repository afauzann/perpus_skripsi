import Cookies from "js-cookie";

const Auth = {
  isAuthorization() {
    if (Cookies.get("token")) return true;
    return null;
  },

  logout() {
    Cookies.remove("token");
    Cookies.remove("rf");
    Cookies.remove("uid"); // Hapus juga uid saat logout
  },
};

export default Auth;
