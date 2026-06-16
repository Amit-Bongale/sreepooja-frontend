import {
  X,
  User,
  Phone,
  MapPin,
  Languages,
  Package,
  Calendar,
  Command,
  Notebook,
  Clock,
  IndianRupee,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../../api/Api";
import { formatDate } from "../../../utils/formatter";

function BookingDetails({ bookingId, setOpenModal }) {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`/admin/bookings/${bookingId}`);
      setData(data);
    };
    fetchData();
  }, [bookingId]);

  return (
    <div className="fixed inset-0 z-60 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[95vh] bg-white rounded-2xl overflow-y-auto ">
        {/* Header */}
        <div className="p-6 border-b border-gray-300 flex flex-wrap justify-between items-center">
          <div>
            <p className="text-gray-500 mt-1">
              #{data?.bookingNumber} - {formatDate(data?.bookedAt)}
            </p>
            <h2 className="text-2xl font-bold mt-1">{data?.serviceName}</h2>

            <div className="flex justify-between border border-brand-300 bg-brand-100 rounded-xl px-3 py-2 items-center mt-1">
              <div className="flex gap-1 text-brand-600">
                <Package className="size-5" />
                Package:
              </div>
              <span className="font-bold text-bold ml-1">
                {data?.packageType}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-end p-2">
              <button
                onClick={() => setOpenModal(null)}
                className="rounded-lg hover:bg-gray-100 hidden md:block"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex gap-1 flex-col items-center bg-orange-100 justify-between border border-brand-400 rounded-xl p-4">
              <div className="flex gap-2 text-brand-700">
                <Calendar size={18} />
                Date & Time
              </div>
              <span className="font-bold">
                {formatDate(data?.preferredDate)} - {data?.preferredTimeSlot}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 grid lg:grid-cols-2 gap-8">
          {/* Customer */}
          <div>
            <h3 className="font-semibold text-gray-400 uppercase text-sm mb-4">
              Customer Details
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <User size={18} className="text-gray-400 mt-1" />
                <div>
                  <p className="font-medium">
                    {data?.customerFirstName} {data?.customerLastName}{" "}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone size={18} className="text-gray-400 mt-1" />
                <p>+91 {data?.mobileNumber}</p>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-gray-400 mt-1 size-4 shrink-0" />
                <p>
                  {data?.address}, {data?.city}, {data?.state} - {data?.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="font-semibold text-gray-400 uppercase text-sm mb-4">
              Pooja Preferance
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between border border-gray-300 bg-gray-200 rounded-xl p-3">
                <div className="flex gap-2">
                  <Languages size={18} />
                  Language
                </div>

                <span className="font-bold">{data?.preferredLanguage}</span>
              </div>

              <div className="flex justify-between border border-gray-300 bg-gray-200 rounded-xl p-3">
                <div className="flex gap-2">
                  <Command size={18} />
                  Community
                </div>
                <span className="font-bold text-black">
                  {data?.preferredCommunity}
                </span>
              </div>

              <div className="flex flex-col justify-between border border-gray-300 bg-gray-200 rounded-xl p-3">
                <div className="flex gap-2 items-center">
                  <Notebook size={18} />
                  Special Instructions
                </div>
                <span className="font-medium text-black">
                  {data?.specialInstructions}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-400 uppercase text-sm mb-4">
                Assignment
              </h3>
              <div className="flex gap-3">
                <Calendar size={18} className="text-gray-400 mt-1" />
                Confirmed Date:{" "}
                <p>
                  {data?.confirmedDate == null
                    ? "Not Confirmed"
                    : formatDate(data?.confirmedDate)}
                </p>
              </div>

              <div className="flex gap-3">
                <Clock size={18} className="text-gray-400 mt-1" />
                Confirmed Time:{" "}
                <p>
                  {data?.confirmedTime == null
                    ? "Not Confirmed"
                    : data?.confirmedTime}
                </p>
              </div>

              <div className="flex gap-3">
                <User size={18} className="text-gray-400 mt-1" />
                Priest:
                <p>
                  {data?.priestName == null
                    ? "Not Confirmed"
                    : data?.priestName}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-400 uppercase text-sm mb-4">
                Payment Summary
              </h3>

              <div className="flex gap-3 text-brand-500">
                Total Amount:
                <p className="flex items-center font-semibold ">
                  <IndianRupee className="size-3.5" />
                  {data?.totalAmount}
                </p>
              </div>

              <div className="flex gap-3">
                Advance Amount:
                <p className="flex items-center ">
                  <IndianRupee className="size-3.5" />
                  {data?.advanceAmount}
                </p>
              </div>

              <div className="flex gap-3">
                Balance Amount:
                <p className="flex items-center ">
                  <IndianRupee className="size-3.5" />
                  {data?.balanceAmount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 p-6 flex justify-between gap-3 flex-wrap ">
          {data?.bookingStatus != "COMPLETED" && (
            <button
              // onClick={onCancelService}
              className="px-5 py-2.5 rounded-xl border border-red-300 text-red-600 hover:bg-red-600 hover:text-white transition-all shrink-0"
            >
              Cancel Service
            </button>
          )}

          <div className="flex gap-2">
            <button
              // onClick={onCancelService}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-800 hover:text-white transition-all flex items-center gap-1 shrink-0"
              onClick={() => setOpenModal(null)}
            >
              <X className="size-4" /> Close
            </button>

            {/* <button
              // onClick={onAssignPriest}
              className="px-5 py-2.5 rounded-xl bg-brand-500 text-white hover:bg-brand-600 flex items-center gap-2 shrink-0"
            >
              <Upload className="size-4" /> Submit
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
