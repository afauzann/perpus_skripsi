import React, { useState } from "react";
import { useSubscription } from "@apollo/client";
import { PulseLoader } from "react-spinners";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { SubcriptionPinjam } from "../../graphql/typeDefs/pinjam.graphlql";
import LaporanPeminjamanListItem from "./LaporanPeminjamanListItem";
import { Button } from "flowbite-react";
import ExcelJS from "exceljs";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

const LaporanPeminjamanList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, loading } = useSubscription(SubcriptionPinjam, {
    variables: {
      searchTerm: `%${searchTerm}%`,
      limit,
      offset: (page - 1) * limit,
    },
  });

  const handleSearch = () => {
    setPage(1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handlePrintPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Laporan Peminjaman Buku", 105, 10, "center");

    const tableData = [];
    const columns = [
      { title: "No", dataKey: "no" },
      { title: "Id Buku", dataKey: "id_buku" },
      { title: "Nama Buku", dataKey: "nama_buku" },
      { title: "Nama User", dataKey: "nama_user" },
      { title: "Tanggal Peminjaman", dataKey: "tanggal_peminjaman" },
      { title: "Tanggal Pengembalian", dataKey: "tanggal_pengembalian" },
      { title: "Status", dataKey: "status" },
      { title: "Lewat Batas Peminjaman?", dataKey: "lewat_batas" },
    ];

    data?.peminjaman_aggregate.nodes.forEach((item, index) => {
      const isLewatBatas = moment().isAfter(moment(item.tanggal_pengembalian), "day");
      const lewat_batas = isLewatBatas ? "ya" : "tidak";

      tableData.push({
        no: index + 1,
        id_buku: item.id_buku,
        nama_buku: item.peminjaman_buku.nama_buku,
        nama_user: item.nama_user,
        tanggal_peminjaman: item.tanggal_peminjaman,
        tanggal_pengembalian: item.tanggal_pengembalian,
        status: item.status,
        lewat_batas,
      });
    });

    doc.autoTable({
      head: [columns.map((column) => column.title)],
      body: tableData.map((data) => columns.map((column) => data[column.dataKey])),
      startY: 20,
      theme: "striped",
      styles: { halign: "center" },
    });

    doc.save("laporan_peminjaman.pdf");
  };

  
  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Laporan Peminjaman");
  
    // Header
    worksheet.getRow(1).values = [
      "No",
      "Id Buku",
      "Nama Buku",
      "Nama User",
      "Tanggal Peminjaman",
      "Tanggal Pengembalian",
      "Status",
      "Lewat Batas Peminjaman",
    ];
  
    // Data
    data?.peminjaman_aggregate.nodes.forEach((item, index) => {
        
      // Menentukan apakah tanggal pengembalian melewati hari ini atau belum
      const isLewatBatas = moment().isAfter(moment(item.tanggal_pengembalian), "day");
      const lewat_batas = isLewatBatas ? "ya" : "tidak";

      const rowIndex = index + 2;
      worksheet.getRow(rowIndex).values = [
        index + 1,
        item.id_buku,
        item.peminjaman_buku.nama_buku,
        item.nama_user,
        item.tanggal_peminjaman,
        item.tanggal_pengembalian,
        item.status,
        lewat_batas
      ];
    });
  
    // Auto fit column width
    worksheet.columns.forEach((column) => {
      column.width = 15;
    });
  
    // Export to Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "laporan_peminjaman.xlsx";
    a.click();
  };
  
  return (
    <div className="container mx-auto py-6 px-6">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="w-full sm:w-auto flex-grow-0 flex-shrink-0 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari User..."
            className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
          />
          <button
            onClick={handleSearch}
            className="absolute inset-y-0 right-0 px-4 flex items-center bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Cari
          </button>
        </div>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <Button onClick={handlePrintPDF}>Cetak PDF</Button>
          <Button onClick={handleExportExcel}>Cetak Excel</Button>
        </div>
      </div>
      {loading ? (
        <div className="my-0 mx-auto flex items-center justify-center pt-5">
          <PulseLoader size={10} color="#2563eb" />
        </div>
      ) : data?.peminjaman_aggregate.nodes.length > 0 ? (
        <>
        <div className="relative w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="whitespace-no-wrap w-full text-left text-sm text-gray-500">
            <thead>
              <tr className="w-full border-b border-gray-200 bg-blue-50 text-xs uppercase text-gray-700">
                <th scope="col" className="py-3 px-2 w-20" style={{ textAlign: "center" }}>
                  No
                </th>
                <th scope="col" className="py-3 px-2 w-20" style={{ textAlign: "center" }}>
                  Gambar Buku
                </th>
                <th scope="col" className="py-3 px-6">
                  Nama Buku
                </th>
                <th scope="col" className="py-3 px-6">
                  Nama User
                </th>
                <th scope="col" className="py-3 px-6">
                  Tanggal Peminjaman
                </th>
                <th scope="col" className="py-3 px-6">
                  Tanggal Pengembalian
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Lewat Batas Peminjaman?
                </th>
              </tr>
            </thead>
            {data?.peminjaman_aggregate.nodes.map((item, i) => {
              return <LaporanPeminjamanListItem key={item.id} data={{ ...item, no: i + 1 }} />;
            })}
          </table>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-4 sm:mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page <= 1}
            className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={data?.peminjaman_aggregate.nodes.length < limit}
            className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Next
          </button>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap items-center justify-center py-4 px-6 text-xs font-semibold leading-7 text-gray-700">
          <InformationCircleIcon className="mr-3 h-6 w-6 text-gray-600" />
          Data peminjaman kosong
        </div>
      )}
    </div>
  );
};

export default LaporanPeminjamanList;
