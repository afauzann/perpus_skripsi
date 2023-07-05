import React, { useState } from "react";
import PengembalianList from "../../components/Pustakawan/PengembalianList";

export default function PengembalianPustakawanPage() {

	return (
		<div>
			{/* <Helmet>
				<title>Data Mata Pelajaran</title>
				<meta name="description" content="Penilaian siswa" />
			</Helmet> */}
			<div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
				<h2 className="text-xl font-bold text-gray-800">Pengembalian Buku</h2>
			</div>
			<PengembalianList />
		</div>
	);
};
