import React, { useEffect, useState } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";

const ModalEditPengembalian = ({
  handleModalEditTrigger,
  update,
  handleChange,
  handleUpdate,
  id,
}) => {
  return (
    <div className="relative z-50">
      <div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-opacity"></div>

      <div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
        <div className="flex w-full items-end justify-center px-4 py-20 sm:h-full sm:items-center sm:p-0 md:h-screen">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <form
              onSubmit={handleUpdate}
              className="rounded-lg bg-white shadow"
            >
              <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
                <h3 className="p-1.5 text-base font-semibold text-gray-900 dark:text-white lg:text-lg xl:text-xl">
                  Edit Status
                </h3>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                  onClick={handleModalEditTrigger}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-6 p-6">
                <div>
                  <label
                    htmlFor="status"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                      Status
                    </span>
                  </label>
                  <div className="space-x-2">
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="diproses"
                        checked={update.status === "diproses"}
                        onChange={handleChange}
                      />
                      Diproses
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="dikembalikan"
                        checked={update.status === "dikembalikan"}
                        onChange={handleChange}
                      />
                      Dikembalikan
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 rounded-b border-t border-gray-200 p-6">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditPengembalian;
