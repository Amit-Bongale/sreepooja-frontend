import { useState } from "react";
import { X, Save, UserPlus } from "lucide-react";

const EXPERIENCE_OPTIONS = [
  {
    label: "0 - 5 Years",
    value: "ZERO_TO_FIVE",
  },
  {
    label: "5 - 7 Years",
    value: "FIVE_TO_SEVEN",
  },
  {
    label: "8 - 10 Years",
    value: "UPTO_TEN",
  },
  {
    label: "10 - 20+ Years",
    value: "UPTO_TWENTY",
  },
];

const TRIMATHASTHARU_OPTIONS = [
  {
    label: "Smartha",
    value: "SMARTHA",
  },
  {
    label: "Vaishnava",
    value: "VAISHNAVA",
  },
  {
    label: "Sri Vaishnava",
    value: "SRI_VAISHNAVA",
  },
  {
    label: "Veerashaiva Lingayatha",
    value: "VEERASHAIVA_LINGAYATHA",
  },
  {
    label: "Arya Vasya",
    value: "ARYA_VASYA",
  },
];

const LANGUAGE_OPTIONS = [
  "Kannada",
  "Sanskrit",
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Malayalam",
];

export default function AddPriestModal({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [sameWhatsapp, setSameWhatsapp] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gothra: "",
    pravara: "",
    nativePlace: "",
    aadhaarNumber: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    place: "",
    pincode: "",
    languagesSpoken: "",
    trimathastharu: "",
    experience: "",
    referredBy: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const addLanguage = (lang) => {
    if (!languages.includes(lang)) {
      setLanguages([...languages, lang]);
    }
  };

  const removeLanguage = (lang) => {
    setLanguages(languages.filter((l) => l !== lang));
  };

  const handleMobileChange = (e) => {
    const mobileNumber = e.target.value;

    setFormData((prev) => ({
      ...prev,
      mobileNumber,
      whatsappNumber: sameWhatsapp ? mobileNumber : prev.whatsappNumber,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleWhatsappCheckbox = (e) => {
    const checked = e.target.checked;

    setSameWhatsapp(checked);

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        whatsappNumber: prev.mobileNumber,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Enter valid 10 digit mobile number";
    }

    if (
      formData.whatsappNumber &&
      !/^[6-9]\d{9}$/.test(formData.whatsappNumber)
    ) {
      errors.whatsappNumber = "Enter valid WhatsApp number";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email";
    }

    
    if (formData.aadhaarNumber && !/^\d{12}$/.test(formData.aadhaarNumber)) {
      errors.aadhaarNumber = "Aadhaar must contain 12 digits";
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Enter valid pincode";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/admin/priests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
          languagesSpoken: languages.join(","),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create priest");
      }

      const data = await response.json();

      onSuccess?.(data);
      onClose();

      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        gothra: "",
        pravara: "",
        nativePlace: "",
        aadhaarNumber: "",
        mobileNumber: "",
        whatsappNumber: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        place: "",
        pincode: "",
        languagesSpoken: "",
        trimathastharu: "",
        experience: "",
        referredBy: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-400 px-6 py-5 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <UserPlus className="text-orange-500" size={24} />

              <h2 className="text-2xl font-semibold">Add Priest</h2>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              Create a new priest profile
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Section title="Personal Information">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
            />

            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <Input
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <Input
              label="Mobile Number"
              name="mobileNumber"
              required
              value={formData.mobileNumber}
              onChange={handleMobileChange}
              error={errors.mobileNumber}
            />

            {sameWhatsapp ? (
              <div>
                <p className="text-sm font-medium mb-1 block">
                  WhatsApp Number
                </p>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="whatsapp"
                    id="whatsapp"
                    checked={sameWhatsapp}
                    onChange={handleWhatsappCheckbox}
                  />
                  <label htmlFor="whatsapp">Same as Mobile Number</label>
                </div>
              </div>
            ) : (
              <Input
                label="WhatsApp Number"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                error={errors.whatsappNumber}
              />
            )}

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </Section>

          <Section title="Vedic Details">
            <Input
              label="Gothra"
              name="gothra"
              value={formData.gothra}
              onChange={handleChange}
            />

            <Input
              label="Pravara"
              name="pravara"
              value={formData.pravara}
              onChange={handleChange}
            />

            <Select
              label="Trimathastharu"
              name="trimathastharu"
              value={formData.trimathastharu}
              onChange={handleChange}
              options={TRIMATHASTHARU_OPTIONS}
            />

            <Select
              label="Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              options={EXPERIENCE_OPTIONS}
            />
          </Section>

          <Section title="Address Details">
            <FullInput
              label="Address Line 1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
            />

            <FullInput
              label="Address Line 2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
            />

            <Input
              label="City"
              name="city"
              value={formData.place}
              onChange={handleChange}
            />

            <Input
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              error={errors.pincode}
              required
            />

            <Input
              label="Native Place"
              name="nativePlace"
              value={formData.nativePlace}
              onChange={handleChange}
            />
          </Section>

          <Section title="Additional Information">
            <Input
              label="Aadhaar Number"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              error={errors.aadhaarNumber}
            />

            <div>
              <label className="block text-sm font-medium mb-2">
                Languages Spoken [multiple languages can be choosen]
              </label>

              <select
                onChange={(e) => addLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
              >
                <option>Select Language</option>

                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>

              <div className="flex flex-wrap gap-2 mt-3">
                {languages.map((lang) => (
                  <div
                    key={lang}
                    className="bg-orange-50 border border-orange-200 text-orange-700 rounded-full px-3 py-1 flex items-center gap-2"
                  >
                    {lang}

                    <button onClick={() => removeLanguage(lang)}>✕</button>
                  </div>
                ))}
              </div>
            </div>

            <FullInput
              label="Referred By"
              name="referredBy"
              value={formData.referredBy}
              onChange={handleChange}
            />
          </Section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-400 bg-white p-4 sm:p-5">
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto border border-gray-400 hover:bg-gray-200 px-5 py-2.5 rounded-lg"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2"
            >
              <Save size={18} />

              {loading ? "Creating..." : "Create Priest"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="font-semibold text-lg mb-4">{title}</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Input = ({ label, required, error, ...props }) => (
  <div>
    <label className={`text-sm font-medium mb-1 block`}>
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>

    <input
      {...props}
      className={`w-full border ${error ? "border-red-400" : "border-gray-300"} rounded-lg px-3 py-2.5 focus:border-orange-500 outline-none `}
    />

    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const FullInput = ({ label, ...props }) => (
  <div className="md:col-span-2">
    <label className="text-sm font-medium mb-1 block">{label}</label>

    <input
      {...props}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:border-orange-500 outline-none"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium mb-1 block">{label}</label>

    <select
      {...props}
      className=" w-full border border-gray-300 rounded-lg px-3 py-2.5  focus:border-orange-500  outline-none"
    >
      <option value="">Select</option>

      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
