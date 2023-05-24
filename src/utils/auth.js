import Cookies from "js-cookie";


const Auth = {
	isAuthorization() {
		if (Cookies.get("token")) return true;
		return null;
	},

	logout() {
		Cookies.remove("token");
		Cookies.remove("rf");
	},
};

export default Auth;