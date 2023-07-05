import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { getMetadata, updateMetadata, getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { storage } from "../../configs/firebase";
import Cookies from "js-cookie";
import { Button } from "flowbite-react";
import ModalPinjamBuku from "./ModalPinjamBuku";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ModalInfoBuku from "../Admin/ModalInfoBuku";

const BukuListItemUser = ({ data }) => {
  const { id, no, nama_buku, gambar_buku, stok } = data;
  const baseUpdate = {
    nama_buku: nama_buku,
    gambar_buku: gambar_buku,
    stok: stok,
  };


  const [modalPinjamTrigger, setModalPinjamTrigger] = useState(false);
  const [modalInfoTrigger, setModalInfoTrigger] = useState(false);
  const [update, setUpdate] = useState(baseUpdate);

const handleModalPinjamTrigger = () => {
  setModalPinjamTrigger(!modalPinjamTrigger);
};
const handleModalInfoTrigger = () => {
  setModalInfoTrigger(!modalInfoTrigger);
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
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {stok}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
        <button type="button" className="font-medium text-blue-600 hover:underline" onClick={handleModalInfoTrigger}>
        <InformationCircleIcon className="h-6 w-6 text-blue-600 transition duration-75 hover:text-blue-700" />
        </button>
        </th>
        <td className="py-4 px-6">
        <div className="flex items-center space-x-4 text-sm">
            <div onClick={handleModalPinjamTrigger}><Button>Pinjam</Button></div>
          </div>
          {modalInfoTrigger && (
            <ModalInfoBuku
              handleModalInfoTrigger={handleModalInfoTrigger}
              update={update}
            />
          )}
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
