import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { PulseLoader } from "react-spinners";

const Dropdown = ({ uid }) => {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const { id } = useParams();
	const { name, loadingData } = useUser(id);

	const handleLogout = () => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton:
					"focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
				cancelButton:
					"text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800",
			},
			buttonsStyling: false,
		});

		swalWithBootstrapButtons
			.fire({
				title: "Apakah Anda yakin ingin logout?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Logout",
				cancelButtonText: "Batal",
				reverseButtons: true,
			})
			.then(async (result) => {
				if (result.isConfirmed) {
					try {
						await logout();
						navigate("/");
						Swal.fire({
							icon: "success",
							title: "Logout berhasil",
							showConfirmButton: false,
							timer: 1500,
						});
					} catch (error) {
						return Swal.fire({
							icon: "error",
							title: "Maaf",
							text: "Anda gagal logout",
						});
					}
				}
			});
	};

	return (
		<div className="absolute right-2 top-full z-10 mt-2 w-44 divide-y divide-gray-100 rounded bg-white shadow">
			<div className="py-1">
				<h4 className="block border-b border-gray-200 px-4 py-2 text-center font-semibold text-gray-600 hover:bg-gray-100">
					{loadingData && (
						<div className="my-0 mx-auto flex items-center justify-center pt-5">
							<PulseLoader size={5} color="#2563eb" />
						</div>
					)}
					<Link to={`/${uid}/profile`}>
					{name}
					</Link>
				</h4>
				<button className="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Dropdown;
