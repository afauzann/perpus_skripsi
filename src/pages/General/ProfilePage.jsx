import React, { useState } from "react";

import { PlusIcon } from "@heroicons/react/24/outline";
import ProfileList from "../../components/General/ProfileList";

export default function ProfilePage({uid}) {

	return (
		<div>
			{/* <Helmet>
				<title>Data Mata Pelajaran</title>
				<meta name="description" content="Penilaian siswa" />
			</Helmet> */}
			<div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
				<h2 className="text-xl font-bold text-gray-800">Profile Page</h2>
			</div>
			<ProfileList uid={uid}/>
		</div>
	);
};
