import React from "react";
import { useSubscription } from "@apollo/client";
import {
  BookOpenIcon,
  CurrencyDollarIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  IdentificationIcon,
  TagIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { PulseLoader } from "react-spinners";
import { TotalBuku } from "../../graphql/typeDefs/buku.graphql";
import { TotalPeminjaman } from "../../graphql/typeDefs/pinjam.graphlql";
import {
  TotalDenda,
  TotalPengembalian,
} from "../../graphql/typeDefs/pengembalian.graphql";
import { FormatRupiah } from "@arismun/format-rupiah";
import { TotalSiswa } from "../../graphql/typeDefs/users.graphql";
import { Link } from "react-router-dom";
import { TotalKategori } from "../../graphql/typeDefs/kategori.graphql";

const OverviewDataPustakawan = () => {
  const { data: dataSubsBuku, loading: loadingSubsBuku } =
    useSubscription(TotalBuku);
    const { data: dataSubsKategori, loading: loadingSubsKategori } =
    useSubscription(TotalKategori);
  const { data: dataSubsPinjam, loading: loadingSubsPinjam } =
    useSubscription(TotalPeminjaman);
  const { data: dataSubsPengembalian, loading: loadingSubsPengembalian } =
    useSubscription(TotalPengembalian);
  const { data: dataSubsDenda, loading: loadingSubsDenda } =
    useSubscription(TotalDenda);
  const { data: dataSubsSiswa, loading: loadingSubSiswa } =
    useSubscription(TotalSiswa);

  const loading =
    loadingSubsBuku ||
    loadingSubsKategori ||
    loadingSubsPinjam ||
    loadingSubsPengembalian ||
    loadingSubsDenda ||
    loadingSubSiswa;

  return (
    <div className="container mx-auto py-6 px-6">
      {loading ? (
        <div className="my-0 mx-auto flex items-center justify-center pt-5">
          <PulseLoader size={10} color="#2563eb" />
        </div>
      ) : (
        <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-lg border bg-white p-4 shadow-sm hover:bg-indigo-100">
              <div className="flex items-center space-x-4">
                <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 p-5">
                  <span className="text-sm">
                    <IdentificationIcon className="h-6 w-6 text-indigo-700" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    Total Siswa
                  </p>
                  <p className="truncate text-sm font-medium text-gray-500">
                    {dataSubsSiswa?.users_aggregate.aggregate.count}
                  </p>
                </div>
              </div>
            </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm hover:bg-indigo-100">
            <div className="flex items-center space-x-4">
              <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 p-5">
                <span className="text-sm">
                  <BookOpenIcon className="h-6 w-6 text-indigo-700" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  Total Buku
                </p>
                <p className="truncate text-sm font-medium text-gray-500">
                  {dataSubsBuku?.buku_aggregate.aggregate.count}
                </p>
              </div>
            </div>
          </div>
		  <Link to="/pustakawan/peminjaman">
          <div className="rounded-lg border bg-white p-4 shadow-sm hover:bg-indigo-100">
            <div className="flex items-center space-x-4">
              <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 p-5">
                <span className="text-sm">
                  <DocumentArrowUpIcon className="h-6 w-6 text-indigo-700" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  Total peminjaman
                </p>
                <p className="truncate text-sm font-medium text-gray-500">
                  {dataSubsPinjam?.peminjaman_aggregate.aggregate.count}
                </p>
              </div>
            </div>
          </div>
		  </Link>
		  <Link to="/pustakawan/pengembalian">
          <div className="rounded-lg border bg-white p-4 shadow-sm hover:bg-indigo-100">
            <div className="flex items-center space-x-4">
              <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 p-5">
                <span className="text-sm">
                  <DocumentArrowDownIcon className="h-6 w-6 text-indigo-700" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  Total pengembalian
                </p>
                <p className="truncate text-sm font-medium text-gray-500">
                  {dataSubsPengembalian?.pengembalian_aggregate.aggregate.count}
                </p>
              </div>
            </div>
          </div>
		  </Link>
		  <Link to="/pustakawan/pengembalian">
          <div className="rounded-lg border bg-white p-4 shadow-sm hover:bg-indigo-100">
            <div className="flex items-center space-x-4">
              <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 p-5">
                <span className="text-sm">
                  <CurrencyDollarIcon className="h-6 w-6 text-indigo-700" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  Total Denda
                </p>
                <p className="truncate text-sm font-medium text-gray-500">
                  <FormatRupiah
                    value={
						dataSubsDenda?.pengembalian_aggregate.aggregate.sum.denda
                    }
					/>
                </p>
              </div>
            </div>
          </div>
		</Link>
        </div>
      )}
    </div>
  );
};

export default OverviewDataPustakawan;
