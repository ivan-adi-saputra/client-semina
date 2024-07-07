import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuardRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (!token) return <Navigate to={"/login"} />;

  return children || <Outlet />;
}
