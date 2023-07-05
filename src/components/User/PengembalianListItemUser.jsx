import React, { useState, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { Button } from "flowbite-react";

import moment from "moment";
import { FormatRupiah } from "@arismun/format-rupiah";


const PengembalianListItemUser = ({ data }) => {
  const { id, no, status, jumlah_pinjam, tanggal_pengembalian, denda, pengembalian_buku } = data;
  const { nama_buku, gambar_buku } = pengembalian_buku;
  
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
      </tr>
    </tbody>
  );
};

export default PengembalianListItemUser;
