// import logo from "../assets/logo.jpg";
import DashboardNav from "../components/DashboardNav";
import { Outlet } from "react-router";

function Dashboard() {
  return (
      <div className="flex">
      <DashboardNav />
      <div className="md:ml-64 flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard