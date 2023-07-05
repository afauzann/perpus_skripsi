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
import { PencilIcon } from "@heroicons/react/24/outline";
import ModalEditPeminjaman from "../Admin/ModalEditPeminjaman";
import { EditStatusPinjam } from "../../graphql/typeDefs/pinjam.graphlql";

const PeminjamanListItem = ({ data }) => {
  const { id, no, nama_user, stok, status, tanggal_peminjaman, tanggal_pengembalian, peminjaman_buku } = data;
  const {nama_buku, gambar_buku} = peminjaman_buku
  const baseUpdate = {
   status: status
  };

  const [modalEditTrigger, setModalEditTrigger] = useState(false);
  const [update, setUpdate] = useState(baseUpdate);

  const [updatePeminjaman] = useMutation(EditStatusPinjam, {
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
          title: "Data peminjaman berhasil diubah",
          showConfirmButton: false,
          timer: 1500,
          background: "#fefefe",
        });
      }, 1000);
    },
  });

  // Menggunakan useSubscription untuk mendapatkan data buku


  const peminjamanUpdate = (editPeminjaman) => {
    updatePeminjaman({
      variables: editPeminjaman,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault()
    const peminjamanUpdated = { id, ...update };
    peminjamanUpdate(peminjamanUpdated);
    handleModalEditTrigger();
};

const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };


  const handleModalEditTrigger = () => {
    setModalEditTrigger(!modalEditTrigger);
  };

  // Menghitung denda jika pengembalian terlambat
  const hitungDenda = () => {
    const tanggalPengembalian = moment(tanggal_pengembalian);
    const sekarang = moment();
    const selisihHari = sekarang.diff(tanggalPengembalian, "days");

    if (selisihHari > 0) {
      const denda = selisihHari * 5000;
      return denda;
    }

    return 0;
  };

  const denda = hitungDenda();

  // Menentukan apakah tanggal pengembalian melewati hari ini atau belum
  const isLewatBatas = moment().isAfter(moment(tanggal_pengembalian), "day");
  const lewat_batas = isLewatBatas ? "ya" : "tidak";

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
          {nama_user}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {tanggal_peminjaman}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {tanggal_pengembalian}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {status}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
         {lewat_batas}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
        <button type="button" className="font-medium text-blue-600 hover:underline" onClick={handleModalEditTrigger}>
              <PencilIcon className="h-6 w-6 text-blue-600 transition duration-75 hover:text-blue-700" />
            </button>
            {modalEditTrigger && (
            <ModalEditPeminjaman
              handleModalEditTrigger={handleModalEditTrigger}
              update={update}
              handleUpdate={handleUpdate}
              handleChange={handleChange}
            />
          )}
         </th>
      </tr>
    </tbody>
  );
};

export default PeminjamanListItem;
