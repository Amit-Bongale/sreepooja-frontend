import {
  Users,
  CalendarCheck,
  IndianRupee,
  UserCog,
  Clock,
  Flame,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../api/Api";
import { StatCard } from "../../components/super_admin/StatCard";
import ExportReport from "../../components/super_admin/ExportReport";

function SuperAdminDashboard() {
  const [dashboardData, setDashboardData] = useState();
  const [isReportModalOpen, setIsReportModalOpen] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("/admin/dashboard");
      setDashboardData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-xl font-bold text-gray-900 lg:hidden mt-18 mb-4">
            Overview
          </h2>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Metrics */}
            <StatCard
              title="Total Revenue"
              value={dashboardData?.totalRevenue}
              icon={IndianRupee}
              colorClass="text-emerald-600"
              bgClass="bg-emerald-100"
              isCurrency={true}
              // trend="12.5"
              // trendUp={true}
            />

            <StatCard
              title="Total Bookings"
              value={dashboardData?.totalBookings}
              icon={CalendarCheck}
              colorClass="text-blue-600"
              bgClass="bg-blue-100"
              // trend="8.2"
              // trendUp={true}
            />

            <StatCard
              title="Active Bookings"
              value={dashboardData?.pendingBookings}
              icon={Clock}
              colorClass="text-amber-600"
              bgClass="bg-amber-100"
              // trend="2.4"
              // trendUp={false}
            />

            {/* Secondary Metrics */}
            <StatCard
              title="Total Users"
              value={dashboardData?.totalCustomers}
              icon={Users}
              colorClass="text-indigo-600"
              bgClass="bg-indigo-100"
            />

            <StatCard
              title="Registered Priests"
              value={dashboardData?.totalPriests}
              icon={Flame}
              colorClass="text-orange-600"
              bgClass="bg-orange-100"
            />

            <StatCard
              title="Total Staff"
              value={dashboardData?.totalStaff}
              icon={UserCog}
              colorClass="text-slate-600"
              bgClass="bg-slate-100"
            />
          </div>
        </div>

        <button
          className="bg-brand-500 py-2 px-4 rounded-2xl text-white mt-6"
          onClick={() => setIsReportModalOpen(true)}
        >
          Download Report
        </button>

        {isReportModalOpen && (
          <ExportReport onClose={() => setIsReportModalOpen(false)} />
        )}
      </main>
    </div>
  );
}

export default SuperAdminDashboard;
