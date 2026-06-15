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
} from "lucide-react";

function StaffBookingDetails({ bookingId, setOpenModal }) {
  return (
    <div className="fixed inset-0 z-60 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[95vh] bg-white rounded-2xl overflow-y-auto ">
        {/* Header */}
        <div className="p-6 border-b border-gray-300 flex flex-wrap justify-between items-center">
          <div>
            <p className="text-gray-500 mt-1">Booking No: #12</p>
            <h2 className="text-2xl font-bold">Service Name</h2>

            <div className="flex justify-between border border-brand-300 bg-brand-100 rounded-xl px-3 py-2 items-center mt-1">
              <div className="flex gap-1 text-brand-600">
                <Package className="size-5" />
                Package:
              </div>
              <span className="font-bold text-bold ml-1"> Premium</span>
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
              <span className="font-bold">12/1/2026 - Morning</span>
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
                  <p className="font-medium">john doe</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone size={18} className="text-gray-400 mt-1" />
                <p>+91 223232322</p>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-gray-400 mt-1 size-4 shrink-0" />
                <p>
                  {" "}
                  asdfasdfaskfdas asdfk afsaudfs ayfgasygfysa fasfhwueygbausfgdu
                  asdfuasfyasugfuyasgf asgfuasyufsu, 23232{" "}
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
              <div className="flex justify-between border border-gray-300 bg-gray-200 rounded-xl p-4">
                <div className="flex gap-2">
                  <Languages size={18} />
                  Language
                </div>

                <span className="font-bold">kannada</span>
              </div>

              <div className="flex justify-between border border-gray-300 bg-gray-200 rounded-xl p-4">
                <div className="flex gap-2">
                  <Command size={18} />
                  Community
                </div>
                <span className="font-bold text-black">Vaishnava</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-6">
          <h3 className="font-semibold text-gray-400 uppercase text-sm mb-4">
            Assignment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmDate">Confirm Date</label>
              <input
                id="confirmDate"
                type="date"
                className="border border-gray-300 p-3 bg-gray-100 rounded-xl w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmDate">Confirm Time</label>
              <input
                id="confirmDate"
                type="time"
                className="border-gray-300 border p-3 bg-gray-100 rounded-xl w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmDate">select priest</label>
              <input
                id="confirmDate"
                type="text"
                className="border-gray-300 p-3 border bg-gray-100 rounded-xl w-full"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 p-6 flex justify-between gap-3 flex-wrap ">
          <button
            // onClick={onCancelService}
            className="px-5 py-2.5 rounded-xl border border-red-300 text-red-600 hover:bg-red-600 hover:text-white transition-all shrink-0"
          >
            Cancel Service
          </button>

          <div className="flex gap-2">
            <button
              // onClick={onCancelService}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-800 hover:text-white transition-all flex items-center gap-1 shrink-0"
              onClick={() => setOpenModal(null)}
            >
              <X className="size-4" /> Close
            </button>

            <button
              // onClick={onAssignPriest}
              className="px-5 py-2.5 rounded-xl bg-brand-500 text-white hover:bg-brand-600 flex items-center gap-2 shrink-0"
            >
              <Upload className="size-4" /> Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffBookingDetails;
