import { useSubscription, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { EditUser, UserId } from "../../graphql/typeDefs/users.graphql";
import { auth } from "../../configs/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { TextInput } from "flowbite-react";

function ProfileList({ uid }) {
  const { data, loading } = useSubscription(UserId, {
    variables: {
      id: uid,
    },
  });

  const [updateUser] = useMutation(EditUser); // Define the mutation function

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      // Menampilkan SweetAlert2 untuk konfirmasi reset password
      const result = await Swal.fire({
        icon: "question",
        title: "Konfirmasi",
        text: "Apakah Anda yakin ingin mereset password?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        // Panggil fungsi reset password dari Firebase Auth
        await sendPasswordResetEmail(auth, data.users_by_pk.email);

        // Menampilkan SweetAlert2 untuk berhasil mereset password
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Silahkan Cek Email Anda Untuk Reset Password",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { nama, nis } = e.target.elements;

      // Tampilkan konfirmasi SweetAlert2 sebelum melakukan update
      const confirmResult = await Swal.fire({
        title: "Konfirmasi",
        text: "Apakah Anda yakin ingin memperbarui data?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      });

      if (confirmResult.isConfirmed) {
        // Panggil mutation untuk mengupdate data pengguna
        const { data: updateData } = await updateUser({
          variables: {
            id: uid,
            email: data.users_by_pk.email,
            nama: nama.value,
            password: data.users_by_pk.password,
            nis: nis.value,
          },
        });

        if (updateData && updateData.update_users_by_pk) {
          // Menampilkan SweetAlert2 untuk berhasil mengupdate data
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data berhasil diperbarui.",
          });
        } else {
          throw new Error("Failed to update data.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-6 px-6">
      {loading ? (
        <div className="my-0 mx-auto flex items-center justify-center pt-5">
          <PulseLoader size={10} color="#2563eb" />
        </div>
      ) : (
        <div className="w-full overflow-x-auto bg-white shadow rounded-lg p-4 md:p-8">
          {data && data.users_by_pk && (
            <form className="space-y-4" onSubmit={handleUpdate}>
              <div className="flex flex-col md:flex-row">
                <label className="w-full md:w-1/4">Email:</label>
                <TextInput className="w-full md:w-3/4" type="text" value={data.users_by_pk.email} readOnly disabled />
              </div>
              <div className="flex flex-col md:flex-row">
                <label className="w-full md:w-1/4">Nama:</label>
                <TextInput className="w-full md:w-3/4" type="text" name="nama" defaultValue={data.users_by_pk.nama} />
              </div>
              {data.users_by_pk.role === "siswa" && (
                <div className="flex flex-col md:flex-row">
                  <label className="w-full md:w-1/4">NIS:</label>
                  <TextInput className="w-full md:w-3/4" type="text" name="nis" defaultValue={data.users_by_pk.nis} />
                </div>
              )}
              <div className="flex flex-col md:flex-row">
                <label className="w-full md:w-1/4">Password:</label>
                <TextInput className="w-full md:w-3/4" type="password" value={data.users_by_pk.password} readOnly disabled />
              </div>
              <div className="flex flex-col md:flex-row">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleResetPassword}>
                  Reset Password
                </button>
              </div>
              <div className="flex flex-col md:flex-row">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
                  Update Data
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileList;
