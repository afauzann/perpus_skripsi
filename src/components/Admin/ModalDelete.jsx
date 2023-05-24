import React from "react";

import { InformationCircleIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";

const ModalDelete = ({ handleModalDeleteTrigger, handleDeleteSiswa, handleDeleteBuku, handleDeleteGuru, guru, buku, siswa }) => {
	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-opacity"></div>
			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto overflow-x-hidden">
				<div className="flex w-full items-center justify-center pt-36 sm:h-full sm:items-center sm:p-0 md:h-screen">
					<div className="relative w-full max-w-xs p-4">
						<div className="rounded-lg bg-white shadow">
							<div className="p-6 text-center">
								<InformationCircleIcon className="mx-auto mb-4 h-14 w-14 text-red-400" />
								<h3 className="mb-5 text-sm font-medium text-gray-800">Apakah Anda yakin ingin menghapus data ini</h3>
								<div className="flex items-center justify-center">
									{siswa && (
										<button
											data-modal-toggle="popup-modal"
											type="button"
											className="mr-2 inline-flex items-center justify-center rounded-lg bg-red-100 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-4 focus:ring-red-300"
											onClick={handleDeleteSiswa}>
											<TrashIcon className="mr-2 h-4 w-4" /> <span>Hapus</span>
										</button>
									)}

									{buku && (
										<button
											data-modal-toggle="popup-modal"
											type="button"
											className="mr-2 inline-flex items-center justify-center rounded-lg bg-red-100 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-4 focus:ring-red-300"
											onClick={handleDeleteBuku}>
											<TrashIcon className="mr-2 h-4 w-4" /> <span>Hapus</span>
										</button>
									)}

									{guru && (
										<button
											data-modal-toggle="popup-modal"
											type="button"
											className="mr-2 inline-flex items-center justify-center rounded-lg bg-red-100 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-4 focus:ring-red-300"
											onClick={handleDeleteGuru}>
											<TrashIcon className="mr-2 h-4 w-4" /> <span>Hapus</span>
										</button>
									)}

									<button
										data-modal-toggle="popup-modal"
										type="button"
										className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
										onClick={handleModalDeleteTrigger}>
										<XCircleIcon className="mr-2 h-4 w-4" /> <span>Batal</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalDelete;
