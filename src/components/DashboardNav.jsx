import { useEffect } from "react";
import {
  FileText,
  LogOut,
  User,
  CalendarCheck,
  Users2,
  LayoutDashboard,
  MessageCircleQuestionMark,
  CalendarDays,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../Redux/Reducer";
import logo from "../assets/logo.jpg";

function DashboardNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const roleMenus = {
    USER: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/account" },
      { name: "My Bookings", icon: CalendarDays, path: "/bookings" },
      { name: "Queries", icon: MessageCircleQuestionMark, path: "/user/queries" },
      { name: "Profile Details", icon: User, path: "/user/profile" },

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
    <div className="fixed inset-y-0 left-0 w-64">
      <div className="h-full bg-white flex flex-col border-r border-gray-200">
        {/* Header */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="SreePooja" className="size-10 rounded-full" />
            <div>
              <span class="font-serif font-bold text-2xl tracking-tight text-gray-900">
                Sree<span class="text-brand-600">Pooja</span>
              </span>
            </div>
          </div>
        </div>

        {/* Menu */}

        <div className="flex-1 py-6 px-4 overflow-y-auto scrollbar-modern">
          <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
            Menu
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all
                    ${isActive ? "bg-brand-50 text-brand-700" : "hover:bg-gray-50 hover:text-brand-600 text-gray-600"}`
                  }
                >
                  <div className="flex items-center space-x-3 ">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 flex flex-col justify-center items-center ">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>

          <p className="text-xs text-gray-400 mt-2">© Developed By thincnext</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardNav;
