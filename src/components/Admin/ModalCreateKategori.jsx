import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { v4 } from "uuid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AddBuku } from "../../graphql/typeDefs/buku.graphql";
import Swal from "sweetalert2";
import { storage } from "../../configs/firebase";
import { PulseLoader } from "react-spinners";
import { AddKategori } from "../../graphql/typeDefs/kategori.graphql";

const ModalCreateKategori = ({ handleModalCreateTrigger }) => {
	const kategoriData = {
		nama_kategori: "",
	};

    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(false);
	const [data, setData] = useState(kategoriData);
	const [addKategori] = useMutation(AddKategori, {
		onError: () => {
			setTimeout(
				() =>
					Swal.fire({
						icon: "error",
						title: "Gagal menambahkan data",
						showConfirmButton: false,
						timer: 2000,
						background: "#fefefe",
					}),
				1000
			);
		},
		onCompleted: () => {
			setTimeout(
				() =>
					Swal.fire({
						icon: "success",
						title: "Data buku berhasil ditambahkan",
						showConfirmButton: false,
						timer: 1500,
						background: "#fefefe",
					}),
				1000
			);
		},
	});

	const tambahKategori = (newKategori) => {
		addKategori({
			variables: {
				...newKategori,
			},
		});
	};

    
	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};
    
    const handleImage = (e) => {
    const imageUpload = e.target.files[0];
    if (!imageUpload) return;

        setData({ ...data, gambar_buku: imageUpload });
      };

      const handleSubmit = (e) => {
		e.preventDefault();

		if (data.nama_kategori !== "") {
			const newData = {
				nama_kategori: data.nama_kategori,
			};

			tambahKategori(newData);
			handleModalCreateTrigger();

			setData(kategoriData);
		} else {
			alert("Terdapat data yang kosong");
		}
	};

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center py-20 sm:h-full sm:items-center sm:p-0 md:h-screen">
					<div className="relative w-full max-w-xs">
						<form onSubmit={handleSubmit} className="rounded-lg bg-white shadow">
							<div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
								<h3 className="p-1.5 text-xl font-semibold text-gray-900 dark:text-white">Tambah Buku</h3>
								<button
									type="button"
									className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
									data-modal-toggle="editUserModal"
									onClick={handleModalCreateTrigger}>
									<XMarkIcon className="h-5 w-5" />
								</button>
							</div>
							<div className="space-y-6 p-6">
								<div>
									<label htmlFor="nama_kategori" className="mb-2 block text-sm font-medium text-gray-900">
										<span className="block after:ml-1 after:text-red-500 after:content-['*']">Nama Kategori</span>
									</label>
									<input
										type="text"
										name="nama_kategori"
										id="nama_kategori"
										className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										placeholder="Masukkan nama kategori"
										required
										value={data.nama_kategori}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 rounded-b border-t border-gray-200 p-6">
								{loading ? (  <button
									type="submit"
									className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
									<PulseLoader size={7} color={"#ffffff"} />
								</button>
                                ) : (
                                <button
									type="submit"
                                    // disabled={isUploading}
									className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
									Simpan
								</button>
                                )}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalCreateKategori;
