import React, { useState, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import Swal from "sweetalert2";
import { EditStatusPinjam } from "../../graphql/typeDefs/pinjam.graphlql";
import { FormatRupiah } from "@arismun/format-rupiah";

const LaporanPengembalianListItem = ({ data }) => {
  const { id, no, stok, status, denda, tanggal_pengembalian, pengembalian_buku, pengembalian_user } = data;
  const {nama_buku, gambar_buku} = pengembalian_buku
  const {nama} = pengembalian_user
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
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {tanggal_pengembalian}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {status}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          <FormatRupiah value={denda} />
        </th>
      </tr>
    </tbody>
  );
};

export default LaporanPengembalianListItem;
