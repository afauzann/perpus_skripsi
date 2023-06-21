import { Navigate, Outlet, useLocation } from "react-router-dom";
import Auth from "../utils/auth";

export default function ProtectedRouter() {
  const location = useLocation();
  const uid = Auth.getUidFromCookies();

  if (Auth.isAuthorization()) {
		return <Navigate to={`/${uid}/dashboard`} replace />;
	}
	return <Outlet />;
}
