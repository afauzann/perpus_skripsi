import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { getMetadata, updateMetadata, getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { storage } from "../../configs/firebase";
import Cookies from "js-cookie";
import { Button } from "flowbite-react";
import ModalPinjamBuku from "./ModalPinjamBuku";

const BukuListItemUser = ({ data }) => {
  const { id, no, nama_buku, gambar_buku, stok } = data;

  const [modalPinjamTrigger, setModalPinjamTrigger] = useState(false);


const handleModalPinjamTrigger = () => {
  setModalPinjamTrigger(!modalPinjamTrigger);
};


  return (
    <tbody>
      <tr className="border-b bg-white hover:bg-gray-50">
      <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900" style={{textAlign: "center"}}>
          {no}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          <img src={gambar_buku} alt="Gambar Buku" />
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {nama_buku}
        </th>
        <td className="py-4 px-6">
        <div className="flex items-center space-x-4 text-sm">
            <div onClick={handleModalPinjamTrigger}><Button>Pinjam</Button></div>
          </div>
          {modalPinjamTrigger && (
            <ModalPinjamBuku
            handleModalPinjamTrigger={handleModalPinjamTrigger}
            namaBuku={nama_buku}
            stok={stok}
            id={id}
            />
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default BukuListItemUser;
