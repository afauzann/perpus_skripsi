import React, { useEffect, useState } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../configs/firebase";
import { v4 as uuidv4 } from "uuid";


const ModalEditBuku = ({ handleModalEditTrigger, update, handleChange, handleUpdate, handleImage }) => {
    // const fileName = update.gambar_buku && update.gambar_buku.name ? update.gambar_buku.name.substring(update.gambar_buku.name.lastIndexOf('/') + 1).split('?')[0] : '';
    console.log(update.gambar_buku);

    const [imageUrl, setImageUrl] = useState(update.gambar_buku || "");
    
//     useEffect(() => {
//     if (update.gambar_buku) {
//       const storageRef = ref(
//         storage,
//         `buku/${update.gambar_buku.name}_${uuidv4()}`
//       );
//       uploadBytes(storageRef, update.gambar_buku).then(() => {
//         getDownloadURL(storageRef)
//           .then((url) => {
//             setImageUrl(url);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       });
//     }
//   }, [update.gambar_buku]);   
      
	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 py-20 sm:h-full sm:items-center sm:p-0 md:h-screen">
					<div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleUpdate} className="rounded-lg bg-white shadow">
							<div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
								<h3 className="p-1.5 text-base font-semibold text-gray-900 dark:text-white lg:text-lg xl:text-xl">Edit Buku</h3>
								<button
									type="button"
									className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
									onClick={handleModalEditTrigger}>
									<XMarkIcon className="h-5 w-5" />
								</button>
							</div>
							<div className="space-y-6 p-6">
								<div>
									<label htmlFor="nama_buku" className="mb-2 block text-sm font-medium text-gray-900">
										<span className="block after:ml-1 after:text-red-500 after:content-['*']">Nama Buku</span>
									</label>
									<input
										type="text"
										name="nama_buku"
										id="nama_buku"
										className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										placeholder="Masukkan nama pelajaran"
										required
										value={update.nama_buku}
										onChange={handleChange}
									/>
								</div>
                                <div>
                                    <label htmlFor="gambar_buku" className="mb-2 block text-sm font-medium text-gray-900">
                                        <span className="block after:ml-1 after:text-red-500 after:content-['*']">Gambar Buku</span>
                                        </label>
                                        {imageUrl && <img src={imageUrl} alt="Gambar Buku" className="mb-2 w-full max-h-40 object-contain" />}
                                        <input
                                            type="file"
                                            name="gambar_buku"
                                            id="gambar_buku"
                                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            placeholder="Masukkan nama pelajaran"
                                            onChange={handleImage}
                                        />
                                        {update.gambar_buku && (
                                            <p className="mt-2 text-sm text-gray-500">{update.gambar_buku.name}</p>
                                        )}
                                    </div>
							</div>
							<div className="flex items-center justify-center space-x-2 rounded-b border-t border-gray-200 p-6">
								<button
									type="submit"
									className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
									Simpan
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalEditBuku;
