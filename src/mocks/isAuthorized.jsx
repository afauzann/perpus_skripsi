import { Squares2X2Icon, IdentificationIcon, BookOpenIcon, UserPlusIcon, ClipboardDocumentIcon, FlagIcon } from "@heroicons/react/24/outline";
import Auth from "../utils/auth";
import useUser from "../hooks/useUser";

// const uid = Auth.getUidFromCookies();

export const isAuthorizedAdmin = [
	{
		name: "Dashboard",
		// path: `/${uid}/dashboard`,
		path: `/:uid/dashboard`,
		icon: <Squares2X2Icon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Siswa",
		path: "/admin1",
		icon: <IdentificationIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Buku",
		path: "/buku",
		icon: <BookOpenIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Peminjaman Buku",
		path: "/admin/peminjaman",
		icon: <ClipboardDocumentIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "4",
		path: "/admin1",
		icon: <UserPlusIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
];

export const isAuthorizedSiswa = [
	{
		name: "Dashboard",
		// path: `/${uid}/dashboard`,
		path: `/:uid/dashboard`,
		icon: <Squares2X2Icon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Buku",
		path: `/:userId/buku`,
		icon: <BookOpenIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Peminjaman",
		path: `/:uid/user/peminjaman`,
		icon: <FlagIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
];

