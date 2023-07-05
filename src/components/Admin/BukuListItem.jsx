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

const BukuListItem = ({ data }) => {
  const { id, no, nama_buku, gambar_buku, stok } = data;

  const baseUpdate = {
    nama_buku: nama_buku,
    gambar_buku: gambar_buku,
    stok: stok,
  };

  const [modalEditTrigger, setModalEditTrigger] = useState(false);
  const [modalDeleteTrigger, setModalDeleteTrigger] = useState(false);
  const [modalInfoTrigger, setModalInfoTrigger] = useState(false);
  const [update, setUpdate] = useState(baseUpdate);
  const [updateBuku] = useMutation(EditBuku, {
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
          title: "Data buku berhasil diubah",
          showConfirmButton: false,
          timer: 1500,
          background: "#fefefe",
        });
      }, 1000);
    },
  });
  const [deleteBuku] = useMutation(DeleteBuku, {
    onCompleted: async () => {
      // Mengambil nama file dari URL atau path lengkap
    const encodedFileName = gambar_buku.substring(gambar_buku.lastIndexOf('/') + 1).split('?')[0];
	  const fileName = decodeURIComponent(encodedFileName);

      try {
        // Hapus file foto dari Firebase Storage
        const storageRef = ref(storage, `${fileName}`);
        await deleteObject(storageRef);
        
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Data buku berhasil dihapus",
            showConfirmButton: false,
            timer: 1500,
            background: "#fefefe",
          });
        }, 1000);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Gagal menghapus data buku",
          showConfirmButton: false,
          timer: 1500,
          background: "#fefefe",
        });
      }
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus data buku",
        showConfirmButton: false,
        timer: 1500,
        background: "#fefefe",
      });
    },
  });

  const bukuUpdate = (editBuku) => {
    updateBuku({
      variables: editBuku,
    });
  };

  const handleDelete = (idx) => {
    deleteBuku({
      variables: { id: idx },
    });

    handleModalDeleteTrigger();
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const bukuUpdated = { id, ...update };

    try {
      if (update.gambar_buku && update.gambar_buku.name) {
        const fileExtension = update.gambar_buku.name.split(".").pop();
        const fileName = `buku/${uuidv4()}.${fileExtension}`;
        const storageRef = ref(storage, fileName);

        // Menghapus gambar buku saat ini dari Firebase Storage jika ada perubahan gambar
        if (update.gambar_buku !== gambar_buku) {
          const currentImageRef = ref(storage, gambar_buku);
          await deleteObject(currentImageRef);
        }

        // Melakukan upload gambar buku yang baru
        await uploadBytes(storageRef, update.gambar_buku);
        const url = await getDownloadURL(storageRef);
        bukuUpdated.gambar_buku = url; // Menggunakan URL gambar yang sudah diunggah

        bukuUpdate(bukuUpdated);
        handleModalEditTrigger();
      } else {
        bukuUpdate(bukuUpdated);
        handleModalEditTrigger();
      }
    } catch (error) {
      console.log(error);
    }
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
          <img src={gambar_buku} alt="Gambar Buku" />
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
          {nama_buku}
        </th>
        <th scope="row" className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900">
        <button type="button" className="font-medium text-blue-600 hover:underline" onClick={handleModalInfoTrigger}>
        <InformationCircleIcon className="h-6 w-6 text-blue-600 transition duration-75 hover:text-blue-700" />
        </button>
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
          {modalInfoTrigger && (
            <ModalInfoBuku
              handleModalInfoTrigger={handleModalInfoTrigger}
              update={update}
              handleUpdate={handleUpdate}
              handleChange={handleChange}
            />
          )}
          {modalEditTrigger && (
            <ModalEditBuku
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
              handleDeleteBuku={() => {
                handleDelete(id);
              }}
              buku
            />
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default BukuListItem;
