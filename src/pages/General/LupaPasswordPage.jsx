import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { auth } from "../../configs/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

function LupaPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Panggil fungsi reset password dari Firebase Auth
      await sendPasswordResetEmail(auth, email);

      // Menampilkan SweetAlert2 untuk berhasil mereset password
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Silahkan cek email Anda untuk reset password",
      });

      setEmail("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal mereset password. Silahkan coba lagi.",
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
        <h1 className="pb-2 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Lupa Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Masukkan email"
              required
              autoFocus
              onChange={handleChange}
              value={email}
            />
          </div>
          {loading ? (
            <button className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
              <PulseLoader size={7} color={"#ffffff"} />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Reset Password
            </button>
          )}
        </form>
        <p className="text-center text-sm font-light text-gray-500 ">
          Sudah mereset akun?
          <Link
            to="/"
            className="ml-1 font-medium text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LupaPasswordPage;
