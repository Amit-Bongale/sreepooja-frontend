import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function ProtectedRoutes({ allowedRoles = [] }) {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const hasRole = useMemo(
    () => allowedRoles.some((role) => user.roles.includes(role)),
    [allowedRoles, user.roles],
  );

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles.length > 0 && !hasRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
