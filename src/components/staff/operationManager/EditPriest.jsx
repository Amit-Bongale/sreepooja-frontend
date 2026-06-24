import { Briefcase, Edit, MapPin, Phone, Save, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../../api/Api";
import { notify } from "../../../utils/notify";

function EditPriest({ priest, onClose , onSucess }) {
  const [formData, setFormData] = useState({ ...priest });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const community = await getData("/masters/communities");
      setCommunities(community);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/priests/${priest?.priestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        notify(data.message, "error");
        throw new Error("Failed to create priest");
      }

      notify("Priest Details Upated" , "success")
      onSucess();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gray-50 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-white px-6 py-5 flex justify-between items-center border-b border-gray-200 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Edit className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Edit Priest Profile
              </h2>
              <p className="text-sm text-gray-500">
                Update details for ID: #{priest?.priestId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 overflow-y-auto grow">
          <form
            id="editPriestForm"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Status Toggle */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between shadow-sm">
              <div>
                <h4 className="font-semibold text-gray-900">Account Status</h4>
                <p className="text-sm text-gray-500">
                  Determine if this priest is visible and bookable.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active || false}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {formData.active ? "Active" : "Inactive"}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div className="space-y-4">
                <SectionHeader icon={User} title="Personal Details" />
                <div className="grid grid-cols-2 gap-4">
                  <FormGroup
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <FormGroup
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormGroup
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  <FormGroup
                    label="Aadhaar"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormGroup
                    label="Gothra"
                    name="gothra"
                    value={formData.gothra}
                    onChange={handleChange}
                  />
                  <FormGroup
                    label="Pravara"
                    name="pravara"
                    value={formData.pravara}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <SectionHeader icon={Phone} title="Contact Details" />
                <FormGroup
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormGroup
                    label="Mobile Number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  <FormGroup
                    label="WhatsApp Number"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Professional Info */}
              <div className="space-y-4">
                <SectionHeader icon={Briefcase} title="Professional Details" />
                <FormGroup
                  label="Experience Level"
                  name="experience"
                  type="select"
                  value={formData.experience}
                  onChange={handleChange}
                  options={[
                    { label: "0 - 5 Years", value: "ZERO_TO_FIVE" },
                    { label: "5 - 7 Years", value: "FIVE_TO_SEVEN" },
                    { label: "8 - 10 Years", value: "UPTO_TEN" },
                    { label: "10 - 20+ Years", value: "UPTO_TWENTY" },
                  ]}
                />
                <FormGroup
                  label="Languages Spoken (comma separated)"
                  name="languagesSpoken"
                  value={formData.languagesSpoken}
                  onChange={handleChange}
                />

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Trimathastharu
                  </label>
                  <select
                    className=" w-full border border-gray-300 rounded-lg px-3 py-2.5  focus:border-orange-500  outline-none"
                    name="communityId"
                    onChange={handleChange}
                    value={priest?.communityId}
                  >
                    <option value="">Select</option>
                    {communities.map((option, idx) => (
                      <option key={idx} value={option.id}>
                        {option.communityName}
                      </option>
                    ))}
                  </select>
                </div>

                <FormGroup
                  label="Referred By"
                  name="referredBy"
                  value={formData.referredBy}
                  onChange={handleChange}
                />
              </div>

              {/* Location Info */}
              <div className="space-y-4">
                <SectionHeader icon={MapPin} title="Location Details" />
                <FormGroup
                  label="Address Line 1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                />
                <FormGroup
                  label="Address Line 2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormGroup
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <FormGroup
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
                <FormGroup
                  label="Native Place"
                  name="nativePlace"
                  value={formData.nativePlace}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 shrink-0 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="editPriestForm"
            disabled={isSubmitting}
            className={`px-8 py-2.5 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-all flex items-center shadow-md hover:shadow-lg ${isSubmitting ? "opacity-80 cursor-wait" : ""}`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPriest;

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center space-x-2 text-orange-600 mb-4 border-b border-orange-100 pb-2">
    <Icon className="w-5 h-5" />
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
  </div>
);

const FormGroup = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  options = [],
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {type === "select" ? (
      <select
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
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
        rows="2"
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white resize-none"
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
      />
    )}
  </div>
);
