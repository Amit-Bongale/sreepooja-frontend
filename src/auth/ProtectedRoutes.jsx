import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function ProtectedRoutes({ allowedRoles = [] }) {
  const { user, isAuthenticated } = useSelector((state) => state.user);
 
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !user.roles.some((role) => allowedRoles.includes(role))
  ) {
    return <Navigate to="/"  replace />;
  }

  return <Outlet />
};

export default ProtectedRoutes