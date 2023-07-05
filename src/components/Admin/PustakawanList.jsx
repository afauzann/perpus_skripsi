import React, { useState } from "react";
import { useSubscription } from "@apollo/client";

import { SubscriptionBuku } from "../../graphql/typeDefs/buku.graphql";
import { PulseLoader } from "react-spinners";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import BukuListItem from "./BukuListItem";
import { SubscriptionStaff, SubscriptionUser } from "../../graphql/typeDefs/users.graphql";
import UserListItem from "./UserListItem";
import PustakawanListItem from "./PustakawanListItem";

const PustakawanList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, loading } = useSubscription(SubscriptionStaff, {
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
      </div>

      {loading ? (
        <div className="my-0 mx-auto flex items-center justify-center pt-5">
          <PulseLoader size={10} color="#2563eb" />
        </div>
      ) : data?.users_aggregate.nodes.length > 0 ? (
        <>
        <div className="relative w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="whitespace-no-wrap w-full text-left text-sm text-gray-500">
            <thead>
              <tr className="w-full border-b border-gray-200 bg-blue-50 text-xs uppercase text-gray-700">
                <th scope="col" className="py-3 px-2 w-20" style={{ textAlign: "center" }}>
                  No
                </th>
                <th scope="col" className="py-3 px-2 w-20">
                  Nama User
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Password
                </th>
                <th scope="col" className="py-3 px-6">
                  NIS
                </th>
                <th scope="col" className="py-3 px-6">
                  Role
                </th>
                <th scope="col" className="py-3 px-6">
                  Aksi
                </th>
              </tr>
            </thead>
            {data?.users_aggregate.nodes.map((item, i) => {
              return <PustakawanListItem key={item.id} data={{ ...item, no: i + 1 }} />;
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
          disabled={data?.users_aggregate.nodes.length < limit}
          className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Next
        </button>
        </div>
        </>
      ) : (
        <div className="flex flex-wrap items-center justify-center py-4 px-6 text-xs font-semibold leading-7 text-gray-700">
          <InformationCircleIcon className="mr-3 h-6 w-6 text-gray-600" />
          Data user kosong
        </div>
      )}
    </div>
  );
};

export default PustakawanList;
