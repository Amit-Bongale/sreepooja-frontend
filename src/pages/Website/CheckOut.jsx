import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  IndianRupee,
  ShieldCheck,
  CreditCard,
  Info,
  ChevronDown,
  Languages,
  Command,
} from "lucide-react";
import { startPayment } from "../../utils/Payment";
import Nav from "../../components/Nav";
import { getData } from "../../api/Api";
import { useNavigate, useParams } from "react-router";
import Select from "react-select";
import { useSelector } from "react-redux";
import { notify } from "../../Utils/notify";

export default function CheckOut() {
  const { id, type } = useParams();
  // --- STATE ---
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [paymentMode, setPaymentMode] = useState("FULL");
  const [loading, setLoading] = useState(false);

  const [serviceDetails, setServiceDetails] = useState([]);
  const [LANGUAGES, setLanguages] = useState([]);
  const [COMMUNITY, setCommunity] = useState([]);
  const [STATES, setStates] = useState([]);
  const [CITIES, setCities] = useState([]);
  const [PINCODES, setPincodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const languages = await getData("/masters/languages");
      setLanguages(languages);

      const community = await getData("/masters/communities");
      setCommunity(community);

      const data = await getData(`/bookings/checkout/${id}`);
      setServiceDetails(data);

      const states = await getData("/masters/states");
      setStates(states);
    };

    fetchData();
  }, [id, type]);

  const fetchCities = async (id) => {
    const data = await getData(`/masters/states/${id}`);
    setCities(data?.cities);
  };

  const fetchPincodes = async (id) => {
    const data = await getData(`/masters/cities/${id}`);
    setPincodes(data?.pincodes);
  };

  const date = new Date();
  date.setDate(date.getDate() + 4);
  const minDate = date.toISOString().split("T")[0];

  // Form state
  const [formData, setFormData] = useState({
    packageId: Number(id),
    preferredDate: "",
    preferredTimeSlot: "MORNING",
    preferredLanguage: "",
    preferredCommunity: "",
    address: "",
    stateId: "",
    cityId: "",
    pincodeId: "",
    specialInstructions: "",
    paymentOption: "ADVANCE",
    paymentType: "",
  });

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#f97316" : "#e5e7eb",
      boxShadow: state.isFocused
        ? "0 0 0 0.5px #f97316, 0 0 0 2px rgba(253, 186, 116, 0.25)"
        : "none",
      "&:hover": {
        borderColor: "#f97316",
      },
      borderRadius: "8px",
    }),
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (serviceDetails?.packageType === "CUSTOM") {
      // eslint-disable-next-line no-unused-vars
      const { paymentOption, paymentType, ...requestBody } = formData;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/bookings/custom`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },

            body: JSON.stringify(requestBody),
          },
        );

        if (!res.ok) {
          const data = await res.json();
          notify(data.message, "error");
          return;
        }

        notify("Query Created Successfull", "success");
        navigate("/user/bookings");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/bookings`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              ...formData,
              packageType: serviceDetails?.packageType,
            }),
          },
        );
        const data = await res.json();

        if (!res.ok) {
          notify(data.message, "error");
        }

        await startPayment(data.bookingId, data.paymentOption);

        notify("Booking Successfull", "success");
        navigate("/user/bookings");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50 flex flex-col">
      <Nav />

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 max-w-7xl mt-18 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
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
                Preferred Pooja Date & Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      onChange={(e) => {
                        const selectedDate = e.target.value;

                        setFormData((data) => ({
                          ...data,
                          preferredDate: selectedDate,
                        }));

                        setPaymentMode(
                          selectedDate === minDate ? "FULL" : paymentMode,
                        );
                      }}
                      type="date"
                      min={minDate}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Slot <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none appearance-none cursor-pointer"
                      onChange={(e) =>
                        setFormData((data) => ({
                          ...data,
                          preferredTimeSlot: e.target.value,
                        }))
                      }
                    >
                      <option value={"MORNING"}>
                        Morning (06:00 AM - 09:00 AM)
                      </option>
                      <option value={"MID_MORNING"}>
                        Mid-Morning (09:00 AM - 12:00 PM)
                      </option>
                      <option value={"AFTERNOON"}>
                        Afternoon (12:00 PM - 04:00 PM)
                      </option>
                      <option value={"EVENING"}>
                        Evening (04:00 PM - 07:00 PM)
                      </option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priest Language <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Languages className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none appearance-none cursor-pointer"
                      onChange={(e) =>
                        setFormData((data) => ({
                          ...data,
                          preferredLanguage: e.target.value,
                        }))
                      }
                    >
                      <option value={"any"}> Any Language</option>
                      {LANGUAGES?.map((lang) => (
                        <option key={lang.id} value={lang.languageName}>
                          {lang.languageName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priest Community <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Command className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none appearance-none cursor-pointer"
                      onChange={(e) =>
                        setFormData((data) => ({
                          ...data,
                          preferredCommunity: e.target.value,
                        }))
                      }
                    >
                      <option value={"any"}> Any Community</option>
                      {COMMUNITY?.map((community) => (
                        <option
                          key={community.id}
                          value={community.communityName}
                        >
                          {community.communityName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100 flex gap-3 text-sm text-blue-800">
                <Info className="h-5 w-5 shrink-0 mt-0.5" />
                <p>
                  Priest assignment, Muhurtham timing, and selected date/time
                  are subject to priest and Muhurtham availability and may
                  change after confirmation. Selected preferences are considered
                  as preferred options only.
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
                      disabled={true}
                      defaultValue={user?.name}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-200 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
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
                      disabled={true}
                      defaultValue={user?.phone}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-200 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100 flex gap-3 text-sm text-blue-800">
                <Info className="h-5 w-5 shrink-0 mt-0.5" />
                <p>Please visit the Profile section to change your name.</p>
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

              {/*  Address Form */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mt-4 animate-in fade-in slide-in-from-top-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Street Address
                    </label>
                    <textarea
                      onChange={(e) =>
                        setFormData((data) => ({
                          ...data,
                          address: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none resize-none"
                      rows="2"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      State
                    </label>
                    <Select
                      placeholder={"select state"}
                      styles={selectStyles}
                      isClearable={true}
                      options={STATES?.map((data) => ({
                        value: data.id,
                        label: data.stateName,
                      }))}
                      onChange={(option) => {
                        setFormData((data) => ({
                          ...data,
                          stateId: option?.value,
                        }));
                        fetchCities(option?.value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      City
                    </label>
                    <Select
                      placeholder={"select city"}
                      styles={selectStyles}
                      isDisabled={!formData.stateId}
                      isClearable={true}
                      options={CITIES?.map((data) => ({
                        value: data.id,
                        label: data.cityName,
                      }))}
                      onChange={(option) => {
                        setFormData((data) => ({
                          ...data,
                          cityId: option?.value,
                        }));
                        fetchPincodes(option?.value);
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Pincode
                    </label>
                    <Select
                      placeholder={"select pincode"}
                      isDisabled={!formData.cityId}
                      isClearable={true}
                      styles={selectStyles}
                      options={PINCODES?.map((data) => ({
                        value: data.id,
                        label: data.pincode,
                      }))}
                      onChange={(option) => {
                        setFormData((data) => ({
                          ...data,
                          pincodeId: option?.value,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Special Instructions */}
            <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                Special Requests / Notes
              </h2>
              <textarea
                onChange={(e) =>
                  setFormData((data) => ({
                    ...data,
                    specialInstructions: e.target.value,
                  }))
                }
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
                    src={`${import.meta.env.VITE_API_BASE_URL}${serviceDetails?.thumbnailImage}`}
                    alt={serviceDetails?.serviceName}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 line-clamp-1">
                      {serviceDetails?.serviceName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {serviceDetails?.packageType}
                    </p>
                    <span className="inline-block mt-1 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {serviceDetails?.shortDescription}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              {/* <div className="p-6 space-y-3">
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Base Package Price</span>
                  <span className="font-medium text-gray-900 flex items-center">
                    <IndianRupee className="h-3.5 w-3.5" />{" "}
                    {serviceDetails?.packagePrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Taxes & Fees (5%)</span>
                  <span className="font-medium text-gray-900 flex items-center">
                    <IndianRupee className="h-3.5 w-3.5" />{" "}
                    {serviceDetails?.taxes}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 my-3 pt-3"></div>

                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="text-lg font-bold text-gray-900 flex items-center">
                    <IndianRupee className="h-4 w-4" /> {serviceDetails?.packagePrice}
                  </span>
                </div>
              </div> */}

              {/* Payment Options Selection */}
              {serviceDetails?.packageType != "CUSTOM" && (
                <div className="px-6 pb-2 space-y-3 mt-4">
                  {formData.preferredDate != minDate && (
                    <label
                      onClick={() => {
                        setPaymentMode("ADVANCE");
                        setFormData((data) => ({
                          ...data,
                          paymentOption: "ADVANCE",
                        }));
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMode === "ADVANCE" ? "border-orange-500 bg-orange-50/50" : "border-gray-200 hover:border-orange-200"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMode === "ADVANCE" ? "border-orange-500" : "border-gray-300"}`}
                        >
                          {paymentMode === "ADVANCE" && (
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          )}
                        </div>
                        <span className="font-bold text-gray-900 text-sm">
                          Pay Advance ({serviceDetails?.advancePercentage}%)
                        </span>
                      </div>
                      <span className="font-bold text-gray-900 flex items-center text-sm">
                        <IndianRupee className="h-3 w-3" />{" "}
                        {serviceDetails?.advanceAmount}
                      </span>
                    </label>
                  )}

                  <label
                    onClick={() => {
                      setPaymentMode("FULL");
                      setFormData((data) => ({
                        ...data,
                        paymentOption: "FULL",
                      }));
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMode === "FULL" ? "border-orange-500 bg-orange-50/50" : "border-gray-200 hover:border-orange-200"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMode === "FULL" ? "border-orange-500" : "border-gray-300"}`}
                      >
                        {paymentMode === "FULL" && (
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        )}
                      </div>
                      <span className="font-bold text-gray-900 text-sm">
                        Pay Full Amount
                      </span>
                    </div>
                    <span className="font-bold text-gray-900 flex items-center text-sm">
                      <IndianRupee className="h-3 w-3" />{" "}
                      {serviceDetails?.packagePrice}
                    </span>
                  </label>
                </div>
              )}

              {/* Payment Highlight & Actions */}
              <div className="px-6 pb-6">
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-2 mb-5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-orange-800 text-sm">
                      Amount to Pay Now
                    </span>
                    <span className="text-xl font-bold text-orange-600 flex items-center">
                      <IndianRupee className="h-5 w-5" />{" "}
                      {paymentMode === "ADVANCE"
                        ? serviceDetails?.advanceAmount
                        : serviceDetails?.packagePrice}
                    </span>
                  </div>
                  {paymentMode === "ADVANCE" ? (
                    <p className="text-xs text-orange-600/80 leading-relaxed mt-1">
                      Pay the remaining balance of{" "}
                      <strong>
                        {" "}
                        <IndianRupee className="h-3 w-3 inline font-bold" />
                        {serviceDetails?.balanceAmount} at least 3 days before
                      </strong>{" "}
                      the pooja date.
                    </p>
                  ) : (
                    serviceDetails.packageType != "CUSTOM" && (
                      <p className="text-xs text-orange-600/80 leading-relaxed mt-1">
                        You are paying the full amount upfront. No remaining
                        dues!
                      </p>
                    )
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full ${loading ? " bg-gray-800" : "bg-brand-600 hover:bg-brnad-700 "}  text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex justify-center items-center gap-2`}
                >
                  <CreditCard className="h-5 w-5" />
                  {serviceDetails?.packageType === "CUSTOM"
                    ? "Book Now"
                    : paymentMode === "ADVANCE"
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
