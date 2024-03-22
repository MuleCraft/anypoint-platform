import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const PrivateRoutes = () => {
  const { session } = useContext(AuthContext);

  return session ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
