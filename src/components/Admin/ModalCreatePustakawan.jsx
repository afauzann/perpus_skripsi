import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { XMarkIcon } from "@heroicons/react/24/outline";

import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { AddUserAdmin } from "../../graphql/typeDefs/users.graphql";
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../configs/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { bcrypt } from '../../utils/bcrypt';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const MySwal = withReactContent(Swal);

const Alert = MySwal.mixin({
  toast: false,
  showConfirmButton: true,
  customClass: {
    container: "custom-toast",
  },
});
const ModalCreatePustakawan = ({ handleModalCreateTrigger }) => {
  const baseValue = {
    name: "",
    email: "",
    password: "",
    role: "",
    nis: "",
  };

  const baseErrors = {
    name: "",
    email: "",
    password: "",
  };

  const [values, setValues] = useState(baseValue);
  const [errors, setErrors] = useState(baseErrors);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const [addUserAdmin] = useMutation(AddUserAdmin);

  const create = async (name, email, password, role, nis) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addUserAdmin({
      variables: {
        id: user.uid,
        nama: name,
        email: email,
        password: bcrypt(password),
        role: role,
        nis: nis
      },
    });

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      role,
      email,
    });
    setTimeout(
      () =>
        Alert.fire({
          icon: "success",
          title: <strong>Sukses</strong>,
          text: "Tambah User berhasil",
          background: "#fefefe",
          confirmButtonColor: "#0000ff",
        }),
      2000
    );
  }


  const regexNameValidation = /^[a-zA-Z\s]*$/;
  const regexEmailValidation =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPasswordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    validation(name, value);
  };

  const validation = (name, value) => {
    if (name === "name") {
      if (!regexNameValidation.test(value)) {
        setErrors({ ...errors, name: "Nama harus berupa huruf" });
      } else {
        setErrors({ ...errors, name: "" });
      }
    }

    if (name === "email") {
      if (!regexEmailValidation.test(value)) {
        setErrors({ ...errors, email: "Email tidak sesuai" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }

    if (name === "password") {
      if (!regexPasswordValidation.test(value)) {
        setErrors({ ...errors, password: "Password harus berisi huruf kapital dan angka" });
      } else if (value.length <= 8) {
        setErrors({ ...errors, password: "Password harus lebih dari 8 karakter" });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await create(values.name, values.email, values.password, values.role, values.nis);
      setLoading(false);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setTimeout(
          () =>
            Alert.fire({
              icon: "error",
              title: <strong>Maaf!</strong>,
              text: "Email sudah digunakan, coba daftarkan email yang lain",
              background: "#fecaca",
              confirmButtonColor: "#fee2e2",
            }),
          2000
        );
      }
      setLoading(false);
    }
  };

  return (
    <div className="relative z-50">
      <div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-opacity"></div>

      <div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
        <div className="flex w-full items-end justify-center py-20 sm:h-full sm:items-center sm:p-0 md:h-screen">
          <div className="relative w-full max-w-xs">
            <form onSubmit={handleSubmit} className="rounded-lg bg-white shadow">
              <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
                <h3 className="p-1.5 text-xl font-semibold text-gray-900 dark:text-white">Tambah User</h3>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                  data-modal-toggle="editUserModal"
                  onClick={handleModalCreateTrigger}>
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-6 p-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">Nama</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Masukkan nama"
                    required
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Masukkan email"
                    required
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Masukkan password"
                    required
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="nis" className="mb-2 block text-sm font-medium text-gray-900">
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">NIS</span>
                  </label>
                  <input
                    type="text"
                    name="nis"
                    id="nis"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Masukkan NIS"
                    required
                    autoFocus
                    value={values.nis}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="role" className="mb-2 block text-sm font-medium text-gray-900">
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">Role</span>
                  </label>
                  <div className="flex space-x-4">
                    <div>
                      <input
                        type="radio"
                        name="role"
                        id="admin"
                        value="admin"
                        checked={values.role === "admin"}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="admin" className="ml-1 block text-sm text-gray-700">
                        Admin
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="role"
                        id="pustakawan"
                        value="pustakawan"
                        checked={values.role === "pustakawan"}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="pustakawan" className="ml-1 block text-sm text-gray-700">
                        Pustakawan
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 rounded-b border-t border-gray-200 p-6">
                {loading ? (
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-700 px-6 py-2 text-white text-sm font-medium"
                    disabled>
                    <PulseLoader color="#ffffff" size={8} margin={4} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-700 hover:bg-blue-600 px-6 py-2 text-white text-sm font-medium">
                    Tambah
                  </button>
                )}
                <button
                  type="button"
                  className="rounded-lg bg-red-600 hover:bg-red-500 px-6 py-2 text-white text-sm font-medium"
                  onClick={handleModalCreateTrigger}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreatePustakawan;
