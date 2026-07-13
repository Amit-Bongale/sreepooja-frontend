import { Routes, Route } from "react-router";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Auth from "../Auth/Auth";
import ProtectedRoutes from "../auth/ProtectedRoutes";
import Unauthorized from "../pages/Unauthorized";
import UserInitilizer from "../redux/UserInitializer";

import Home from "../pages/Website/Home";
import Services from "../pages/Website/Services";
import ServiceDetails from "../pages/Website/ServiceDetails";
import CheckOut from "../pages/Website/CheckOut";

import Dashboard from "../pages/Dashboard";

import UserDashboard from "../pages/User/UserDashboard";
import Profile from "../pages/User/Profile";
import Bookings from "../pages/User/Bookings";
import ContentManagerDashboard from "../pages/Staff/contentManager/ContentManagerDashboard";
import MangeServices from "../pages/Staff/contentManager/MangeServices";
import ManageCategories from "../pages/Staff/contentManager/ManageCategories";
import AddService from "../components/staff/contentManager/Serevices/AddService";
import ManageCommunity from "../pages/Staff/contentManager/ManageCommunity";
import ManageLanguages from "../pages/Staff/contentManager/ManageLanguages";
import ManageStates from "../pages/Staff/contentManager/ManageStates.jsx";
import ManageCities from "../pages/Staff/contentManager/ManageCities.jsx";
import ManagePincodes from "../pages/Staff/contentManager/MangePincodes.jsx";
import EditService from "../components/staff/contentManager/Serevices/EditService.jsx";
import BookingDetailas from "../pages/User/BookingDetailas.jsx";
import OperationManagerDashboard from "../pages/Staff/OperationManager/OperationManagerDashboard.jsx";
import LatestBookings from "../pages/Staff/OperationManager/LatestBookings.jsx";
import PendingPayment from "../pages/Staff/OperationManager/PendingPayment.jsx";
import ActivePoojas from "../pages/Staff/OperationManager/ActivePoojas.jsx";
import AllBookings from "../pages/Staff/OperationManager/AllBookings.jsx";
import CancelledBookings from "../pages/Staff/OperationManager/CancelledBookings.jsx";
import ManagePriests from "../pages/Staff/OperationManager/ManagePriests.jsx";
import Contact from "../pages/Website/Contact.jsx";

import SuperAdminDashboard from "../pages/Super_Admin/SuperAdminDashboard.jsx";
import ManageStaff from "../pages/Super_Admin/ManageStaff.jsx";
import PriestRegistration from "../pages/Priest/PriestRegistration.jsx";
import AboutUs from "../pages/Website/Aboutus.jsx";
import CustomOrder from "../pages/Staff/OperationManager/CustomOrder.jsx"
import CreateCustomBooking from "../components/staff/operationManager/CreateCustomBooking.jsx";
import PendingCustomOrders from "../pages/Staff/OperationManager/PendingCustomOrders.jsx";
import AppLogin from "../pages/AppLogin.jsx";
import PriestRequest from "../pages/Staff/OperationManager/PriestRequest.jsx";


function CustomRouter() {
  return (
    <div>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/login" element={<Login />} />
        <Route path="/portal/login" element={<AppLogin />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/onboarding" element={<PriestRegistration />} />
  


        {/* Protected Routes */}
        <Route
          element={
            <Auth>
              <UserInitilizer />
            </Auth>
          }
        >

          <Route path="/checkout/:id/:type" element={<CheckOut />} />

          {/* Dashboard Routes */}
          <Route element={<Dashboard />}>

            {/*user protected routes*/}
            <Route element={<ProtectedRoutes allowedRoles={["USER"]} />}>
              <Route path="/account" element={<UserDashboard />} />
              <Route path="/user/bookings" element={<Bookings />} />
              <Route path="/user/bookings/:id" element={<BookingDetailas />} />
            </Route>

            <Route element={<ProtectedRoutes 
              allowedRoles={["USER" , "CONTENT_MANAGER" , "OPERATIONS_MANAGER", "SUPER_ADMIN"]} />}>
              <Route path="/user/profile" element={<Profile />} />
            </Route>


            {/*Content_Manager protected routes*/}
            <Route element={<ProtectedRoutes allowedRoles={["CONTENT_MANAGER"]} />}>
              <Route path="/content-manager/dashboard" element={<ContentManagerDashboard />} />
              <Route path="/staff/services" element={<MangeServices />} />
              <Route path="/staff/services/add" element={<AddService />} />
              <Route path="/staff/services/edit/:slug" element={<EditService />} />
              <Route path="/staff/categories" element={<ManageCategories />} />
              <Route path="/staff/community" element={<ManageCommunity />} />
              <Route path="/staff/language" element={<ManageLanguages />} />
              <Route path="/staff/locations" element={<ManageStates />} />
              <Route path="/staff/:state/:stateId/cities" element={<ManageCities />} />
              <Route path="/staff/:city/:cityId/pincodes" element={<ManagePincodes />} />
            </Route>


            {/*Operations_Manager protected routes*/}
            <Route element={<ProtectedRoutes allowedRoles={["OPERATIONS_MANAGER"]} />}>
              <Route path="/operation-manager/dashboard" element={<OperationManagerDashboard />} />
              <Route path="/staff/bookings/latest" element={<LatestBookings />}/>
              <Route path="/staff/bookings/pending-payments" element={<PendingPayment />}/>
              <Route path="/staff/bookings/active" element={<ActivePoojas />}/>
              <Route path="/staff/bookings/all" element={<AllBookings />}/>
              <Route path="/staff/bookings/cancelled" element={<CancelledBookings />}/>
              <Route path="/staff/bookings/custom" element={<CustomOrder />}/>
              <Route path="/staff/bookings/pending/custom" element={<PendingCustomOrders />}/>
              <Route path="/staff/bookings/custom/create" element={<CreateCustomBooking />}/>
              <Route path="/staff/manage/priest" element={<ManagePriests />}/>
              <Route path="/staff/priest/requests" element={<PriestRequest />}/>

            </Route>

            <Route element={<ProtectedRoutes allowedRoles={["SUPER_ADMIN"]} />}>
              <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
              <Route path="/manage/staff" element={<ManageStaff />}/>
            </Route>

          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default CustomRouter;
