import React, { useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import useUser from "../../hooks/useUser";
import { isAuthorizedAdmin, isAuthorizedSiswa } from "../../mocks/isAuthorized";

const Sidebar = ({ uid }) => {
  const { id } = useParams();
  const { role, loadingData } = useUser(id);

  return (
    <div className="fixed z-30 hidden min-h-screen w-64 overflow-y-auto border-r border-gray-200 bg-white py-4 px-3 md:block">
      <div className="relative">
        <Link to="/dashboard" className="mb-5 flex cursor-pointer items-center pl-2.5">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-blue-600">Perpus</span>
        </Link>
        {loadingData && (
          <div className="my-0 mx-auto flex items-center justify-center pt-5">
            <PulseLoader size={10} color="#2563eb" />
          </div>
        )}
        <ul>
          {role === "admin" && (
            <ul>
              {isAuthorizedAdmin.map((item, idx) => {
                return (
                  <li key={idx}>
                    <NavLink
                      to={item.path.replace(":uid", uid)} // Mengganti :uid dengan nilai uid yang diteruskan
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center rounded-lg bg-indigo-100 p-2 text-base font-semibold text-indigo-700 hover:bg-indigo-200"
                          : "flex items-center rounded-lg p-2 text-base font-normal text-gray-600 hover:bg-indigo-100"
                      }
                    >
                      {item.icon}
                      <span className="ml-3 font-medium">{item.name}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
          {role === "siswa" && (
            <ul>
              {isAuthorizedSiswa.map((item, idx) => {
                return (
                  <li key={idx}>
                    <NavLink
                      to={item.path.replace(":uid", uid)} // Mengganti :uid dengan nilai uid yang diteruskan
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center rounded-lg bg-indigo-100 p-2 text-base font-semibold text-indigo-700 hover:bg-indigo-200"
                          : "flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-indigo-100"
                      }
                    >
                      {item.icon}
                      <span className="ml-3 font-medium">{item.name}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
