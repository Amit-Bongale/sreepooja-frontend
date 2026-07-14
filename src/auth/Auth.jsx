import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import { Navigate, useLocation } from "react-router";
import { notify } from "../Utils/notify";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return token.startsWith("Bearer ") ? token.split(" ")[1] : token;
};

const isTokenValid = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

function Auth({ children }) {
  const location = useLocation();

  const token = getToken();
  const isAuthenticated = useMemo(() => {
    if (!token) return false;

    const valid = isTokenValid(token);
    if (!valid) localStorage.removeItem("token");
    return valid;
  }, [token]);

  if (!isAuthenticated) {
    notify("Please log in to Continue.", "error");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default Auth;
