import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ModalDelete from "./ModalDelete";
import Swal from "sweetalert2";
import { DeleteUser, EditUser } from "../../graphql/typeDefs/users.graphql";
import ModalEditUser from "./ModalEditUser";
import {
  doc,
  getFirestore,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, deleteUser as deleteAuthUser, fetchSignInMethodsForEmail } from "firebase/auth";
import { deleteObject, ref } from "firebase/storage";

const PustakawanListItem = ({ data }) => {
  const { id, no, nama, email, password, role, nis } = data;

  const baseUpdate = {
    nama: nama,
    email: email,
    password: password,
    nis: nis,
  };

  const firestore = getFirestore();

  const [modalEditTrigger, setModalEditTrigger] = useState(false);
  const [modalDeleteTrigger, setModalDeleteTrigger] = useState(false);
  const [update, setUpdate] = useState(baseUpdate);

  const [updateUser] = useMutation(EditUser, {
    onError: () => {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Gagal mengedit data User",
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
          title: "Data user berhasil diubah",
          showConfirmButton: false,
          timer: 1500,
          background: "#fefefe",
        });
      }, 1000);
    },
  });

  const [deleteUser] = useMutation(DeleteUser, {
    onCompleted: async () => {
      setTimeout(
        () =>
          Swal.fire({
            icon: "success",
            title: "Data user berhasil dihapus",
            showConfirmButton: false,
            timer: 1500,
            background: "#fefefe",
          }),
        1000
      );
    },
  });

  const userUpdate = (editUser) => {
    updateUser({
      variables: editUser,
    });
  };

  const handleDelete = async (idx) => {
    // try {
      // Hapus data dari Hasura
      await deleteUser({
        variables: { id: idx },
      });
  
      // Hapus data dari Firebase Authentication
      const authInstance = getAuth();
      await deleteAuthUser(authInstance, idx);
  
    //   Swal.fire({
    //     icon: "success",
    //     title: "Data staff berhasil dihapus",
    //     showConfirmButton: false,
    //     timer: 1500,
    //     background: "#fefefe",
    //   });
    // } catch (error) {
    //   console.log(error);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Gagal menghapus data user",
    //     showConfirmButton: false,
    //     timer: 1500,
    //     background: "#fefefe",
    //   });
    // }
  
    handleModalDeleteTrigger();
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const userUpdated = { id, ...update };
    userUpdate(userUpdated);
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

  const handleImage = (e) => {
    const imageUpload = e.target.files[0];
    setUpdate({ ...update, gambar_buku: imageUpload });
  };

  return (
    <tbody>
      <tr className="border-b bg-white hover:bg-gray-50">
        <th
          scope="row"
          className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900"
          style={{ textAlign: "center" }}
        >
          {no}
        </th>
        <th
          scope="row"
          className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900"
        >
          {nama}
        </th>
        <th
          scope="row"
          className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900"
        >
          {email}
        </th>
        <th
          scope="row"
          className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900"
        >
          {"*".repeat(password.slice(0, 8).length)}
        </th>
        <th
          scope="row"
          className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900"
        >
          {nis !== 0 ? nis : "-"}
        </th>
        <th
          scope="row"
          className="whitespace-nowrap py-4 px-6 font-semibold text-gray-900"
        >
          {role}
        </th>
        <td className="py-4 px-6">
          <div className="flex items-center space-x-4 text-sm">
            <button
              type="button"
              className="font-medium text-blue-600 hover:underline"
              onClick={handleModalEditTrigger}
            >
              <PencilIcon className="h-6 w-6 text-blue-600 transition duration-75 hover:text-blue-700" />
            </button>
            <button
              type="button"
              className="font-medium text-blue-600 hover:underline"
              onClick={() => handleDelete(id)}
            >
              <TrashIcon className="h-6 w-6 text-red-400 transition duration-75 hover:text-red-500" />
            </button>
          </div>
          {modalEditTrigger && (
            <ModalEditUser
              handleModalEditTrigger={handleModalEditTrigger}
              update={update}
              handleUpdate={handleUpdate}
              handleChange={handleChange}
            />
          )}

          {modalDeleteTrigger && (
            <ModalDelete
              handleModalDeleteTrigger={handleModalDeleteTrigger}
              handleDeleteSiswa={() => {
                handleDelete(id);
              }}
              siswa
            />
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default PustakawanListItem;
