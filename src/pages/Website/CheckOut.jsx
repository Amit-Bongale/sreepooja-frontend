import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  IndianRupee,
  ShieldCheck,
  Check,
  CreditCard,
  Plus,
  Info,
  ChevronDown,
} from "lucide-react";
import {startPayment} from "../../utils/Payment";

// --- DUMMY DATA FOR CHECKOUT ---
const BOOKING_SUMMARY = {
  title: "Aksharabhyasam Ceremony",
  package: "Platinum Package",
  packageDesc: "Priest + Complete Samagri",
  image:
    "https://newsmantra.in/wp-content/uploads/2024/10/EuroKids-Aksharabhyasam-celebrations_01.jpeg",
  basePrice: 4500,
  taxes: 225, // 5% simulated tax
  advancePercentage: 40, // 40% advance required to book
};

const SAVED_ADDRESSES = [
  {
    id: "addr_1",
    label: "Home",
    name: "Rahul Sharma",
    street: "Apt 4B, Shanti Nilayam, 4th Cross, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    phone: "+91 98765 43210",
  },
];

export default function CheckOut() {
  // --- STATE ---
  const [selectedAddressId, setSelectedAddressId] = useState("addr_1");
  const [isBillingSame, setIsBillingSame] = useState(true);
  const [paymentMode, setPaymentMode] = useState("advance");

  // Form state
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "Morning (08:00 AM - 11:00 AM)",
    notes: "",
    gotra: "",
    nakshatra: "",
  });

  // Calculations
  const totalAmount = BOOKING_SUMMARY.basePrice + BOOKING_SUMMARY.taxes;
  const advanceAmount = (totalAmount * BOOKING_SUMMARY.advancePercentage) / 100;

  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50 flex flex-col">
      {/* --- SIMPLIFIED CHECKOUT HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <a href="/" className="flex items-center gap-2">
              <span className="font-serif font-bold text-2xl tracking-tight text-gray-900">
                Sree<span className="text-orange-600">Pooja</span>
              </span>
            </a>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span className="hidden sm:inline">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
            Complete Your Booking
          </h1>
          <p className="text-gray-500 mt-1">
            Please provide the details below to confirm your pooja.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 1: Date & Time Preferences */}
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  1
                </span>
                Pooja Date & Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time Slot <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none appearance-none cursor-pointer">
                      <option>Morning (06:00 AM - 09:00 AM)</option>
                      <option>Mid-Morning (09:00 AM - 12:00 PM)</option>
                      <option>Afternoon (12:00 PM - 04:00 PM)</option>
                      <option>Evening (04:00 PM - 07:00 PM)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100 flex gap-3 text-sm text-blue-800">
                <Info className="h-5 w-5 shrink-0 mt-0.5" />
                <p>
                  The exact auspicious timing (Muhurtham) will be finalized
                  after consulting with the assigned priest.
                </p>
              </div>
            </section>

            {/* Section 2: Personal Details & Sankalpam Info */}
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  2
                </span>
                Devotee Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      defaultValue="Rahul Sharma"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      defaultValue="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* extra cutomer Fields here if required */}
              
            </section>

            {/* Section 3: Location */}
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  3
                </span>
                Pooja Location
              </h2>

              {/* Saved Addresses (Simulated backend fetch) */}
              <div className="space-y-3 mb-5">
                {SAVED_ADDRESSES.map((addr) => (
                  <label
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`
                                            flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                                            ${
                                              selectedAddressId === addr.id
                                                ? "border-orange-500 bg-orange-50/30 shadow-sm"
                                                : "border-gray-200 hover:border-orange-200 bg-white"
                                            }
                                        `}
                  >
                    <div className="pt-1">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedAddressId === addr.id ? "border-orange-500" : "border-gray-300"}`}
                      >
                        {selectedAddressId === addr.id && (
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">
                          {addr.name}
                        </span>
                        <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {addr.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-1">
                        {addr.street}, {addr.city}, {addr.state} -{" "}
                        {addr.pincode}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {addr.phone}
                      </p>
                    </div>
                  </label>
                ))}

                {/* Add New Address Option */}
                <label
                  onClick={() => setSelectedAddressId("new")}
                  className={`
                                        flex items-center gap-3 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
                                        ${
                                          selectedAddressId === "new"
                                            ? "border-orange-500 bg-orange-50/30"
                                            : "border-gray-300 hover:border-orange-300 bg-white text-gray-600"
                                        }
                                    `}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedAddressId === "new" ? "border-orange-500" : "border-gray-300"}`}
                  >
                    {selectedAddressId === "new" && (
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    )}
                  </div>
                  <Plus className="h-5 w-5" />
                  <span className="font-bold">Add New Location</span>
                </label>
              </div>

              {/* New Address Form (Expands if 'new' is selected) */}
              {selectedAddressId === "new" && (
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mt-4 animate-in fade-in slide-in-from-top-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Street Address
                      </label>
                      <textarea
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none resize-none"
                        rows="2"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Address Checkbox */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input
                      type="checkbox"
                      checked={isBillingSame}
                      onChange={() => setIsBillingSame(!isBillingSame)}
                      className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-orange-500 checked:bg-orange-500 checked:border-orange-500 transition-all cursor-pointer"
                    />
                    <Check
                      className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 select-none group-hover:text-gray-900">
                    My billing address is the same as the Pooja location
                  </span>
                </label>
              </div>
            </section>

            {/* Section 4: Special Instructions */}
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                Special Requests / Notes
              </h2>
              <textarea
                placeholder="Any specific requirements for the priest, directions to your home, or questions..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none resize-none"
                rows="3"
              ></textarea>
            </section>
          </div>

          {/* RIGHT COLUMN: Order Summary (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Order Summary
                </h3>

                {/* Item Details */}
                <div className="flex gap-4">
                  <img
                    src={BOOKING_SUMMARY.image}
                    alt={BOOKING_SUMMARY.title}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 line-clamp-1">
                      {BOOKING_SUMMARY.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {BOOKING_SUMMARY.package}
                    </p>
                    <span className="inline-block mt-1 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {BOOKING_SUMMARY.packageDesc}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Base Package Price</span>
                  <span className="font-medium text-gray-900 flex items-center">
                    <IndianRupee className="h-3.5 w-3.5" />{" "}
                    {BOOKING_SUMMARY.basePrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Taxes & Fees (5%)</span>
                  <span className="font-medium text-gray-900 flex items-center">
                    <IndianRupee className="h-3.5 w-3.5" />{" "}
                    {BOOKING_SUMMARY.taxes}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 my-3 pt-3"></div>

                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="text-lg font-bold text-gray-900 flex items-center">
                    <IndianRupee className="h-4 w-4" /> {totalAmount}
                  </span>
                </div>
              </div>

              {/* Payment Options Selection */}
              <div className="px-6 pb-2 space-y-3">
                <label
                  onClick={() => setPaymentMode("advance")}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMode === "advance" ? "border-orange-500 bg-orange-50/50" : "border-gray-200 hover:border-orange-200"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMode === "advance" ? "border-orange-500" : "border-gray-300"}`}
                    >
                      {paymentMode === "advance" && (
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      )}
                    </div>
                    <span className="font-bold text-gray-900 text-sm">
                      Pay Advance ({BOOKING_SUMMARY.advancePercentage}%)
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 flex items-center text-sm">
                    <IndianRupee className="h-3 w-3" /> {advanceAmount}
                  </span>
                </label>

                <label
                  onClick={() => setPaymentMode("full")}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMode === "full" ? "border-orange-500 bg-orange-50/50" : "border-gray-200 hover:border-orange-200"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMode === "full" ? "border-orange-500" : "border-gray-300"}`}
                    >
                      {paymentMode === "full" && (
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      )}
                    </div>
                    <span className="font-bold text-gray-900 text-sm">
                      Pay Full Amount
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 flex items-center text-sm">
                    <IndianRupee className="h-3 w-3" /> {totalAmount}
                  </span>
                </label>
              </div>

              {/* Payment Highlight & Actions */}
              <div className="px-6 pb-6">
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-2 mb-5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-orange-800 text-sm">
                      Amount to Pay Now
                    </span>
                    <span className="text-xl font-bold text-orange-600 flex items-center">
                      <IndianRupee className="h-5 w-5" />{" "}
                      {paymentMode === "advance" ? advanceAmount : totalAmount}
                    </span>
                  </div>
                  {paymentMode === "advance" ? (
                    <p className="text-xs text-orange-600/80 leading-relaxed mt-1">
                      Pay the remaining balance of{" "}
                      <IndianRupee className="h-2.5 w-2.5 inline" />
                      {totalAmount - advanceAmount}{" "}
                      <strong>at least 3 days before</strong> the pooja date.
                    </p>
                  ) : (
                    <p className="text-xs text-orange-600/80 leading-relaxed mt-1">
                      You are paying the full amount upfront. No remaining dues!
                    </p>
                  )}
                </div>

                <button onClick={() => startPayment("module" , "appId")} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex justify-center items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {paymentMode === "advance"
                    ? "Pay Advance & Book"
                    : "Pay Full Amount"}
                </button>

                {/* Trust Indicators */}
                <div className="mt-4 flex flex-col items-center gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    100% Safe & Secure Payments
                  </div>
                  <p>By proceeding, you agree to our Terms & Conditions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
