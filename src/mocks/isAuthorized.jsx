import { Squares2X2Icon, IdentificationIcon, BookOpenIcon, UserPlusIcon, ClipboardDocumentIcon, FlagIcon, DocumentArrowUpIcon, DocumentArrowDownIcon, CurrencyDollarIcon, TagIcon } from "@heroicons/react/24/outline";
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
		path: "/admin/user",
		icon: <IdentificationIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Pustakawan",
		path: "/admin/pustakawan",
		icon: <IdentificationIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Buku",
		path: "/buku",
		icon: <BookOpenIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Kategori",
		path: "/kategori",
		icon: <TagIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Transaksi",
		path: "/admin/peminjaman", // Ubah path menu menjadi "/admin/transaksi"
		icon: <CurrencyDollarIcon className="ml-2 h-6 w-6 transition duration-75" />,
		submenu: [
		  // Tambahkan submenu "Peminjaman" dan "Pengembalian"
		  {
			name: "Peminjaman",
			path: "/admin/peminjaman",
			icon: <DocumentArrowUpIcon className="ml-2 h-6 w-6 transition duration-75"/>
		  },
		  {
			name: "Pengembalian",
			path: "/admin/pengembalian",
			icon: <DocumentArrowDownIcon className="ml-2 h-6 w-6 transition duration-75" />
		  },
		],
	  },
	  {
		name: "Laporan Peminjaman",
		path: "/admin/laporan_peminjaman",
		icon: <ClipboardDocumentIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Laporan Pengembalian",
		path: "/admin/laporan_pengembalian",
		icon: <ClipboardDocumentIcon className="ml-2 h-6 w-6 transition duration-75" />,
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
		icon: <DocumentArrowUpIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Pengembalian",
		path: `/:uid/user/pengembalian`,
		icon: <DocumentArrowDownIcon className="ml-2 h-6 w-6 transition duration-75" />,
	},
];

export const isAuthorizedPustakawan = [
	{
		name: "Dashboard",
		// path: `/${uid}/dashboard`,
		path: `/:uid/dashboard`,
		icon: <Squares2X2Icon className="ml-2 h-6 w-6 transition duration-75" />,
	},
	{
		name: "Transaksi",
		path: "/pustakawan/peminjaman", // Ubah path menu menjadi "/admin/transaksi"
		icon: <CurrencyDollarIcon className="ml-2 h-6 w-6 transition duration-75" />,
		submenu: [
		  // Tambahkan submenu "Peminjaman" dan "Pengembalian"
		  {
			name: "Peminjaman",
			path: "/pustakawan/peminjaman",
			icon: <DocumentArrowUpIcon className="ml-2 h-6 w-6 transition duration-75"/>
		  },
		  {
			name: "Pengembalian",
			path: "/pustakawan/pengembalian",
			icon: <DocumentArrowDownIcon className="ml-2 h-6 w-6 transition duration-75" />
		  },
		],
	  },
];