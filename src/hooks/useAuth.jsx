import Auth from "../utils/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../configs/firebase";

export default function useAuth() {
	const [user, setUser] = useState(auth.currentUser);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});
	}, []);

	const logout = async () => {
		setLoading(true);
		await auth.signOut();
		Auth.logout();
	};

	return { logout, user, loading };
}
