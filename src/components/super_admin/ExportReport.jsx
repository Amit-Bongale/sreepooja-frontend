import { useState } from "react";

const REPORT_TYPES = ["BOOKINGS", "PAYMENTS", "STAFF", "PRIESTS"];

const EXPORT_FORMATS = ["PDF", "EXCEL"];

const BOOKING_STATUSES = [
  "PENDING_PAYMENT",
  "PAYMENT_RECEIVED",
  "CONFIRMED",
  "PRIEST_ASSIGNED",
  "COMPLETED",
  "CANCELLED",
  "CUSTOM_REQUEST",
  "CUSTOM_RESPONSE",
];

const PAYMENT_STATUSES = [
  "PENDING",
  "PARTIALLY_PAID",
  "PAID",
  "FAILED",
  "REFUNDED",
];

const ExportReport = ({ onClose }) => {
  const [loding, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "BOOKINGS",
    format: "PDF",
    bookingId: "",
    mobileNumber: "",
    bookingStatus: "",
    paymentStatus: "",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await exportReport(formData);
    } catch (err) {
      console.error(err);
    }

    onClose();
  };

  const exportReport = async (payload) => {
    setLoading(true);
    try {
      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(
          // eslint-disable-next-line no-unused-vars
          ([_, value]) => value !== "" && value !== null && value !== undefined,
        ),
      );

      const queryParams = new URLSearchParams(filteredPayload).toString();

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/reports/export?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"), // if required
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to export report.");
      }

      const blob = await response.blob();

      // Extract filename from Content-Disposition header
      let fileName = "report";

      const disposition = response.headers.get("Content-Disposition");
      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match?.[1]) {
          fileName = match[1];
        }
      }

      // Download the file
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-400 px-6 py-4">
          <h2 className="text-xl font-semibold">Export Report</h2>

          <button
            onClick={onClose}
            className="text-2xl leading-none text-gray-500 hover:text-red-600"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Report Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5"
              >
                {REPORT_TYPES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Export Format
              </label>
              <select
                name="format"
                value={formData.format}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5"
              >
                {EXPORT_FORMATS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Booking ID
              </label>
              <input
                type="number"
                name="bookingId"
                value={formData.bookingId}
                onChange={handleChange}
                placeholder="Booking ID"
                className="w-full rounded-lg border border-gray-300 p-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full rounded-lg border border-gray-300 p-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Booking Status
              </label>
              <select
                name="bookingStatus"
                value={formData.bookingStatus}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5"
              >
                <option value="">All</option>

                {BOOKING_STATUSES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Payment Status
              </label>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5"
              >
                <option value="">All</option>

                {PAYMENT_STATUSES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                From Date
              </label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">To Date</label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-400 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2.5 border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loding}
              className="rounded-lg bg-orange-600 px-5 py-2.5 text-white hover:bg-orange-700"
            >
              Export
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExportReport;
