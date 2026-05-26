import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "./Reducer";
import { notify } from "../Utils/notify";
import { useNavigate, useLocation, Outlet } from "react-router";

function UserInitializer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/getDetail`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
          },
        );
        if (!response.ok) {
          localStorage.removeItem("token");
          notify("Session expired. Please log in again.", "error");
          navigate("/login", {
            state: {
              from: location.pathname,
            },
          });
          throw new Error("Failed to restor user");
        }

        const data = await response.json();

        dispatch(
          userLogin({
            // id: data.id,
            name: data.firstName,
            phone: data.mobile,
            roles: data.roles,
          }),
        );

        localStorage.setItem("token", `Bearer ${data.token}`);
        setLoading(false);
      } catch (error) {
        console.error("Error restoring user:", error);
        notify("Session expired. Please log in again.", "error");
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, [dispatch, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div
          className={`w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin`}
        ></div>
      </div>
    );
  }

  return <Outlet />;
}

export default UserInitializer;
