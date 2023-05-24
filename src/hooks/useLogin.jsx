import { auth } from "../configs/firebase";
import Cookies from "js-cookie";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Alert = MySwal.mixin({
	toast: false,
	showConfirmButton: true,
	customClass: {
		container: "custom-toast",
	},
});

export default function Login() {
	const login = async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
		Cookies.set("token", auth.currentUser.accessToken), Cookies.set("rf", auth.currentUser.refreshToken);
		setTimeout(
			() =>
				Alert.fire({
					icon: "success",
					title: <strong>Sukses</strong>,
					text: "Login berhasil",
					background: "#fefefe",
					confirmButtonColor: "#0000ff",
				}),
			2000
		);
	};
	return login;
}
