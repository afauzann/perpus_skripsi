import { auth, db } from "../configs/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { PulseLoader } from "react-spinners";

export default function useUser() {
	const [user, loading] = useAuthState(auth);
	const [role, setRole] = useState("");
	const [name, setName] = useState("");
	const [loadingData, setLoadingData] = useState(true);

	const fetchRole = async () => {
		if (loading) {
			return setTimeout(() => <PulseLoader size={10} color="#2563eb" />, 1500);
		}
		if (!loading) {
			try {
				const q = query(collection(db, "users"), where("uid", "==", user?.uid));
				const doc = await getDocs(q);
				const data = doc.docs[0].data();
				setRole(data.role);
				setName(data.name);
				setLoadingData(false);
			} catch (err) {
				console.error(err);
				alert("An error occured while fetching user data");
			}
		}
	};
	useEffect(() => {
		fetchRole();
	}, [user]);

	return { role, loadingData, name };
}
