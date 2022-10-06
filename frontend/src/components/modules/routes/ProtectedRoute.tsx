/* eslint-disable react/require-default-props */
import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RouteProps {
  children?: ReactNode;
  loggedIn: boolean;
}

function ProtectedRoute({ loggedIn, children }: RouteProps) {
  if (!loggedIn) <Navigate to="/" replace />;

  return children || <Outlet />;
}

export default ProtectedRoute;
