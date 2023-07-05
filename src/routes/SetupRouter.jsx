import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/General/RegisterPage";
import LoginPage from "../pages/General/LoginPage";
import ProtectedRouter from "./ProtectedRouter";
import PrivateRouter from "./PrivateRouter";
import Layout from "../components/General/Layout";
import BukuPage from "../pages/Admin/BukuPage";
import Auth from "../utils/auth";
import DashboardPage from "../pages/General/DashboardPage";
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import BukuUserPage from "../pages/User/BukuUserPage";
import PeminjamanUserPage from "../pages/User/PeminjamanUserPage";
import PeminjamanPage from "../pages/Admin/PeminjamanPage";
import NotFoundPage from "../pages/General/NotFoundPage";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import PengembalianUserPage from "../pages/User/PengembalianUserPage";
import PengembalianPage from "../pages/Admin/PengembalianPage";
import LaporanPeminjamanPage from "../pages/Admin/LaporanPeminjamanPage";
import LaporanPengembalianPage from "../pages/Admin/LaporanPengembalianPage";
import UserPage from "../pages/Admin/UserPage";
import ProfilePage from "../pages/General/ProfilePage";
import LupaPasswordPage from "../pages/General/LupaPasswordPage";
import PeminjamanPustakawanPage from "../pages/Pustakawan/PeminjamanPustakawanPage";
import PengembalianPustakawanPage from "../pages/Pustakawan/PengembalianPustakawanPage";
import PustakawanPage from "../pages/Admin/PustawakanPage";
import KategoriPage from "../pages/Admin/KategoriPage";

const SetupRouter = () => {

  const { uid, loadingData } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRouter />} >
          <Route index element={<LoginPage />} />
          <Route path="/" element={<LoginPage uid={uid}/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/lupa-password" element={<LupaPasswordPage />} />
        </Route>
        <Route path="/" element={<PrivateRouter />}>
          <Route element={<Layout uid={uid}/>}>
            {/* <Route path={`/${uid}/dashboard`} element={<DashboardPage />} /> */}
            <Route path={`/dashboard`} element={<DashboardPage />} />
            <Route path={`/${uid}/dashboard`} element={<DashboardPage uid={uid}/>} />
            <Route path={`/${uid}/profile`} element={<ProfilePage uid={uid}/>} />
            <Route path="/admin1" element={<DashboardAdmin />} />
            <Route path="/admin/user" element={<UserPage />} />
            <Route path="/admin/pustakawan" element={<PustakawanPage />} />
            <Route path="/buku" element={<BukuPage />} />
            <Route path={`/:userId/buku`} element={<BukuUserPage/>} />
            <Route path="/kategori" element={<KategoriPage />} />
            <Route path={`/admin/peminjaman`} element={<PeminjamanPage/>} />
            <Route path={`/pustakawan/peminjaman`} element={<PeminjamanPustakawanPage/>} />
            <Route path={`/${uid}/user/peminjaman`} element={<PeminjamanUserPage uid={uid}/>} />
            <Route path={`/admin/pengembalian`} element={<PengembalianPage/>} />
            <Route path={`/pustakawan/pengembalian`} element={<PengembalianPustakawanPage/>} />
            <Route path={`/${uid}/user/pengembalian`} element={<PengembalianUserPage uid={uid}/>} />
            <Route path={`/admin/laporan_peminjaman`} element={<LaporanPeminjamanPage/>} />
            <Route path={`/admin/laporan_pengembalian`} element={<LaporanPengembalianPage/>} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SetupRouter;
