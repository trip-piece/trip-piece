import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RouteProps {
  loggedIn: Boolean;
  children: React.ReactNode;
}

function ProtectedRoute({ loggedIn, children }: RouteProps) {
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children || <Outlet />;
}

export default ProtectedRoute;
