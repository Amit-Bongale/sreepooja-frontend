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
import ContentManagerDashboard from "../pages/Staff/contentManager/ContentManagerDashboard";
import MangeServices from "../pages/Staff/contentManager/MangeServices";
import ManageCategories from "../pages/Staff/contentManager/ManageCategories";
import AddService from "../components/staff/contentManager/Serevices/AddService";
import ManageCommunity from "../pages/Staff/contentManager/ManageCommunity";
import ManageLanguages from "../pages/Staff/contentManager/ManageLanguages";
import ManageStates from "../pages/Staff/contentManager/ManageStates.jsx";
import ManageCities from "../pages/Staff/contentManager/ManageCities.jsx";
import ManagePincodes from "../pages/Staff/contentManager/MangePincodes.jsx";

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

            <Route
              element={<ProtectedRoutes allowedRoles={["Content_Manager"]} />}
            >
              <Route
                path="/content-manager/dashboard"
                element={<ContentManagerDashboard />}
              />
              <Route path="/staff/services" element={<MangeServices />} />
              <Route path="/staff/services/add" element={<AddService />} />

              <Route path="/staff/categories" element={<ManageCategories />} />
              <Route path="/staff/community" element={<ManageCommunity />} />
              <Route path="/staff/language" element={<ManageLanguages />} />
              <Route path="/staff/locations" element={<ManageStates />} />
              <Route path="/staff/:state/:stateId/cities" element={<ManageCities />} />
              <Route path="/staff/:city/:cityId/pincodes" element={<ManagePincodes />} />


            </Route>
            
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default CustomRouter;
