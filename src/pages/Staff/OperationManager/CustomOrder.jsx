import { useEffect, useState } from "react";
import {
  UserPlus,
  Calendar,
  MapPin,
  FileText,
  IndianRupee,
  AlertCircle,
  Save,
  ChevronDown,
  Clock,
  Command,
  Languages,
} from "lucide-react";
import { getData } from "../../../api/Api";
import Select from "react-select";
import { notify } from "../../../Utils/notify";

// --- MOCK DATA FOR DROPDOWNS ---
const mockUsers = [
  { id: 1, name: "Ramesh Kumar", phone: "9876543210" },
  { id: 2, name: "Anjali Sharma", phone: "9123456789" },
  { id: 3, name: "Suresh Menon", phone: "9988776655" },
];

const mockServices = [
  { id: 10, name: "Satyanarayana Swamy Vratham" },
  { id: 14, name: "Maha Ganapati Homa" },
  { id: 15, name: "Gruhapravesham" },
  { id: 22, name: "Chandi Homa" },
];

function CustomOrder() {
  const [formData, setFormData] = useState({
    userId: "",
    serviceId: "",
    customDescription: "",
    preferredDate: "",
    preferredTimeSlot: "",
    preferredLanguage: "",
    preferredCommunity: "",
    address: "",
    stateId: "",
    cityId: "",
    pincodeId: "",
    specialInstructions: "",
    totalAmount: "",
    advancePercentage: 30, // Default
  });

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

      const states = await getData("/masters/states");
      setStates(states);
    };

    fetchData();
  }, []);

  const fetchCities = async (id) => {
    const data = await getData(`/masters/states/${id}`);
    setCities(data?.cities);
  };

  const fetchPincodes = async (id) => {
    const data = await getData(`/masters/cities/${id}`);
    setPincodes(data?.pincodes);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const date = new Date();
  date.setDate(date.getDate() + 4);
  const minDate = date.toISOString().split("T")[0];

  // Derived Values
  const calculatedAdvance = formData.totalAmount
    ? Math.round(
        (parseFloat(formData.totalAmount) *
          parseFloat(formData.advancePercentage)) /
          100,
      )
    : 0;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value ? Number(value) : "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Formatting the payload
    const payload = {
      ...formData,
      //   userId: Number(formData.userId),
      //   serviceId: Number(formData.serviceId),
      userId: Number(2),
      serviceId: Number(1),
      stateId: Number(formData.stateId),
      cityId: Number(formData.cityId),
      pincodeId: Number(formData.pincodeId),
      totalAmount: Number(formData.totalAmount),
      advancePercentage: Number(formData.advancePercentage),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/bookings/custom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const response = await res.json();
        notify(response.message, "error");
        return;
      }

      notify("Booking Created", "success");

      setFormData(() => ({
        userId: "",
        serviceId: "",
        customDescription: "",
        preferredDate: "",
        preferredTimeSlot: "",
        preferredLanguage: "",
        preferredCommunity: "",
        address: "",
        stateId: "",
        cityId: "",
        pincodeId: "",
        specialInstructions: "",
        totalAmount: "",
        advancePercentage: 30,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="text-gray-800 antialiased min-h-screen bg-gray-50">
      <header className="h-18 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 mt-18 md:mt-0 shrink-0">
        <h1 className="text-xl font-serif font-bold text-gray-900 hidden md:block">
          Create Custom Order
        </h1>
      </header>

      <main className="grow p-4 md:p-8 mx-auto w-full">
        <form
          id="customOrderForm"
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Left Column: Form Fields */}
          <div className="grow space-y-6">
            {/* Section 1: Customer & Service */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <SectionHeader
                icon={UserPlus}
                title="Customer & Service"
                description="Select the user and the base service for this custom order."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup
                  label="Select Customer"
                  name="userId"
                  type="select"
                  required
                  value={formData.userId}
                  onChange={handleChange}
                  options={mockUsers.map((u) => ({
                    value: u.id,
                    label: `${u.name} (${u.phone})`,
                  }))}
                />
                <FormGroup
                  label="Select Base Service"
                  name="serviceId"
                  type="select"
                  required
                  value={formData.serviceId}
                  onChange={handleChange}
                  options={mockServices.map((s) => ({
                    value: s.id,
                    label: s.name,
                  }))}
                />
              </div>
            </div>

            {/* Section 2: Schedule & Preferences */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <SectionHeader
                icon={Calendar}
                title="Schedule & Preferences"
                description="Set the date, time, and specific ritual preferences."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Section 3: Location Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <SectionHeader
                icon={MapPin}
                title="Location Details"
                description="Where will this service take place?"
              />
              <div className="mb-6">
                <FormGroup
                  label="Full Address"
                  name="address"
                  type="textarea"
                  required
                  placeholder="Enter complete door number, street, and landmark..."
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            {/* Section 4: Customizations */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <SectionHeader
                icon={FileText}
                title="Requirements & Instructions"
                description="Specific details that justify the custom order."
              />
              <div className="space-y-6">
                <FormGroup
                  label="Custom Description / Samagri Details"
                  name="customDescription"
                  type="textarea"
                  required
                  placeholder="e.g., Includes additional homa, specific flowers needed, extra pandits required..."
                  value={formData.customDescription}
                  onChange={handleChange}
                />
                <FormGroup
                  label="Special Instructions for Pandit"
                  name="specialInstructions"
                  type="textarea"
                  placeholder="e.g., Customer prefers the pooja to start strictly before 9 AM."
                  value={formData.specialInstructions}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Actions Sidebar */}
          <div className="w-full lg:w-96 shrink-0 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-orange-500 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <IndianRupee className="w-6 h-6 mr-2 text-orange-600" />
                Pricing Summary
              </h3>

              <div className="space-y-5">
                <FormGroup
                  label="Total Amount (₹)"
                  name="totalAmount"
                  type="number"
                  required
                  placeholder="e.g., 15000"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  prefix={<IndianRupee className="w-4 h-4" />}
                />

                <FormGroup
                  label="Advance Percentage (%)"
                  name="advancePercentage"
                  type="number"
                  required
                  max={100}
                  value={formData.advancePercentage}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      advancePercentage: Math.min(e.target.value, 100),
                    }))
                  }
                />

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
                        Number(formData.totalAmount || 0) - calculatedAdvance
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 flex items-start space-x-3 mt-6">
                  <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-800 leading-relaxed">
                    Verify the total amount carefully. A payment link will be
                    generated for the advance amount once this order is created.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 ${isSubmitting ? "opacity-80 cursor-wait" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Creating Order...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-1" />
                      <span>Create Custom Order</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CustomOrder;

const FormGroup = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  options = [],
  required = false,
  placeholder = "",
  prefix = null,
  max,
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={name}
      className="text-sm font-medium text-gray-700 mb-1 flex items-center"
    >
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      {prefix && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          {prefix}
        </div>
      )}

      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          required={required}
          className={`w-full py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white ${prefix ? "pl-10 pr-4" : "px-4"}`}
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          required={required}
          rows="3"
          placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white resize-none"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          min={type === "number" ? "0" : undefined}
          max={max}
          className={`w-full py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white ${prefix ? "pl-10 pr-4" : "px-4"}`}
        />
      )}
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, description }) => (
  <div className="mb-6">
    <div className="flex items-center space-x-2 text-orange-600 mb-1">
      <Icon className="w-5 h-5" />
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    </div>
    {description && <p className="text-sm text-gray-500 ml-7">{description}</p>}
    <hr className="border-orange-100 mt-3" />
  </div>
);
