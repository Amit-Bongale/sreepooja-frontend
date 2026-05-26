import { useEffect } from "react";
import {
  FileText,
  LogOut,
  ChevronRight,
  User,
  BarChart3,
  Users2,
} from "lucide-react";
import { NavLink, useNavigate, Link } from "react-router";
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
      { name: "Dashboard", icon: BarChart3, path: "/user/dashboard" },
      { name: "profile", icon: FileText, path: "/user/profile" },
    ],

    STAFF: [
      {
        name: "bookings",
        icon: FileText,
        path: "/staff/bookings",
      },
    ],

    ADMIN: [
      {
        name: " dashboard",
        icon: FileText,
        path: "/admin/dashboard",
      },
    ],

    SUPER_ADMIN: [
      {
        name: "Dashboard",
        icon: BarChart3,
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
    <div className="fixed inset-y-0 left-0 w-72">
      <div className="h-full bg-linear-to-b from-blue-950 via-blue-900 to-blue-950 text-white flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="KFCC" className="size-14 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">Sree Pooja</h1>
              {/* <p className="text-xs text-blue-200">Karnataka Film Chamber</p> */}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-blue-800">
          <Link to={"/user/account"}>
            <div className="flex items-center space-x-3">
              <div className="w-14 h-10 bg-blue-700 rounded-full flex items-center justify-center cursor-pointer">
                <User className="w-5 h-5" />
              </div>
              <div>
                {user && (
                  <>
                    <p className="font-medium">Welcome {user?.name}</p>
                    <p className="text-xs text-blue-200 capitalize">
                      {/* {user?.roles?.filter(role => role !== "USER").join(", ")} */}
                      {user?.roles?.length === 1 && user.roles[0] === "USER"
                        ? "USER"
                        : user?.roles
                            ?.filter((role) => role !== "USER")
                            .join(", ")}
                    </p>
                  </>
                )}
              </div>
            </div>
          </Link>
        </div>

        {/* Menu */}

        <div className="flex-1 p-6 overflow-y-auto scrollbar-modern">
          <p className="text-xs font-semibold text-blue-300 uppercase mb-4">
            Main Menu
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center justify-between p-4 rounded-xl transition-all
                    ${isActive ? "bg-blue-800" : "hover:bg-blue-900"}`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-blue-300 group-hover:text-white" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 flex flex-col justify-center items-center ">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl hover:bg-red-600 transition-all cursor-pointer"
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
