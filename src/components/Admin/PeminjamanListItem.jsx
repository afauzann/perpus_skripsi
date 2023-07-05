import React, { useState, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import Swal from "sweetalert2";
import { EditStokBuku, SubscriptionBuku } from "../../graphql/typeDefs/buku.graphql";
import moment from "moment";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ModalEditPeminjaman from "./ModalEditPeminjaman";
import { DeletePeminjaman, DeletedPeminjaman, EditStatusPinjam } from "../../graphql/typeDefs/pinjam.graphlql";
import ModalDelete from "./ModalDelete";

const PeminjamanListItem = ({ data }) => {
  const { id, no, nama_user, status, tanggal_peminjaman, tanggal_pengembalian, peminjaman_buku } = data;
  const { nama_buku, gambar_buku, jumlah_pinjam, stok } = peminjaman_buku;
  const baseUpdate = {
    status: status
  };

  const [modalEditTrigger, setModalEditTrigger] = useState(false);
  const [modalDeleteTrigger, setModalDeleteTrigger] = useState(false);
  const [editStokBuku] = useMutation(EditStokBuku);
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

  const [deletePeminjaman] = useMutation(DeletePeminjaman, {
    onCompleted: () => {
      setTimeout(
        () =>
          Swal.fire({
            icon: "success",
            title: "Data Peminjaman berhasil dihapus",
            showConfirmButton: false,
            timer: 1500,
            background: "#fefefe",
          }),
        1000
      );
    },
  });

  const peminjamanUpdate = (editPeminjaman) => {
    updatePeminjaman({
      variables: editPeminjaman,
    });
  };

  
  const updateStokBuku = (stokBaru) => {
    editStokBuku({ variables: { id: id, stok: stokBaru } }); 
  }
  
  const handleDelete = async (idx) => {
    const stokBaru = stok + jumlah_pinjam; // Menambahkan jumlah_pinjam ke stok

    await deletePeminjaman({
      variables: { id: idx },
    });

    await updateStokBuku(stokBaru); // Memanggil fungsi untuk update stok buku

    handleModalDeleteTrigger();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const peminjamanUpdated = { id, ...update };
    peminjamanUpdate(peminjamanUpdated);
    handleModalEditTrigger();
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
          <button type="button" className="font-medium text-blue-600 hover:underline" onClick={handleModalDeleteTrigger}>
            <TrashIcon className="h-6 w-6 text-red-400 transition duration-75 hover:text-red-500" />
          </button>
          {modalEditTrigger && (
            <ModalEditPeminjaman
              handleModalEditTrigger={handleModalEditTrigger}
              update={update}
              handleUpdate={handleUpdate}
              handleChange={handleChange}
            />
          )}
          {modalDeleteTrigger && (
            <ModalDelete
              handleModalDeleteTrigger={handleModalDeleteTrigger}
              handleDeletePeminjaman={() => {
                handleDelete(id);
              }}
              peminjaman
            />
          )}
        </th>
      </tr>
    </tbody>
  );
};

export default PeminjamanListItem;
