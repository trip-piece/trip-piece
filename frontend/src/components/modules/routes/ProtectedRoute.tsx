/* eslint-disable react/require-default-props */
import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserInfoState } from "../../../store/atom";

interface RouteProps {
  children?: ReactNode;
}

function ProtectedRoute({ children }: RouteProps) {
  const loggedIn = useRecoilState(UserInfoState);
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children || <Outlet />;
}

export default ProtectedRoute;
