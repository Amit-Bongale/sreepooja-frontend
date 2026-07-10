import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import logo from "../assets/logo.jpg";
import { Phone, Lock, ArrowLeft } from "lucide-react";
import { notify } from "../Utils/notify";
import { useDispatch } from "react-redux";
import { userLogin } from "../Redux/Reducer";
import { jwtDecode } from "jwt-decode";
import Nav from "../components/Nav";
import roleRoutes from "../router/roleRoutes";

function AppLogin() {
  const [userDetails, setUserDetails] = useState({
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setUserDetails((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.password) {
      notify("Please enter password", "error");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/staff-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobileNo: userDetails.phone,
            password: userDetails.password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // store token
      localStorage.setItem("token", `Bearer ${data.token}`);

      // decode token
      const decodedToken = jwtDecode(data.token);

      // dispatch normalized user data
      dispatch(
        userLogin({
          // id: decodedToken.userid,
          name: decodedToken.username,
          phone: decodedToken.sub,
          roles: decodedToken.userrole,
        }),
      );

      // clear form
      setUserDetails({ phone: "", password: "" });

      const redirectPath =
        location.state?.from || roleRoutes[data.roles?.[0]] || "/";
      // navigate
      navigate(redirectPath);
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-orange-100 via-white to-orange-50 px-4">
      <Nav />
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-8 transition-all">
        <ArrowLeft className="md:hidden" onClick={() => navigate(-1)} />
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-20 h-20 mb-4 rounded-full shadow-md"
            />{" "}
          </Link>
          <h2 className="text-3xl font-bold text-blue-950">Login</h2>
          <p className="text-gray-500 text-sm mt-1">
            {" "}
            Login securely using your mobile number{" "}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Phone Number Field */}
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400 flex gap-1 ">
              <Phone className="h-5 w-5" /> <span className="text-md">+91</span>
            </div>
            <input
              type="number"
              name="phone"
              maxLength={10}
              value={userDetails.phone}
              onChange={handleChanges}
              placeholder="Enter mobile number"
              className="w-full border border-gray-300 rounded-lg py-2.5 px-4 pl-17 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <div>
            <div className="relative animate-fadeIn">
              <Lock className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
              <input
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChanges}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-lg py-2.5 px-4 pl-10 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full mt-4 py-2.5 rounded-lg font-medium shadow-md cursor-pointer transition-transform duration-200 bg-orange-500 text-white hover:bg-orange-600 `}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppLogin;
