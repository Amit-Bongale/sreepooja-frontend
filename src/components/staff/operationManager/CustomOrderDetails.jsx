import {
  X,
  User,
  Phone,
  MapPin,
  Languages,
  Package,
  Calendar,
  Command,
  Upload,
  Clock,
  MessageCircleQuestionMark,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../../api/Api";
import { formatDate, formatTime } from "../../../utils/formatter";
import { notify } from "../../../Utils/notify";

function CustomOrderDetails({ bookingId, setOpenModal, onSucess }) {
  const [data, setData] = useState({});
  const [minDate, setMinDate] = useState();

  const calculatedAdvance = data.packagePrice
    ? Math.round(
        (parseFloat(data.packagePrice) * parseFloat(data.advancePercentage)) /
          100,
      )
    : 0;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(
        `/admin/bookings/custom-requests/${bookingId}`,
      );
      setData(data);

      const bookingDate = new Date(data?.bookedAt);
      bookingDate.setDate(bookingDate.getDate() + 4);
      const minDate = bookingDate.toISOString().split("T")[0];
      setMinDate(minDate);
    };
    fetchData();
  }, [bookingId]);

  const handleSubmit = async () => {
    let formdata = {
      confirmedDate: data.confirmedDate,
      confirmedTime: data.confirmedTime,
      customDescription: data.customDescription,
      packagePrice: data.packagePrice,
      advancePercentage: data.advancePercentage,
    };

    const baseurl = `admin/bookings/custom/${bookingId}/respond`;

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${baseurl}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(formdata),
    });

    if (!res.ok) {
      const response = await res.json();
      notify(response.message, "error");
      return;
    }

    notify("Custom Order Created Successfully", "success");
    onSucess();
    setOpenModal(false);
  };

  const handleAction = async (action) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/admin/bookings/${bookingId}/${action}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const response = await res.json();
      notify(response.message, "error");
      return;
    }

    if (action == "complete") {
      notify("Custom Order Completed", "success");
    } else {
      notify("Custom Order Cancelled", "success");
    }

    onSucess();
    setOpenModal(false);
  };

  console.log(
    "states",
    !data.confirmedDate,
    !data.confirmedTime,
    !data.packagePrice,
    !data.advancePercentage,
  );
  console.log(typeof data.packagePrice, data.packagePrice);
  console.log(typeof data.advancePercentage, data.advancePercentage);
  console.log("confirmDate:", data.confirmedDate);
  console.log("confirmTime:", data.confirmedTime);
  console.log("data:", data);

  return (
    <div className="fixed inset-0 z-60 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[95vh] bg-white rounded-2xl overflow-y-auto ">
        {/* Header */}
        <div className="p-6 border-b border-gray-300 flex flex-wrap justify-between items-center">
          <div>
            <p className="text-gray-500 mt-1">
              Booking No: #{data?.bookingNumber} - {formatDate(data?.bookedAt)}
            </p>
            <h2 className="text-2xl font-bold">{data?.serviceName}</h2>

            <div className="flex justify-between border border-brand-300 bg-brand-100 rounded-xl px-3 py-2 items-center mt-1">
              <div className="flex gap-1 text-brand-600">
                <Package className="size-5" />
                Package:
              </div>
              <span className="font-bold text-bold ml-1">
                {" "}
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
                Preferd Date & Time
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
              <div className="flex justify-between border border-gray-300 bg-gray-50 rounded-xl p-3">
                <div className="flex gap-2">
                  <Languages size={18} />
                  Language
                </div>

                <span className="font-bold">{data?.preferredLanguage}</span>
              </div>

              <div className="flex justify-between border border-gray-300 bg-gray-50 rounded-xl p-3">
                <div className="flex gap-2">
                  <Command size={18} />
                  Community
                </div>
                <span className="font-bold text-black">
                  {data?.preferredCommunity}
                </span>
              </div>
            </div>
          </div>

          <div className="flex col-span-2 flex-col justify-between border border-gray-300 bg-gray-50 rounded-xl p-3">
            <div className="flex gap-2 items-center">
              <MessageCircleQuestionMark size={18} />
              Requirements
            </div>
            <span className="font-semibold text-black">
              {data?.specialInstructions}{" "}
            </span>
          </div>

          {data?.bookingStatus == "CONFIRMED" && (
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
                    : formatTime(data?.confirmedTime)}
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
          )}
        </div>

        <div className="w-full p-6">
          <h3 className="font-semibold text-gray-400 uppercase text-sm mb-4">
            Assignment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-end">
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmDate">Confirm Date</label>
              <input
                id="confirmDate"
                type="date"
                min={minDate}
                value={data?.confirmedDate}
                onChange={(e) =>
                  setData({ ...data, confirmedDate: e.target.value })
                }
                className="border border-gray-300 p-3 bg-gray-100 rounded-xl w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmDate">Confirm Time</label>
              <input
                id="confirmTime"
                type="time"
                defaultValue={data?.confirmedTime}
                onChange={(e) =>
                  setData({ ...data, confirmedTime: e.target.value })
                }
                className="border-gray-300 border p-3 bg-gray-50 rounded-xl w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmDate">Package Price (₹)</label>
              <input
                id="packagePrice"
                type="number"
                defaultValue={data?.packagePrice}
                onChange={(e) =>
                  setData({ ...data, packagePrice: Number(e.target.value) })
                }
                className="border-gray-300 border p-3 bg-gray-50 rounded-xl w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmDate">Advance Percentage (%)</label>
              <input
                id="advancePercentage"
                type="text"
                value={data?.advancePercentage}
                onChange={(e) =>
                  setData({
                    ...data,
                    advancePercentage: Number(Math.min(e.target.value, 100)),
                  })
                }
                className="border-gray-300 border p-3 bg-gray-50 rounded-xl w-full"
              />
            </div>

            <div className="flex flex-col gap-1 col-span-2 ">
              <label htmlFor="confirmDate">Custom Description</label>
              <textarea
                id="customDescription"
                type="text"
                defaultValue={data?.customDescription}
                onChange={(e) =>
                  setData({ ...data, customDescription: e.target.value })
                }
                className="border-gray-300 border p-3 bg-gray-50 rounded-xl w-full"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">
                To be paid as advance:
              </span>
              <span className="text-lg font-bold text-orange-600">
                ₹ {calculatedAdvance.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">
                Balance post-service:
              </span>
              <span className="text-gray-900 font-medium">
                ₹{" "}
                {(
                  Number(data.packagePrice || 0) - calculatedAdvance
                ).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 flex items-start space-x-3 mt-6">
              <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <p className="text-xs text-orange-800 leading-relaxed">
                Verify the total amount carefully. A Custom order will be
                generated for Customer once this order is created.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`border-t border-gray-300 p-6 flex justify-between gap-3 flex-wrap ${!["COMPLETED", "CANCELLED"].includes(data?.bookingStatus) ? "justify-between" : "justify-end"}`}
        >
          {!["COMPLETED", "CANCELLED"].includes(data?.bookingStatus) && (
            <button
              onClick={() => handleAction("cancel")}
              className="px-5 py-2.5 rounded-xl border border-red-300 text-red-600 hover:bg-red-600 hover:text-white transition-all shrink-0"
            >
              Cancel Service
            </button>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-800 hover:text-white transition-all flex items-center gap-1 shrink-0"
              onClick={() => setOpenModal(null)}
            >
              <X className="size-4" /> Close
            </button>

            <button
              disabled={
                !data?.confirmedDate ||
                !data?.confirmedTime ||
                !data?.packagePrice ||
                !data?.advancePercentage
              }
              onClick={() => handleSubmit()}
              className="px-5 py-2.5 rounded-xl bg-brand-500 text-white hover:bg-brand-600 flex items-center gap-2 shrink-0 disabled:opacity-50"
            >
              <Upload className="size-4" /> Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomOrderDetails;
