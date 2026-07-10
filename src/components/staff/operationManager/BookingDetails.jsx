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
  Notebook,
  IndianRupee,
  Clock,
  Check,
  List,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../../api/Api";
import PriestSelectionModal from "./PriestSelectionModal";
import { formatDate, formatTime } from "../../../utils/formatter";
import { notify } from "../../../Utils/notify";

function BookingDetails({ bookingId, setOpenModal, onSucess }) {
  const [data, setData] = useState();
  const [openPriestModal, setOpenPriestModal] = useState(false);
  const [selectedPriest, setSelectedPriest] = useState();
  const [confirmDate, setConfirmDate] = useState();
  const [confirmTime, setConfirmTime] = useState();
  const [minDate, setMinDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`/admin/bookings/${bookingId}`);
      setData(data);

      const bookingDate = new Date(data?.bookedAt);
      bookingDate.setDate(bookingDate.getDate() + 4);
      const minDate = bookingDate.toISOString().split("T")[0];
      setMinDate(minDate);
    };
    fetchData();
  }, [bookingId]);

  const handleSubmit = async () => {
    let data = {
      confirmedDate: confirmDate,
      confirmedTime: confirmTime,
      priestId: selectedPriest?.priestId,
    };

    const baseurl =
      data?.bookingstatus == "CONFIRMED"
        ? `admin/bookings/${bookingId}/reassign`
        : `admin/bookings/${bookingId}/confirm`;

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${baseurl}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const response = await res.json();
      notify(response.message, "error");
      return;
    }

    notify("Priest Assigned Successfully", "success");
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
      notify("Booking Completed", "success");
    } else {
      notify("Booking Cancelled", "success");
    }

    onSucess();
    setOpenModal(false);
  };

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
        <div className="p-6 grid lg:grid-cols-2 gap-4">
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

                <span className="font-bold">
                  {data?.preferredLanguage ? data?.preferredLanguage : "-"}
                </span>
              </div>

              <div className="flex justify-between border border-gray-300 bg-gray-50 rounded-xl p-3">
                <div className="flex gap-2">
                  <Command size={18} />
                  Community
                </div>
                <span className="font-bold text-black">
                  {data?.preferredCommunity ? data?.preferredCommunity : "-"}
                </span>
              </div>
            </div>
          </div>

          {/* special instruction */}
          {data?.specialInstructions && (
            <div className="flex flex-col col-span-2 justify-between border border-gray-300 bg-gray-50 rounded-xl p-3">
              <div className="flex gap-2 items-center">
                <Notebook size={18} />
                Special Instructions
              </div>
              <span className="font-semibold text-black">
                {data?.specialInstructions}
              </span>
            </div>
          )}

          {data?.customDescription && (
            <div className="flex flex-col col-span-2 justify-between border border-gray-300 bg-gray-50 rounded-xl p-3">
              <div className="flex gap-2 items-center">
                <List size={18} />
                Custom Description
              </div>
              <span className="font-semibold text-black">
                {data?.customDescription}
              </span>
            </div>
          )}

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

            {data?.advanceAmount && (
              <>
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
              </>
            )}
          </div>
        </div>

        {!["COMPLETED", "CANCELLED"].includes(data?.bookingStatus) && (
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
                  defaultValue={data?.confirmedDate}
                  onChange={(e) => setConfirmDate(e.target.value)}
                  className="border border-gray-300 p-3 bg-gray-100 rounded-xl w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="confirmDate">Confirm Time</label>
                <input
                  id="confirmTime"
                  type="time"
                  defaultValue={data?.confirmedTime}
                  onChange={(e) => setConfirmTime(e.target.value)}
                  className="border-gray-300 border p-3 bg-gray-100 rounded-xl w-full"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-400 uppercase text-sm mb-1">
                Priest Details
              </h3>

              <div className="flex md:flex-row flex-col justify-between gap-2">
                <div className="flex flex-col gap-1 items-center">
                  {selectedPriest && (
                    <div>
                      <p className="flex gap-2 items-center">
                        Name: {selectedPriest?.firstName}{" "}
                        {selectedPriest?.lastName}
                        <span className="bg-brand-100 px-2 rounded-xl text-sm text-brand-600">
                          {" "}
                          {selectedPriest?.communityName}
                        </span>
                      </p>
                      <p>Mobile Number: {selectedPriest?.mobileNumber}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setOpenPriestModal(true)}
                  className="border border-brand-500 px-4 py-2 rounded-xl text-brand-500"
                >
                  {selectedPriest ? "Change Priest" : "Choose priest"}
                </button>
              </div>
            </div>
          </div>
        )}

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
              disabled={!selectedPriest}
              onClick={() => handleSubmit()}
              className="px-5 py-2.5 rounded-xl bg-brand-500 text-white hover:bg-brand-600 flex items-center gap-2 shrink-0 disabled:opacity-50"
            >
              <Upload className="size-4" /> Submit
            </button>

            {data?.bookingStatus == "CONFIRMED" &&
              data?.paymentStatus == "PAID" && (
                <button
                  onClick={() => handleAction("complete")}
                  className="px-5 py-2.5 rounded-xl bg-green-500 text-white hover:bg-green-600 flex items-center gap-2 shrink-0 disabled:opacity-50"
                >
                  <Check className="size-4" /> Mark as Complete
                </button>
              )}
          </div>
        </div>
      </div>

      {openPriestModal && (
        <PriestSelectionModal
          onClose={() => setOpenPriestModal(false)}
          onSelect={(priest) => {
            setSelectedPriest(priest);
            setOpenPriestModal(false);
          }}
        />
      )}
    </div>
  );
}

export default BookingDetails;
