import React, { useState } from "react";

import { PlusIcon } from "@heroicons/react/24/outline";
import DashboardAdmin from "./DashboardAdmin";
import ModalCreateBuku from "../../components/Admin/ModalCreateBuku";
import BukuList from "../../components/Admin/BukuList";
import UserList from "../../components/Admin/UserList";
import ModalCreateUser from "../../components/Admin/ModalCreateUser";
import PustakawanList from "../../components/Admin/PustakawanList";
import ModalCreatePustakawan from "../../components/Admin/ModalCreatePustakawan";

export default function PustakawanPage() {
    const [modalCreateTrigger, setModalCreateTrigger] = useState(false);

	const handleModalCreateTrigger = () => {
		setModalCreateTrigger(!modalCreateTrigger);
	};

	return (
		<div>
			{/* <Helmet>
				<title>Data Mata Pelajaran</title>
				<meta name="description" content="Penilaian siswa" />
			</Helmet> */}
			<div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
				<h2 className="text-xl font-bold text-gray-800">Data User</h2>
				<button
					type="button"
					className="focus:shadow-outline rounded-lg bg-indigo-500 py-2 px-4 font-semibold text-white hover:bg-indigo-600 focus:outline-none"
					onClick={handleModalCreateTrigger}>
					<PlusIcon className="h-5 w-5" />
				</button>
			</div>
			<PustakawanList />
			{modalCreateTrigger && <ModalCreatePustakawan handleModalCreateTrigger={handleModalCreateTrigger} />}
		</div>
	);
};
