import {
  Calendar,
  Clock,
  MapPin,
  IndianRupee,
  FileText,
  AlertCircle,
  CheckCircle2,
  Languages,
  Star,
  User,
  CheckCircle,
  X,
  Info,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../api/Api";
import { useParams } from "react-router";
import { PayPendingBalance } from "../../utils/Payment";

const BookingDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [success, setSucess] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`/bookings/${id}`);
      setData(data);
    };
    fetchData();
  }, [id, reload]);

  const handlePayment = async () => {
    try {
      await PayPendingBalance(id);
      setSucess(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Helper functions for formatting
  const formatDate = (dateString) => {
    if (!dateString) return "Not confirmed yet";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING_PAYMENT":
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "CONFIRMED":
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      <div className="p-4 bg-white mt-16 mb-4 md:mb-0 md:mt-0 sm:px-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 h-18">
        <h3 className="text-lg font-bold text-gray-900">Booking Details</h3>
      </div>
      <div className="max-w-4xl mx-auto space-y-6 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {data?.serviceName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Booking ID: {data?.bookingNumber}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Booking Date: {formatDate(data?.bookedAt)}
            </p>
          </div>
          <div
            className={`px-4 py-2 rounded-full border text-sm font-semibold flex items-center gap-2 ${getStatusColor(data?.bookingStatus)}`}
          >
            {data?.bookingStatus === "PENDING_PAYMENT" ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            {data?.bookingStatus?.replace("_", " ")}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details - Left Column (Takes 2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pooja Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                Booking Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4" /> Preferred Date
                  </p>
                  <p className="font-medium text-gray-900">
                    {formatDate(data?.preferredDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" /> Time Slot
                  </p>
                  <p className="font-medium text-gray-900 capitalize">
                    {data?.preferredTimeSlot?.toLowerCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4" /> Package Type
                  </p>
                  <p className="font-medium text-gray-900 capitalize">
                    {data?.packageType?.toLowerCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                    <Languages className="w-4 h-4" /> Language
                  </p>
                  <p className="font-medium text-gray-900 capitalize">
                    {data?.preferredLanguage?.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                Service Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4" /> Confirmed Date
                  </p>
                  <p className="font-medium text-gray-900">
                    {formatDate(data?.confirmedDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" /> Time
                  </p>
                  <p className="font-medium text-gray-900 capitalize">
                    {data?.confirmedTime ? data?.confirmedTime : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                    <User className="w-4 h-4" /> Priest Name
                  </p>
                  <p className="font-medium text-gray-900 capitalize">
                    {data?.priestName ? data?.priestName : "Not yet Assigned"}
                  </p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Location
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-800 font-medium">{data?.address}</p>
                <p className="text-gray-600 mt-1">
                  {data?.city}, {data?.state} - {data?.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Summary - Right Column (Takes 1/3 width) */}
          <div className="space-y-6">
            {/* Payment Summary Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-orange-500" />
                Payment Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Package Price</span>
                  <span>{formatCurrency(data?.packagePrice)}</span>
                </div>
                {data?.taxAmount > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span>{formatCurrency(data?.taxAmount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between font-semibold text-gray-900 text-base">
                    <span>Total Amount</span>
                    <span>{formatCurrency(data?.totalAmount)}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 bg-orange-50/50 rounded-lg p-4 border border-orange-100">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">
                      Advance ({data?.advancePercentage}%)
                    </span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(data?.advanceAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Balance</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(data?.balanceAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="mt-6">
                {data?.showPayBalanceButton && (
                  <div>
                    <button
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 mt-3"
                      onClick={handlePayment}
                    >
                      Pay Balance Amount
                    </button>

                    {data?.confirmedDate && (
                      <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-blue-100 flex gap-3 text-sm text-orange-800">
                        <Info className="h-5 w-5 shrink-0 mt-0.5" />
                        <p>
                          pay before atleast 3 days of{" "}
                          {formatDate(data?.confirmedDate)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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

            {/* Details Card */}
            <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Booking ID</span>
                <span className="font-medium">{data?.bookingId}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-500">Status</span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Paid
                </span>
              </div>
            </div>

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
};

export default BookingDetails;
