import { Navigate, Outlet } from "react-router-dom";

interface RouteProps {
  children?: JSX.Element;
  loggedIn: boolean;
}

function ProtectedRoute({ loggedIn, children }: RouteProps): JSX.Element {
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children || <Outlet />;
}

export default ProtectedRoute;
