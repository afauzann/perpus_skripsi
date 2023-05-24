import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import DashboardUser from "../pages/User/DashboardUser";
// import HomePage from "../pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/General/RegisterPage";
import LoginPage from "../pages/General/LoginPage";
import DashboardPage from "../pages/General/DashboardPage";
import ProtectedRouter from "./ProtectedRouter";
import PrivateRouter from "./PrivateRouter";
import Layout from "../components/General/Layout";
import BukuPage from "../pages/Admin/BukuPage";

const SetupRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRouter />} >
            <Route index element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>} />
          </Route >
          <Route path="/" element={< PrivateRouter/>}>
            <Route element={<Layout/>}>
              <Route path="/dashboard" element={<DashboardPage/>} />
              <Route path="/admin" element={<DashboardAdmin/>} />
              <Route path="/buku" element={<BukuPage/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default SetupRouter;
