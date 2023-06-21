import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 max-w-sm">
        <h2 className="text-4xl font-bold mb-4">404</h2>
        <p className="text-gray-600 mb-4">Oops! Halaman yang Anda cari tidak ditemukan.</p>
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
