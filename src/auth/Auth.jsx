import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

import { useSelector } from "react-redux";

function Auth({children}) {
  const navigate = useNavigate();
  const LoggedInUser = useSelector((state) => state.user.user);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {

      let token = localStorage.getItem("token");
      if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      if (!token) {
        setUser(false);
        navigate("/login");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setUser(false);
          navigate("/login");
        } else {
          setUser(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        setUser(false);
        navigate("/login");
      }

    };
    checkAuth();
  }, [navigate , LoggedInUser]);

  if (user === false) return <Navigate to="/login" />;

  return children;

}

export default Auth;
