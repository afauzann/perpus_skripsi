import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useUser from "../../hooks/useUser";
import moment from "moment";
import { PulseLoader } from "react-spinners";
import Cookies from "js-cookie";
import { useMutation } from "@apollo/client";
import { AddPinjam } from "../../graphql/typeDefs/pinjam.graphlql";
import { EditStokBuku } from "../../graphql/typeDefs/buku.graphql";
import Swal from "sweetalert2";


const ModalPengembalianBuku = ({ handleModalKembaliTrigger, namaBuku, denda, stok, id, tanggal_pengembalian, tanggal_peminjaman }) => {
    const today = moment().format("YYYY-MM-DD");
    const { name, loadingData } = useUser();
    const [tanggalPinjam, setTanggalPinjam] = useState(today);
    const [tanggalPengembalian, setTanggalPengembalian] = useState("");
    const [jumlahPinjam, setJumlahPinjam] = useState(1);
    const [editBuku] = useMutation(EditStokBuku);
  
    const [addPinjam, { loading }] = useMutation(AddPinjam, {
      onCompleted: () => {
        Swal.fire({
          title: "Peminjaman Berhasil",
          icon: "success",
        });
        handleModalKembaliTrigger();
      },
      onError: (error) => {
        Swal.fire({
          title: "Peminjaman Gagal",
          text: error.message,
          icon: "error",
        });
      },
    });
  
    const handleTanggalPinjamChange = (e) => {
      const tanggal = e.target.value;
      setTanggalPinjam(tanggal);
  
      // Mengatur tanggal pengembalian dengan batasan maksimal 30 hari dari tanggal peminjaman
      const tanggalPengembalian = moment(tanggal).add(30, "days").format("YYYY-MM-DD");
      setTanggalPengembalian(tanggalPengembalian);
    };
  
    const handlePeminjaman = (durasi) => {
      const tanggalPengembalian = moment(tanggalPinjam)
        .add(durasi, "days")
        .format("YYYY-MM-DD");
        setTanggalPengembalian(tanggalPengembalian);
    };
  
    const handlePinjam = async (e) => {
        e.preventDefault();
      
        if (!tanggalPengembalian) {
            Swal.fire({
              title: "Tanggal Pengembalian Tidak Valid",
              text: "Tanggal pengembalian harus diisi.",
              icon: "error",
            });
            return;
          }
          
        if (jumlahPinjam > stok) {
          Swal.fire({
            title: "Jumlah Pinjam Tidak Valid",
            text: "Jumlah pinjam melebihi stok buku yang tersedia.",
            icon: "error",
          });
          return;
        }
      
        if (jumlahPinjam <= 0) {
          Swal.fire({
            title: "Jumlah Pinjam Tidak Valid",
            text: "Jumlah pinjam harus lebih dari 0.",
            icon: "error",
          });
          return;
        }
      
        try {
          await addPinjam({
            variables: {
              id_buku: id,
              id_users: Cookies.get("uid"),
              jumlah_pinjam: parseFloat(jumlahPinjam),
              denda: denda,
              nama_buku: namaBuku,
              nama_user: name,
              tanggal_peminjaman: tanggalPinjam,
              tanggal_pengembalian: tanggalPengembalian,
            },
          });
      
          const updatedStok = stok - jumlahPinjam;
      
          await editBuku({
            variables: {
              id: id,
              stok: updatedStok,
            },
          });
      
          Swal.fire({
            title: "Peminjaman Berhasil",
            icon: "success",
          });
          handleModalKembaliTrigger();
        } catch (error) {
          Swal.fire({
            title: "Peminjaman Gagal",
            text: error.message,
            icon: "error",
          });
        }
      };
      
    const handleJumlahPinjamChange = (e) => {
      const jumlah = parseInt(e.target.value);
      setJumlahPinjam(jumlah);
    };
    
  return (
    <div className="relative z-50">
      <div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-opacity"></div>
      <div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
        <div className="flex w-full items-end justify-center px-4 py-20 sm:h-full sm:items-center sm:p-0 md:h-screen">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <form onSubmit={handlePinjam} className="rounded-lg bg-white shadow">
              <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
                <h3 className="p-1.5 text-base font-semibold text-gray-900 dark:text-white lg:text-lg xl:text-xl">
                  Pengembalian Buku
                </h3>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                  onClick={handleModalKembaliTrigger}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-6 p-6">
                <div  className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="nama_buku"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                        Nama Buku
                      </span>
                    </label>
                    <input
                      type="text"
                      name="nama_buku"
                      id="nama_buku"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Masukkan nama buku"
                      value={namaBuku}
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nama_user"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                        Nama User
                      </span>
                    </label>
                    <div className="relative">
                      {loadingData && (
                        <div className="absolute top-2 left-2">
                          <PulseLoader size={5} color="#2563eb" />
                        </div>
                      )}
                      <input
                        type="text"
                        name="nama_user"
                        id="nama_user"
                        className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={name}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="tanggal_pinjam"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Tanggal Pinjam
                    </label>
                    <input
                      type="date"
                      name="tanggal_pinjam"
                      id="tanggal_pinjam"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      value={tanggal_peminjaman}
                      min={today}
                      max={today}
                      onChange={handleTanggalPinjamChange}
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="tanggal_pengembalian"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Tanggal Pengembalian
                    </label>
                    <input
                      type="date"
                      name="tanggal_pengembalian"
                      id="tanggal_pengembalian"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      value={tanggal_pengembalian}
                      required
                      readOnly
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="stok"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                        Stok
                      </span>
                    </label>
                    <input
                      type="text"
                      name="stok"
                      id="stok"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Masukkan nama buku"
                      value={stok}
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="jumlah_pinjam"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                        Jumlah Pinjam
                      </span>
                    </label>
                    <input
                      type="number"
                      name="jumlah_pinjam"
                      id="jumlah_pinjam"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Masukkan jumlah buku yang ingin dipinjam"
                      value={jumlahPinjam}
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="denda"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                        Denda
                      </span>
                    </label>
                    <input
                      type="number"
                      name="denda"
                      id="denda"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Masukkan jumlah buku yang ingin dipinjam"
                      value={denda}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 rounded-b border-t border-gray-200 p-6">
              {loading ? ( <button
                  type="submit"
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  onClick={handlePinjam}
                >
                  <PulseLoader size={7} color={"#ffffff"} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  onClick={handlePinjam}
                >
                  Kembalikan
                </button>
              )}
                <button
                  type="button"
                  className="rounded-lg bg-gray-300 px-5 py-2.5 text-center text-sm font-medium text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200"
                  onClick={handleModalKembaliTrigger}
                >
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

export default ModalPengembalianBuku;
