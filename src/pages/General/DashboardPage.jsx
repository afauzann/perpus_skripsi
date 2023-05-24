import React from "react";
import { useParams } from "react-router-dom";

// import imgAdmin from "../../assets/img/png/img-admin.png";
// import imgGuru from "../../assets/img/png/img-guru.png";
// import OverviewData from "../../components/Admin/OverviewData";
import { PulseLoader } from "react-spinners";
import useUser from "../../hooks/useUser";
import DashboardAdmin from "../Admin/DashboardAdmin";
// import { Helmet } from "react-helmet";

const DashboardPage = () => {
	const { id } = useParams();
	const { role, loadingData, name } = useUser(id);

	return (
		<div>
			{loadingData && (
				<div className="my-0 mx-auto flex items-center justify-center pt-5">
					<PulseLoader size={10} color="#2563eb" />
				</div>
			)}
			{role == "admin" && (
				<div>
					{/* <Helmet>
						<title>Dashboard Admin</title>
						<meta name="description" content="Penilaian siswa" />
					</Helmet> */}
					<div className="flex items-center border-b border-gray-200 bg-white px-6 py-3">
						<h2 className="text-xl font-bold text-gray-800">Dashboard Admin</h2>
					</div>
					<div className="container mx-auto py-4 px-6">
						<div className="rounded-lg bg-white p-6 shadow">
							<div className="md:flex">
								<div className="mb-8 text-center sm:text-center md:mb-0 md:w-full md:text-start lg:text-start xl:text-start">
									<h2 className="mb-2 text-xl font-bold leading-tight text-gray-800 md:text-2xl">Selamat Datang Kembali</h2>
									<p className="mb-2 text-lg font-medium text-gray-600">{name}</p>
								</div>
								{/* <div className="md:w-full">
									<img src={imgAdmin} alt="image admin" className="mx-auto h-48 w-64 object-cover" />
								</div> */}
							</div>
						</div>
					</div>
					<DashboardAdmin />
				</div>
			)}

			{role == "siswa" && (
				<div>
					{/* <Helmet>
						<title>Dashboard Guru</title>
						<meta name="description" content="Penilaian siswa" />
					</Helmet> */}
					<div className="flex items-center border-b border-gray-200 bg-white px-6 py-3">
						<h2 className="text-xl font-bold text-gray-800">Dashboard Siswa</h2>
					</div>
					<div className="container mx-auto py-4 px-6">
						<div className="rounded-lg bg-white p-6 shadow">
							<div className="md:flex">
								<div className="mb-8 text-center sm:text-center md:mb-0 md:w-full md:text-start lg:text-start xl:text-start">
									<h2 className="mb-2 text-xl font-bold leading-tight text-gray-800 md:text-2xl">Selamat Datang Kembali</h2>
									<p className="mb-2 text-lg font-medium text-gray-600">{name}</p>
								</div>
								{/* <div className="md:w-full">
									<img src={imgGuru} alt="image admin" className="mx-auto h-48 w-64 object-cover" />
								</div> */}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardPage;
