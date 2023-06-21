import React, { useState } from "react";

import ModalCreateBuku from "../../components/Admin/ModalCreateBuku";
import BukuListUser from "../../components/User/BukuListUser";

export default function BukuUserPage() {
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
				<h2 className="text-xl font-bold text-gray-800">Data Buku</h2>
			</div>
			<BukuListUser />
			{modalCreateTrigger && <ModalCreateBuku handleModalCreateTrigger={handleModalCreateTrigger} />}
		</div>
	);
};
