import React, { useState, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { getMetadata, updateMetadata, getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { storage } from "../../configs/firebase";
import Cookies from "js-cookie";
import { Button } from "flowbite-react";
import { SubscriptionBuku } from "../../graphql/typeDefs/buku.graphql";
import moment from "moment";
import { FormatRupiah } from "@arismun/format-rupiah";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DeletePengembalian, EditStatusPengembalian } from "../../graphql/typeDefs/pengembalian.graphql";
import ModalEditPengembalian from "./ModalEditPengembalian";
import ModalDelete from "./ModalDelete";

const PengembalianListItem = ({ data }) => {
  const { id, no, stok, status, denda, tanggal_pengembalian, pengembalian_buku, pengembalian_user } = data;
  const {nama_buku, gambar_buku} = pengembalian_buku
  const {nama} = pengembalian_user
  const baseUpdate = {
   status: status
  };

  const [modalEditTrigger, setModalEditTrigger] = useState(false);
  const [modalDeleteTrigger, setModalDeleteTrigger] = useState(false);
  const [update, setUpdate] = useState(baseUpdate);

  const [updatePengembalian] = useMutation(EditStatusPengembalian, {
    onError: () => {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Gagal mengedit data",
          text: "Nama buku tidak boleh sama",
          showConfirmButton: false,
          timer: 2000,
          background: "#fefefe",
        });
      }, 1500);
    },
    onCompleted: () => {
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Data pengembalian berhasil diubah",
          showConfirmButton: false,
          timer: 1500,
          background: "#fefefe",
        });
      }, 1000);
    },
  });
  const [deltePengembalian] = useMutation(DeletePengembalian, {
		onCompleted: () => {
			setTimeout(
				() =>
					Swal.fire({
						icon: "success",
						title: "Data guru berhasil dihapus",
						showConfirmButton: false,
						timer: 1500,
						background: "#fefefe",
					}),
				1000
			);
		},
	});
  // Menggunakan useSubscription untuk mendapatkan data buku

  const pengembalianUpdate = (editPengembalian) => {
    updatePengembalian({
      variables: editPengembalian,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault()
    const pengembalianUpdated = { id, ...update };
    pengembalianUpdate(pengembalianUpdated);
    handleModalEditTrigger();
};

const handleDelete = (idx) => {
  deltePengembalian({
    variables: { id: idx },
  });
  handleModalDeleteTrigger();
};

const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };


  const handleModalDeleteTrigger = () => {
    setModalDeleteTrigger(!modalDeleteTrigger);
  };

  const handleModalEditTrigger = () => {
    setModalEditTrigger(!modalEditTrigger);
  };

  // Menghitung denda jika pengembalian terlambat
  

  return (
      <tbody>
      <tr className="border-b bg-white hover:bg-gray-50">
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900" style={{ textAlign: "center" }}>
          {no}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          <img src={gambar_buku} alt="Gambar Buku" />
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {nama_buku}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {nama}
        </th>
        {/* <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {tanggal_peminjaman}
        </th> */}
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {tanggal_pengembalian}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {status}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          <FormatRupiah value={denda} />
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
        <button type="button" className="font-medium text-blue-600 hover:underline" onClick={handleModalEditTrigger}>
              <PencilIcon className="h-6 w-6 text-blue-600 transition duration-75 hover:text-blue-700" />
            </button>
            <button type="button" className="font-medium text-blue-600 hover:underline" onClick={handleModalDeleteTrigger}>
            <TrashIcon className="h-6 w-6 text-red-400 transition duration-75 hover:text-red-500" />
          </button>
            {modalEditTrigger && (
            <ModalEditPengembalian
              handleModalEditTrigger={handleModalEditTrigger}
              update={update}
              handleUpdate={handleUpdate}
              handleChange={handleChange}
            />
          )}
           {modalDeleteTrigger && (
            <ModalDelete
              handleModalDeleteTrigger={handleModalDeleteTrigger}
              handleDeletePengembalian={() => {
                handleDelete(id);
              }}
              pengembalian
            />
          )}
         </th>
      </tr>
    </tbody>
  );
};

export default PengembalianListItem;
