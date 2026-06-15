import { BrowserRouter } from "react-router";
import CustomRouter from "./router/CustomRouter";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { userLogin } from "./Redux/Reducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authHeader = localStorage.getItem("token");

    if (!authHeader?.startsWith("Bearer ")) {
      localStorage.removeItem("token");
      return;
    }

    const token = authHeader.substring(7);
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return;
      }

      dispatch(
        userLogin({
          name: decodedToken.username,
          phone: decodedToken.sub,
          roles: decodedToken.userrole,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <CustomRouter />
    </BrowserRouter>
  );
}

export default App;
