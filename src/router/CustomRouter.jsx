import { Routes, Route } from "react-router";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Auth from "../Auth/Auth";
import ProtectedRoutes from "../auth/ProtectedRoutes";
import Unauthorized from "../pages/Unauthorized";

import Dashboard from "../pages/Dashboard";

import Home from "../pages/Website/Home";
import Services from "../pages/Website/Services";
import ServiceDetails from "../pages/Website/ServiceDetails";
import CheckOut from "../pages/Website/CheckOut";

import UserInitilizer from "../redux/UserInitializer";
import UserDashboard from "../pages/User/UserDashboard";
import Bookings from "../pages/User/Bookings";

import Profile from "../pages/User/Profile";

function CustomRouter() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route
          element={
            <Auth>
              <UserInitilizer />
            </Auth>
          }
        >
          <Route path="/checkout" element={<CheckOut />} />

          {/* Dashboard Routes */}
          <Route element={<Dashboard />}>
            {/*user protected routes*/}
            <Route element={<ProtectedRoutes allowedRoles={["USER"]} />}>
              <Route path="/account" element={<UserDashboard />} />
              <Route path="/user/bookings" element={<Bookings />} />
              <Route path="/user/profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default CustomRouter;
