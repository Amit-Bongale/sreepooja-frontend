import { BrowserRouter } from "react-router";
import CustomRouter from "./router/CustomRouter";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { userLogin } from "./Redux/Reducer";
function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token")?.split(" ")[1];
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);

      dispatch(
        userLogin({
          name: decodedToken.username,
          phone: decodedToken.sub,
          roles: decodedToken.userrole,
        }),
      );
    } catch (err) {
      localStorage.removeItem("token");
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
