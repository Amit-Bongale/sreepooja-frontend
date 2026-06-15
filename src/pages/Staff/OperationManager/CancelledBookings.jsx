import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock,
  MapPin,
  Search,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../../api/Api";

function CancelledBookings() {
  const [selectedService, setSelectedService] = useState(null);
  const [latestBookngs, setLatestBookings] = useState([]);
  const [totalPages, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      const baseurl = `/admin/bookings?bookingStatus=CANCELLED`;
      const queryParams = [];

      if (currentPage) {
        queryParams.push(`page=${currentPage - 1}`);
      }

      if (debouncedSearch) {
        queryParams.push(`mobileNumber=${debouncedSearch}`);
      }

      const finalUrl = `${baseurl}${queryParams.length > 0 ? `&${queryParams.join("&")}` : ""}`;

      const data = await getData(finalUrl);
      setLatestBookings(data?.content);
      setTotalPage(data?.totalPages);
    };
    fetchData();
  }, [currentPage, debouncedSearch]);

  return (
    <div className="text-gray-800 antialiased min-h-screen bg-gray-50">
      <header className="h-18 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 mt-18 md:mt-0 shrink-0">
        <h1 className="text-xl font-serif font-bold text-gray-900 hidden md:block">
          Cancelled Bookings
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter user Mobile No..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
            />
          </div>
        </div>
      </header>

      <main className="p-4">
        {latestBookngs?.length > 0 ? (
          <div className="space-y-3">
            {latestBookngs.map((booking) => (
              <div
                key={booking?.bookingId}
                className={`bg-white border ${selectedService == booking?.bookingId ? "border-brand-500" : "border-gray-200"} rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Left Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-gray-500">
                        {booking?.bookingNumber}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-medium">
                        {booking?.packageType}
                      </span>
                    </div>

                    {/* Pooja Name */}
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {booking?.serviceName}
                    </h2>

                    {/* Details */}
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="size-4 shrink-0" />
                          <span>{booking?.poojaDate}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="size-4 shrink-0" />
                          <span>{booking?.timing}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="size-4 shrink-0" />
                          <span>
                            {booking?.customerFirstName}{" "}
                            {booking?.customerLastName}
                          </span>
                        </div>

                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPin className="size-4 mt-0.5 shrink-0" />
                          <span className="line-clamp-2">
                            {booking?.city}, {booking?.state}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 text-xs font-medium">
                      <CircleAlert className="size-3" />
                      Unassigned
                    </span>

                    <button
                      onClick={() => setSelectedService(booking?.bookingId)}
                      className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

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
          <div className="flex flex-col h-[80vh] items-center justify-center gap-2">
            <Calendar className="size-12 text-brand-400" />
            <h3 className="text-xl text-gray-500"> No Bookings Found </h3>
          </div>
        )}
      </main>
    </div>
  );
}

export default CancelledBookings