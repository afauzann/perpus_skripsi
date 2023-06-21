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
import ModalPengembalianBuku from "./ModalPengembalianBuku";

const PeminjamanListItemUser = ({ data }) => {
  const { id, no, status, tanggal_peminjaman, tanggal_pengembalian } = data;

  const [modalKembaliTrigger, setModalKembaliTrigger] = useState(false);

  // Menggunakan useSubscription untuk mendapatkan data buku
  const { data: bukuData, loading: bukuLoading } = useSubscription(SubscriptionBuku, {
    variables: {
      searchTerm: `%${data.nama_buku}%`,
      limit: 1,
      offset: 0,
    },
  });

  // Mendapatkan URL gambar buku
  const gambar_buku = bukuData?.buku_aggregate?.nodes[0]?.gambar_buku;
  const stok = bukuData?.buku_aggregate?.nodes[0]?.stok;
  const nama_buku = bukuData?.buku_aggregate.nodes[0]?.nama_buku;

  const handleModalKembaliTrigger = () => {
    setModalKembaliTrigger(!modalKembaliTrigger);
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
          {tanggal_peminjaman}
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
        <td className="py-4 px-6">
        <div className="flex items-center space-x-4 text-sm">
            <div onClick={handleModalKembaliTrigger}><Button>Kembalikan</Button></div>
          </div>
          {modalKembaliTrigger && (
            <ModalPengembalianBuku
            handleModalKembaliTrigger={handleModalKembaliTrigger}
            namaBuku={nama_buku}
            stok={stok}
            tanggal_peminjaman={tanggal_peminjaman}
            tanggal_pengembalian={tanggal_pengembalian}
            denda={denda}
            id={id}
            />
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default PeminjamanListItemUser;
