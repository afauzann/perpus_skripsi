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

const SetupRouter = () => {

  // const [uid, setUid] = useState(Auth.getUidFromCookies());

  // useEffect(() => {
  //   const uidFromCookies = Auth.getUidFromCookies();
  //   setUid(uidFromCookies); // Mengupdate uid saat cookie berubah
  // }, []);
  const { uid, loadingData } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRouter />} >
          <Route index element={<LoginPage />} />
          <Route path="/" element={<LoginPage uid={uid}/>} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<PrivateRouter />}>
          <Route element={<Layout uid={uid}/>}>
            {/* <Route path={`/${uid}/dashboard`} element={<DashboardPage />} /> */}
            <Route path={`/dashboard`} element={<DashboardPage />} />
            <Route path={`/${uid}/dashboard`} element={<DashboardPage />} />
            <Route path="/admin1" element={<DashboardAdmin />} />
            <Route path="/buku" element={<BukuPage />} />
            <Route path={`/:userId/buku`} element={<BukuUserPage/>} />
            <Route path={`/admin/peminjaman`} element={<PeminjamanPage/>} />
            <Route path={`/${uid}/user/peminjaman`} element={<PeminjamanUserPage uid={uid}/>} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SetupRouter;
