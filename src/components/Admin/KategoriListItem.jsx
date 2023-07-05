import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { getMetadata, updateMetadata, getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { InformationCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DeleteBuku, EditBuku } from "../../graphql/typeDefs/buku.graphql";
import ModalDelete from "./ModalDelete";
import Swal from "sweetalert2";
import ModalEditBuku from "./ModalEditBuku";
import { storage } from "../../configs/firebase";
import ModalInfoBuku from "./ModalInfoBuku";
import { DeleteKategori, EditKategori } from "../../graphql/typeDefs/kategori.graphql";
import ModalEditKategori from "./ModalEditKategori";

const KategoriListItem = ({ data }) => {
  const { id, no, nama_buku,nama_kategori, gambar_buku, stok } = data;

  const baseUpdate = {
    nama_kategori: nama_kategori,
  };

  const [modalEditTrigger, setModalEditTrigger] = useState(false);
  const [modalDeleteTrigger, setModalDeleteTrigger] = useState(false);
  const [modalInfoTrigger, setModalInfoTrigger] = useState(false);
  const [update, setUpdate] = useState(baseUpdate);
  const [updateKategori] = useMutation(EditKategori, {
    onError: () => {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Gagal mengedit data",
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
          title: "Data buku berhasil diubah",
          showConfirmButton: false,
          timer: 1500,
          background: "#fefefe",
        });
      }, 1000);
    },
  });
  const [deleteKategori] = useMutation(DeleteKategori, {
    onCompleted: () => {
        setTimeout(
            () =>
                Swal.fire({
                    icon: "success",
                    title: "Data kategori berhasil dihapus",
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#fefefe",
                }),
            1000
        );
    },
});

  const kategoriUpdate = (editKategori) => {
    updateKategori({
      variables: editKategori,
    });
  };

  const handleDelete = (idx) => {
    deleteKategori({
      variables: { id: idx },
    });

    handleModalDeleteTrigger();
  };
  
  const handleUpdate = () => {
    const kategoriUpdated = { id, ...update };
    kategoriUpdate(kategoriUpdated);
    handleModalEditTrigger();
};

  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const handleModalEditTrigger = () => {
    setModalEditTrigger(!modalEditTrigger);
  };

  const handleModalDeleteTrigger = () => {
    setModalDeleteTrigger(!modalDeleteTrigger);
  };

  const handleModalInfoTrigger = () => {
    setModalInfoTrigger(!modalInfoTrigger);
  };
  const handleImage = (e) => {
    const imageUpload = e.target.files[0];
    setUpdate({ ...update, gambar_buku: imageUpload });
  };

  useEffect(() => {
    // Membersihkan file gambar_buku saat komponen BukuListItem tidak lagi dirender
    return () => {
      if (update.gambar_buku && update.gambar_buku.name && update.gambar_buku !== gambar_buku) {
        URL.revokeObjectURL(update.gambar_buku);
      }
    };
  }, [update, gambar_buku]);

  return (
    <tbody>
      <tr className="border-b bg-white hover:bg-gray-50">
      <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900" style={{textAlign: "center"}}>
          {no}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {nama_kategori}
        </th>
        <td className="py-4 px-6">
          <div className="flex items-center space-x-4 text-sm">
            <button type="button" className="font-medium text-blue-600 hover:underline" onClick={handleModalEditTrigger}>
              <PencilIcon className="h-6 w-6 text-blue-600 transition duration-75 hover:text-blue-700" />
            </button>
            <button type="button" className="font-medium text-blue-600 hover:underline" onClick={handleModalDeleteTrigger}>
              <TrashIcon className="h-6 w-6 text-red-400 transition duration-75 hover:text-red-500" />
            </button>
          </div>
          {modalEditTrigger && (
            <ModalEditKategori
              handleModalEditTrigger={handleModalEditTrigger}
              update={update}
              handleUpdate={handleUpdate}
              handleChange={handleChange}
              handleImage={handleImage}
            />
          )}

          {modalDeleteTrigger && (
            <ModalDelete
              handleModalDeleteTrigger={handleModalDeleteTrigger}
              handleDeleteKategori={() => {
                handleDelete(id);
              }}
              kategori
            />
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default KategoriListItem;
