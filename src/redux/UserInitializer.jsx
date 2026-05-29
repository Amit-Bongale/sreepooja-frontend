import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./Reducer";
import { notify } from "../Utils/notify";
import { useNavigate, useLocation, Outlet } from "react-router";

const restoreUserSession = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/user/getDetail`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    },
  );

  if (!response.ok) throw new Error("SESSION_EXPIRED");

  const data = await response.json();
  return data;
};

function UserInitializer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user.user);

  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (user) {
      return;
    }

    restoreUserSession()
      .then((data) => {
        dispatch(
          userLogin({
            name: data.firstName,
            phone: data.mobile,
            roles: data.roles,
          }),
        );
        localStorage.setItem("token", `Bearer ${data.token}`);
      })
      .catch((error) => {
        console.error("Error restoring user data: ", error);
        localStorage.removeItem("token");
        notify("Please log in to Continue.", "error");
        navigate("/login", {
          state: { from: location.pathname },
          replace: true,
        });
      })
      .finally(() => setLoading(false));
  }, [dispatch, navigate, user, location.pathname]);

  if (loading) return <Spinner />;

  if (user) {
    return <Outlet />;
  }
}

function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
    </div>
  );
}

export default UserInitializer;
