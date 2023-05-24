import { Squares2X2Icon, IdentificationIcon, BookOpenIcon, UserPlusIcon, ClipboardDocumentIcon, FlagIcon } from "@heroicons/react/24/outline";

export const isAuthorizedAdmin = [
	{
		name: "Dashboard",
		path: "/dashboard",
		icon: <Squares2X2Icon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Siswa",
		path: "/admin",
		icon: <IdentificationIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Buku",
		path: "/buku",
		icon: <BookOpenIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "3",
		path: "/admin",
		icon: <UserPlusIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "4",
		path: "/admin",
		icon: <ClipboardDocumentIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
];

export const isAuthorizedSiswa = [
	{
		name: "Dashboard",
		path: "/dashboard",
		icon: <Squares2X2Icon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Penilaian",
		path: "/user",
		icon: <FlagIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
];
