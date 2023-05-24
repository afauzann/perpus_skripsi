import { Navigate, Outlet } from "react-router-dom";
import Auth from "../utils/auth";



export default function ProtectedRouter() {
	if (Auth.isAuthorization()) {
		return <Navigate to="/dashboard" replace />;
	}
	return <Outlet />;
}
