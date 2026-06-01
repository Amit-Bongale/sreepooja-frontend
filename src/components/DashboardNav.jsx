import { useEffect, useState } from "react";
import {
  Menu,
  X,
  FileText,
  LogOut,
  User,
  CalendarCheck,
  Users2,
  LayoutDashboard,
  CalendarDays,
  Home,
  Book,
  MapPin,
  Bell,
  Image,
  // MessageCircleQuestionMark,
  // Heart,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../Redux/Reducer";
import logo from "../assets/sreePooja.png";

function DashboardNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const roleMenus = {
    USER: [
      { name: "Home", icon: Home, path: "/" },
      { name: "Dashboard", icon: LayoutDashboard, path: "/account" },
      { name: "My Bookings", icon: CalendarDays, path: "/user/bookings" },
      { name: "Profile Details", icon: User, path: "/user/profile" },
      // { name: "Wishlist", icon: Heart, path: "/user/wishlist" },
      // { name: "Queries", icon: MessageCircleQuestionMark, path: "/user/queries" },
    ],

    STAFF: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/staff/dashboard",
      },
      {
        name: "Booking Requests",
        icon: FileText,
        path: "/staff/bookings",
      },
      {
        name: "All Booking",
        icon: CalendarCheck,
        path: "/staff/bookings",
      },
      {
        name: "Priests List",
        icon: Users2,
        path: "/staff/priests",
      },
      {
        name: "Customer Support",
        icon: Users2,
        path: "/staff/customer-support",
      },
    ],

    Content_Manager: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/content-manager/dashboard",
      },
      {
        name: "Services & Category",
        icon: Book,
        path: "/staff/services",
      },
      {
        name: "Serving Locations",
        icon: MapPin,
        path: "/staff/manage/locations",
      },
      {
        name: "Notifications",
        icon: Bell,
        path: "/staff/manage/notifications",
      },
      {
        name: "Banner and Blogs",
        icon: Image,
        path: "/staff/manage/ads",
      },
    ],

    ADMIN: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },
    ],

    SUPER_ADMIN: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },
      {
        name: "Manage All Users",
        icon: Users2,
        path: "/manage/users/all",
      },
    ],
  };

  const roles = Array.isArray(user?.roles) ? user.roles : [];

  const menuItems = roles
    .flatMap((role) => roleMenus[role] || [])
    .filter(
      (item, index, self) =>
        index === self.findIndex((i) => i.path === item.path),
    );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <>
      {/*  TOP NAVBAR */}
      <div className="fixed top-0 left-0 right-0 h-18 bg-white border-b border-gray-200 z-40 md:hidden">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-xl font-bold text-gray-900 flex items-center">
              <img src={logo} alt="logo" className="size-10 rounded-full" />
              Sree<span className="text-brand-600">Pooja</span>
            </h1>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* MOBILE nav background OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="h-full bg-white flex flex-col border-r border-gray-200">
          {/* Sidebar Header */}
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h1 className="font-serif text-xl font-bold text-gray-900 flex items-center">
              <img src={logo} alt="logo" className="size-8 rounded-full" />
              Sree<span className="text-brand-600">Pooja</span>
            </h1>

            {/* Close Button Mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Menu */}
          <div className="flex-1 py-6 px-4 overflow-y-auto scrollbar-modern">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
              Menu
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all
                      ${
                        isActive
                          ? "bg-brand-50 text-brand-700"
                          : "hover:bg-gray-50 hover:text-brand-600 text-gray-600"
                      }`
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 shrink-0" />

                      <span className="font-medium text-sm sm:text-base">
                        {item.name}
                      </span>
                    </div>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Logout */}
          <div className="p-4 flex flex-col justify-center items-center border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full text-sm md:text-md flex items-center justify-center gap-2 p-3 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all cursor-pointer"
            >
              <LogOut className="size-4 md:size-5" />
              Logout
            </button>
            {/* 
            <p className="text-[11px] sm:text-xs text-gray-400 mt-2 text-center">
              © Developed By thincnext
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardNav;
