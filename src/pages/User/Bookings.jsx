import {
  User,
  IndianRupee,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../api/Api";
import { Link } from "react-router";
import { PayPendingBalance } from "../../utils/Payment";

function Bookings() {
  const [BOOKINGS, setBookings] = useState([]);
  const [toalpages, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [success, setSucess] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getData(
        `/bookings/my-bookings?page=${currentPage - 1}`,
      );
      setBookings(data?.content);
      setTotalPage(data?.totalPages);
    };
    fetchBookings();
  }, [currentPage , reload]);

  const formatDate = (dateString) => {
    if (!dateString) return "Not confirmed yet";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handlePayment = async (id) => {
    try {
      await PayPendingBalance(id);
      setSucess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Completed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white  overflow-hidden">
      <div className="p-4 mt-16 mb-4 md:mb-0 md:mt-0 sm:px-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 h-18">
        <h3 className="text-lg font-bold text-gray-900">All Bookings</h3>
        <div className="flex p-1 rounded-lg gap-2 md:gap-4">
          {/* <div className="relative w-full flex-1">
            <Search className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-800" />
            <input
              type="text"
              placeholder="Search for Bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl text-sm transition-all outline-none"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-3 text-sm text-gray-800 font-medium focus:outline-none cursor-pointer bg-gray-100 rounded-xl"
          >
            <option value="All">All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Past">Past</option>
          </select> */}
        </div>
      </div>

      {BOOKINGS.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {BOOKINGS?.map((booking) => (
            <div
              key={booking?.bookingId}
              className="p-5 sm:px-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col md:flex-row gap-5">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${booking?.thumbnailImage}`}
                  alt={booking?.serviceName}
                  className="w-full md:w-32 h-40 md:h-28 object-cover rounded-xl border border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-bold text-gray-500 mb-1 block">
                        Booking ID: {booking?.bookingNumber}
                      </span>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {booking?.serviceName}
                      </h4>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.bookingStatus)}`}
                    >
                      {booking?.bookingStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Date & Time</p>
                        <p className="font-medium text-gray-800">
                          {formatDate(booking?.poojaDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Assigned Priest</p>
                        <p className="font-medium text-gray-800">
                          {booking?.priestName
                            ? booking?.priestName
                            : "not yet Assigned"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="truncate pr-2">
                        <p className="text-xs text-gray-400">Location</p>
                        <p
                          className="font-medium text-gray-800 truncate"
                          title={booking?.address}
                        >
                          {booking?.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100 gap-4">
                    <div className="flex gap-8">
                      <div>
                        <span className="text-xs text-gray-500 block">
                          Total Amount
                        </span>
                        <span className="font-bold text-gray-900 flex items-center text-lg">
                          <IndianRupee className="h-4 w-4" />{" "}
                          {booking?.totalAmount}
                        </span>
                      </div>

                      {booking.paymentStatus === "PARTIALLY_PAID" && (
                        <div>
                          <span className="text-xs text-gray-500 block">
                            Remaing Amount
                          </span>
                          <span className="font-bold text-gray-900 flex items-center text-lg">
                            <IndianRupee className="h-4 w-4" />{" "}
                            {booking?.balanceAmount}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/user/bookings/${booking?.bookingId}`}>
                        <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-color">
                          View Details
                        </button>{" "}
                      </Link>
                      {booking.paymentStatus === "PARTIALLY_PAID" && (
                        <button
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors flex items-center gap-1"
                          onClick={() => handlePayment(booking?.bookingId)}
                        >
                          <IndianRupee className="h-4 w-4" /> Pay Remaining
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div>
            {toalpages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 0}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {[...Array(toalpages )].map((_, i) => (
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
                    setCurrentPage((p) => Math.min(toalpages, p + 1))
                  }
                  disabled={currentPage === toalpages - 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-screen gap-4 flex flex-col justify-center items-center">
          <Calendar className="size-24 text-brand-500" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Bookings found
          </h3>
          <button className="px-4 py-2 flex bg-brand-500 text-white rounded-lg">
            Book a Service
          </button>
        </div>
      )}


      {success && (
        <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => {
                setSucess(false);
                setReload(!reload);
              }}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle
                  size={64}
                  className="text-green-600"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Title */}
            <h2 className="mt-5 text-center text-2xl font-bold text-gray-900">
              Payment Successful
            </h2>

            <p className="mt-2 text-center text-gray-500">
              Your booking has been confirmed successfully.
            </p> 

            {/* Buttons */}
            <div className="mt-6 space-y-3">
              <button
                className="w-full rounded-xl bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600"
                onClick={() => {
                  setSucess(false);
                  setReload(!reload);
                }}
              >
                View Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;
