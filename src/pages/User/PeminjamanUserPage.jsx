import React, { useState } from "react";

import PeminjamanListUser from "../../components/User/PeminjamanListUser";

export default function PeminjamanUserPage({ uid }) {

	return (
		<div>
			{/* <Helmet>
				<title>Data Mata Pelajaran</title>
				<meta name="description" content="Penilaian siswa" />
			</Helmet> */}
			<div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
				<h2 className="text-xl font-bold text-gray-800">Peminjaman Buku</h2>
			</div>
			<PeminjamanListUser uid={uid}/>
		</div>
	);
};
