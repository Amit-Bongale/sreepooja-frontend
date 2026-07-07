import { useEffect, useState } from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import { notify } from "../../utils/notify";
import { getData } from "../../api/Api";
import logo from "../../assets/logo.jpg";

const EXPERIENCE_OPTIONS = [
  { label: "0 - 5 Years", value: "ZERO_TO_FIVE" },
  { label: "5 - 7 Years", value: "FIVE_TO_SEVEN" },
  { label: "8 - 10 Years", value: "UPTO_TEN" },
  { label: "10 - 20+ Years", value: "UPTO_TWENTY" },
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

const REFERENCE_OPTIONS = [
  { label: "WhatsApp", value: "WhatsApp" },
  { label: "Facebook", value: "Facebook" },
  { label: "Instagram", value: "Instagram" },
  { label: "Others / Person", value: "Others" },
];

export default function PriestRegistration({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [sameWhatsapp, setSameWhatsapp] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [declaration, setDeclaration] = useState(false);

  const [previews, setPreviews] = useState({
    priestPhoto: null,
    aadhaarFront: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const community = await getData("/masters/communities");
        setCommunities(community || []);
      } catch (error) {
        console.error("Failed to fetch communities", error);
      }
    };
    fetchData();
  }, []);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
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
    city: "",
    state: "",
    pincode: "",
    communityId: "",
    experience: "",
    bankingName: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    accountNumber: "",
    upiId: "",
    referredBySource: "",
    referredByText: "",
    priestPhoto: null,
    aadhaarFront: null,
  });

  const calculateAge = (dobString) => {
    if (!dobString) return "";
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { [name]: value };

    if (name === "dob") {
      updatedData.age = calculateAge(value);
    }

    setFormData((prev) => ({ ...prev, ...updatedData }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      setPreviews((prev) => ({
        ...prev,
        [fieldName]: URL.createObjectURL(file),
      }));
    }
  };

  const addLanguage = (lang) => {
    if (!languages.includes(lang) && lang) {
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
    setErrors((prev) => ({ ...prev, mobileNumber: "" }));
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
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter valid 10 digit mobile number";
    }

    if (
      formData.whatsappNumber &&
      !/^[6-9]\d{9}$/.test(formData.whatsappNumber)
    ) {
      newErrors.whatsappNumber = "Enter valid WhatsApp number";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (formData.aadhaarNumber && !/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = "Aadhaar must contain 12 digits";
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter valid pincode";
    }

    if (!declaration) {
      notify("Please accept the declaration to proceed", "error");
      return false;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      notify("Please fix the errors in the form", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const submitData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (
          ![
            "priestPhoto",
            "aadhaarFront",
            "referredBySource",
            "referredByText",
          ].includes(key)
        ) {
          if (formData[key]) submitData.append(key, formData[key]);
        }
      });

      const finalReferredBy =
        formData.referredBySource === "Others"
          ? formData.referredByText
          : formData.referredBySource;
      if (finalReferredBy) submitData.append("referredBy", finalReferredBy);

      if (languages.length > 0)
        submitData.append("languagesSpoken", languages.join(","));
      submitData.append("age", Number(formData.age));

      if (formData.priestPhoto)
        submitData.append("priestPhoto", formData.priestPhoto);
      if (formData.aadhaarFront)
        submitData.append("aadhaarFront", formData.aadhaarFront);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/priests`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: submitData,
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create priest");
      }

      notify("Priest registered successfully!", "success");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      {/* Creative Header Banner */}
      <header className="relative bg-linear-to-r from-brand-500 via-orange-500 to-brand-600 pt-10 pb-26 px-4 sm:px-6 overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 border-4 border-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center text-white">
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm mb-4">
            <img src={logo} alt="SreePooja" className="size-16 rounded-full" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Priest Onboarding
          </h1>
          <p className="text-orange-100 text-md md:text-lg max-w-2xl">
            Welcome to the Sree Pooja community! Please complete the form below
            to create your priest profile. Once you've filled in the required
            details, your onboarding process will begin..
          </p>
        </div>
      </header>

      {/* Main Form Content - Overlapping the Header */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 -mt-16 pb-20 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-10">
            <Section title="Personal Information" icon="1">
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
              />
              <Input
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              <Input
                label="Age"
                name="age"
                type="number"
                disabled
                value={formData.age}
                readOnly
                className="bg-gray-50 text-gray-500"
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
                  <p className="text-sm font-medium text-gray-700 mb-1 block">
                    WhatsApp Number
                  </p>
                  <div className="flex gap-2 items-center h-10 border border-gray-200 rounded-lg px-3 bg-gray-50">
                    <input
                      type="checkbox"
                      name="whatsapp"
                      id="whatsapp"
                      checked={sameWhatsapp}
                      onChange={handleWhatsappCheckbox}
                      className="accent-white"
                    />
                    <label
                      htmlFor="whatsapp"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Same as Mobile Number
                    </label>
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
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </Section>

            <Section title="Vedic Details" icon="2">
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

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Trimathastharu
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  name="communityId"
                  value={formData.communityId}
                  onChange={handleChange}
                >
                  <option value="">Select Community</option>
                  {communities.map((option, idx) => (
                    <option key={idx} value={option.id}>
                      {option.communityName}
                    </option>
                  ))}
                </select>
              </div>

              <Select
                label="Years of Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                options={EXPERIENCE_OPTIONS}
              />
            </Section>

            <Section title="Address Details" icon="3">
              <FullInput
                label="Address Line 1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="House/Flat No., Building Name"
              />
              <FullInput
                label="Address Line 2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Street, Area, Landmark"
              />
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <Input
                label="State"
                name="state"
                value={formData.state}
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

            <Section title="Banking Information" icon="4">
              <Input
                label="Banking Name (As per Account)"
                name="bankingName"
                value={formData.bankingName}
                onChange={handleChange}
                placeholder="John Doe"
              />
              <Input
                label="Bank Name"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="e.g. State Bank of India"
              />
              <Input
                label="Branch Name"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
              />
              <Input
                label="IFSC Code"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="e.g. SBIN0001234"
              />
              <Input
                label="Account Number"
                name="accountNumber"
                type="password"
                value={formData.accountNumber}
                onChange={handleChange}
              />
              <Input
                label="UPI ID"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="e.g. 9876543210@ybl"
              />
            </Section>

            <Section title="Document Uploads" icon="5">
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <FileUploadBox
                  label="Priest Photo"
                  fieldName="priestPhoto"
                  preview={previews.priestPhoto}
                  onChange={handleFileChange}
                />
                <FileUploadBox
                  label="Aadhaar (Front)"
                  fieldName="aadhaarFront"
                  preview={previews.aadhaarFront}
                  onChange={handleFileChange}
                />
              </div>

              <div className="md:col-span-2 mt-4">
                <Input
                  label="Aadhaar Number"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  error={errors.aadhaarNumber}
                  placeholder="12-digit Aadhaar Number"
                />
              </div>
            </Section>

            <Section title="Reference & Extras" icon="6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages Spoken (Select multiple)
                </label>
                <select
                  onChange={(e) => addLanguage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                  value=""
                >
                  <option value="">-- Choose a Language --</option>
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-2 mt-3">
                  {languages.map((lang) => (
                    <div
                      key={lang}
                      className="bg-orange-50 border border-orange-200 text-orange-700 rounded-full px-3 py-1 flex items-center gap-2 text-sm font-medium"
                    >
                      {lang}
                      <button
                        type="button"
                        onClick={() => removeLanguage(lang)}
                        className="hover:text-red-500 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Select
                label="Referred By"
                name="referredBySource"
                value={formData.referredBySource}
                onChange={handleChange}
                options={REFERENCE_OPTIONS}
              />

              {formData.referredBySource === "Others" && (
                <Input
                  label="Specify Referer Name/Details"
                  name="referredByText"
                  value={formData.referredByText}
                  onChange={handleChange}
                  placeholder="Name of person or source"
                />
              )}
            </Section>

            {/* Declaration */}
            <div className="p-5 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    id="declaration"
                    checked={declaration}
                    onChange={(e) => setDeclaration(e.target.checked)}
                    className="w-5 h-5 accent-white rounded border-gray-300 cursor-pointer"
                  />
                </div>
                <label
                  htmlFor="declaration"
                  className="text-sm text-orange-900 cursor-pointer font-medium leading-relaxed"
                >
                  I hereby declare that all the information provided above is
                  true and accurate to the best of my knowledge. I understand
                  that submitting false information may lead to the termination
                  of my onboarding process.
                </label>
              </div>
            </div>
          </div>

          {/* Form Action Area (Replaced Footer) */}
          <div className="bg-gray-50 border-t border-gray-100 p-6 sm:px-8 sm:py-6 flex justify-end">
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>{" "}
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={22} /> Register  
                </span>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Subcomponents
const Section = ({ title, icon, children }) => (
  <div>
    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
      <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shadow-sm">
        {icon}
      </div>
      <h3 className="font-semibold text-xl text-gray-800 tracking-tight">
        {title}
      </h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 md:pl-12">
      {children}
    </div>
  </div>
);

const Input = ({ label, required, error, className = "", ...props }) => (
  <div className="w-full">
    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      {...props}
      className={`w-full border ${error ? "border-red-400 bg-red-50" : "border-gray-300"} rounded-lg px-3 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all ${className}`}
    />
    {error && (
      <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>
    )}
  </div>
);

const FullInput = ({ label, ...props }) => (
  <div className="md:col-span-2">
    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
      {label}
    </label>
    <input
      {...props}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="w-full">
    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
      {label}
    </label>
    <select
      {...props}
      className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
    >
      <option value="">Select Option</option>
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const FileUploadBox = ({ label, fieldName, preview, onChange }) => (
  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-orange-50 hover:border-orange-300 transition-colors relative h-40">
    {preview ? (
      <div className="relative w-full h-full group">
        <img
          src={preview}
          alt={label}
          className="w-full h-full object-cover rounded-lg shadow-sm"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity duration-200">
          <p className="text-white text-sm font-semibold tracking-wide">
            Change Photo
          </p>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e, fieldName)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>
    ) : (
      <>
        <div className="bg-white p-2 rounded-full shadow-sm mb-3">
          <Upload className="text-orange-400" size={24} />
        </div>
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-xs text-gray-500 mt-1">Click to browse files</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e, fieldName)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </>
    )}
  </div>
);
