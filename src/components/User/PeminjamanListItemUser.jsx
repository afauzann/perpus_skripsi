import React, { useState, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { Button } from "flowbite-react";
import { SubscriptionBuku } from "../../graphql/typeDefs/buku.graphql";
import moment from "moment";
import { FormatRupiah } from "@arismun/format-rupiah";
import ModalPengembalianBuku from "./ModalPengembalianBuku";
import { useDispatch, useSelector } from "react-redux";
import { setIsKembali } from "../../stores/features/peminjamanSlice";
import { Link } from "react-router-dom";

const PeminjamanListItemUser = ({ data }) => {
  const { id, no, status, jumlah_pinjam, tanggal_peminjaman, tanggal_pengembalian, peminjaman_buku } = data;
  const { nama_buku, gambar_buku } = peminjaman_buku

  const dispatch = useDispatch();
  // const isKembali = useSelector((state) => state.peminjamanList.isKembali);
  const isKembali = useSelector((state) => state.peminjamanList.isKembali[id] || false);
  const [modalKembaliTrigger, setModalKembaliTrigger] = useState(false);
  // const [isKembali, setIsKembali] = useState(false);


  // Menggunakan useSubscription untuk mendapatkan data buku
  const { data: bukuData, loading: bukuLoading } = useSubscription(SubscriptionBuku, {
    variables: {
      searchTerm: `%${data.nama_buku}%`,
      limit: 1,
      offset: 0,
    },
  });

  // Mendapatkan URL gambar buku
  const id_buku = bukuData?.buku_aggregate?.nodes[0]?.id
  const stok = bukuData?.buku_aggregate?.nodes[0]?.stok;

  const handleModalKembaliTrigger = () => {
    setModalKembaliTrigger(!modalKembaliTrigger);
    // dispatch(setIsKembali(true));
    dispatch(setIsKembali({ id, value: true }));
    // setIsKembali(true);
  };

  // Menghitung denda jika pengembalian terlambat
  const hitungDenda = () => {
    const tanggalPengembalian = moment(tanggal_pengembalian);
    const sekarang = moment();
    const selisihHari = sekarang.diff(tanggalPengembalian, "days");

    if (selisihHari > 0) {
      const denda = selisihHari * 1000;
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
        {status === "dipinjam" && "diproses" ? (
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          <FormatRupiah value={denda} />
        </th> ) : (
           <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
            -
         </th>
        )}
        <td className="py-4 px-6">
          {status === "dipinjam" ? (
            <div className="flex items-center space-x-4 text-sm">
              <Button onClick={handleModalKembaliTrigger} >
                Kembalikan
              </Button>
            </div>
          ) : ( <div className="flex items-center space-x-4 text-sm">
          <Button onClick={handleModalKembaliTrigger} disabled>
            Kembalikan
          </Button>
        </div>)}
          {modalKembaliTrigger && (
            <ModalPengembalianBuku
            handleModalKembaliTrigger={handleModalKembaliTrigger}
            // setIsKembali={setIsKembali}
            setIsKembali={() => dispatch(setIsKembali({ id: false }))}
            // setIsKembali={dispatch(setIsKembali)}
            namaBuku={nama_buku}
            stok={stok}
            tanggal_peminjaman={tanggal_peminjaman}
            tanggal_pengembalian={tanggal_pengembalian}
            denda={denda}
            jumlah_pinjam={jumlah_pinjam}
            id={id}
            id_buku={id_buku}
            />
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default PeminjamanListItemUser;
