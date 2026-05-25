import { Routes, Route } from "react-router";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserInitializer from "../Redux/UserInitializer";
import Auth from "../Auth/Auth";
import ProtectedRoutes from "../auth/ProtectedRoutes";
import Unauthorized from "../pages/Unauthorized";

import Dashboard from "../pages/Dashboard";

import Home from "../pages/Website/Home";
import Services from "../pages/Website/Services";

function CustomRouter() {
  return (
    <div>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />


        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <UserInitializer>
              <Auth />
            </UserInitializer>
          }
        >

          {/*user*/}
          <Route
            path="user/membershipdashboard"
            element={
              <ProtectedRoutes allowedRoles={["USER"]}>
                <Route path="dashboard" element={<Dashboard />} />
              </ProtectedRoutes>
            }
          />

        </Route>
      </Routes>
    </div>
  );
}

export default CustomRouter;
