/* eslint-disable no-unused-vars */
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit,
  Mail,
  Phone,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../api/Api";
import { formatDate } from "../../utils/formatter";
import { notify } from "../../utils/notify";
import AddStaff from "../../components/super_admin/AddStaff";
import { getStatusBadge } from "../../utils/getStatusBadge";

function ManageStaff() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setmode] = useState("add");
  const [totalPages, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedstaff, setSelectedstaff] = useState(null);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedRole, setselectedRole] = useState();

  const [staff, setStaff] = useState([]);

  const AVAILABLE_ROLES = [
    {
      label: "Operation Manger",
      value: "OPERATIONS_MANAGER",
    },
    {
      label: "Accounts Manger",
      value: "ACCOUNTS_MANAGER",
    },
    {
      label: "Customer Service Excecutive",
      value: "CUSTOMER_SERVICE_EXECUTIVE",
    },
    {
      label: " Admin",
      value: "ADMIN",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchData = async () => {
    const baseurl = `/admin/staff`;
    const queryParams = [];

    if (debouncedSearch) {
      queryParams.push(`search=${debouncedSearch}`);
    }

    if (currentPage) {
      queryParams.push(`page=${currentPage - 1}`);
    }

    if (selectedRole) {
      queryParams.push(`role=${selectedRole}`);
    }

    if (selectedStatus) {
      queryParams.push(`status=${selectedStatus}`);
    }

    const finalUrl = `${baseurl}${queryParams.length > 0 ? `?${queryParams.join("&")}` : ""}`;

    const data = await getData(finalUrl);

    setStaff(data?.content);
    setTotalPage(data?.totalPages);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, currentPage, selectedRole, selectedStatus]);

  const formatRole = (role) => {
    return role
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  const clearFilter = () => {
    setShowFilters(false);
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedstaff(null);
    setCurrentPage(1);
    selectedRole("");
  };

  return (
    <div className="text-gray-800 antialiased min-h-screen bg-gray-50">
      <header className="h-18 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 mt-18 md:mt-0 shrink-0">
        <h1 className="text-xl font-serif font-bold text-gray-900 hidden md:block">
          Manage Staff
        </h1>

        <div className="flex gap-3 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search communities..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
              placeholder="Search by name..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
            />
          </div>

          <div>
            <select
              name="role"
              id="role"
              onChange={(e) => setselectedRole(e.target.value)}
              className="border border-gray-200 py-1.5 px-1 rounded-lg"
            >
              <option value="">All</option>
              {AVAILABLE_ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              setIsModalOpen(true);
              setmode("add");
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" /> Add Staff
          </button>
        </div>
      </header>

      <main>
        {staff?.length > 0 ? (
          <div className="p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Contact Info</th>
                      <th className="px-6 py-4">Roles</th>
                      <th className="px-6 py-4">status</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {staff.map((staff) => (
                      <tr
                        key={staff?.id}
                        className="hover:bg-orange-50/30 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-sm">
                              {staff?.firstName[0]}
                              {staff?.lastName[0]}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">
                                {staff?.firstName} {staff?.lastName}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center mt-0.5">
                                <Calendar className="w-3 h-3 mr-1" />{" "}
                                {formatDate(staff?.dob)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-y-1">
                          <div className="flex items-center text-gray-700">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />{" "}
                            {staff?.email}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />{" "}
                            {staff?.mobileNo}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {staff?.roles.map((role) => (
                              <span
                                key={role}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 whitespace-nowrap"
                              >
                                {formatRole(role)}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(staff?.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => {
                                setIsModalOpen(true);
                                setmode("edit");
                                setSelectedstaff(staff);
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip-trigger relative group"
                              title="Edit Staff"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* --- PAGINATION --- */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 0}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                      currentPage === i + 1
                        ? "bg-orange-600 text-white shadow-md"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-orange-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center min-h-[70vh] justify-center gap-2 py-10">
            <Users className="size-18 text-brand-500" />
            <h2 className="text-lg font-bold text-gray-900">No Staff Found</h2>
            <p className="text-gray-500 text-center">
              Try adjusting your search or add new Staff.
            </p>

            <div className=" md:flex gap-4 flex-wrap">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setmode("add");
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0 mt-2"
              >
                <Plus className="h-4 w-4" /> Add Staff
              </button>

              <button
                onClick={() => clearFilter()}
                className="border border-orange-600 hover:bg-orange-100 text-brand-500 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0 mt-2"
              >
                <X className="h-4 w-4" /> Clear Filter
              </button>
            </div>
          </div>
        )}
      </main>

      {isModalOpen && (
        <AddStaff
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            mode == "add"
              ? notify("Staff Added Successfully", "success")
              : notify("Staff Details Updated", "success");
            setIsModalOpen(false);
            fetchData();
          }}
          mode={mode}
          initialData={selectedstaff}
        />
      )}
    </div>
  );
}

export default ManageStaff;
