import {
  Check,
  ChevronDown,
  Edit,
  Phone,
  Plus,
  Shield,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { notify } from "../../utils/notify";

// --- CONSTANTS ---
const AVAILABLE_ROLES = [
  "OPERATIONS_MANAGER",
  "ACCOUNTS_MANAGER",
  "CONTENT_MANAGER",
  "CUSTOMER_SERVICE_EXECUTIVE",
  "ADMIN",
  "SUPER_ADMIN",
];

function AddStaff({ onClose, onSuccess, initialData, mode }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    dob: "",
    status: "",
    roles: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form when opening
  useEffect(() => {
    if (mode === "edit" && initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(initialData);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: "",
        status: "",
        dob: "",
        roles: [],
      });
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRolesChange = (newRoles) => {
    setFormData((prev) => ({ ...prev, roles: newRoles }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.roles.length === 0) {
      alert("Please select at least one role."); // Using standard alert just for critical form validation fallback, prefer visual cues
      return;
    }

    setIsSubmitting(true);

    // Formatting payload explicitly as requested:
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobileNo: formData.mobileNo,
      email: formData.email,
      dob: formData.dob,
      roles: formData.roles,
    };

    // If editing, you'd typically pass ID in URL. Including it here for state update logic.
    if (mode === "edit") payload.id = formData.id;

    console.log(
      `Submitting ${mode === "add" ? "POST /admin/staff" : `PUT /admin/staff/${payload.id}`} :`,
      payload,
    );

    const url = mode === "add" ? "/admin/staff" : `/admin/staff/${formData.id}`;
    const method = mode == "add" ? "POST" : "PUT";
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${url}`,
        {
          method: method,
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
      onSuccess();
      onClose();
      setFormData({
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: "",
        dob: "",
        roles: [],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-white px-6 py-5 flex justify-between items-center border-b border-gray-200 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
              {mode === "add" ? (
                <Plus className="w-5 h-5" />
              ) : (
                <Edit className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {mode === "add"
                  ? "Add New Staff Member"
                  : "Update Staff Member"}
              </h2>
              <p className="text-sm text-gray-500">
                {mode === "add"
                  ? "Create a new staff profile and assign roles."
                  : `Editing details for ${formData.firstName} ${formData.lastName}`}
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

        {/* Form Content */}
        <div className="p-6 overflow-y-auto grow bg-gray-50/50">
          <form id="staffForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 flex items-center border-b border-gray-100 pb-2">
                <User className="w-4 h-4 mr-2 text-orange-500" /> Personal
                Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Rahul"
                />
                <FormGroup
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Sharma"
                />
                <FormGroup
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split("T")[0]}
                />

                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    Status
                  </label>
                  <select
                    value={formData.status}
                    name="status"
                    onChange={handleChange}
                    id="status"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white"
                  >
                    <option value="ACTIVE"> Active</option>
                    <option value="INACTIVE"> Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 flex items-center border-b border-gray-100 pb-2">
                <Phone className="w-4 h-4 mr-2 text-orange-500" /> Contact
                Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@company.com"
                />
                <FormGroup
                  label="Mobile Number"
                  name="mobileNo"
                  type="tel"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                  placeholder="10-digit number"
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 flex items-center border-b border-gray-100 pb-2">
                <Shield className="w-4 h-4 mr-2 text-orange-500" /> Access &
                Permissions
              </h3>
              <MultiSelectDropdown
                label="Assign Roles"
                options={AVAILABLE_ROLES}
                selectedValues={formData.roles}
                onChange={handleRolesChange}
              />
              {formData.roles.length === 0 && (
                <p className="text-xs text-red-500 mt-1">
                  At least one role must be selected.
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
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
            form="staffForm"
            disabled={isSubmitting || formData.roles.length === 0}
            className={`px-8 py-2.5 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-all flex items-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${isSubmitting ? "cursor-wait" : ""}`}
          >
            {isSubmitting
              ? "Saving..."
              : mode === "add"
                ? "Create Staff"
                : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStaff;

const formatRole = (role) => {
  return role
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

const FormGroup = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  min,
  max,
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={name}
      className="text-sm font-medium text-gray-700 mb-1 flex items-center"
    >
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value || ""}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      min={min}
      max={max}
      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white"
    />
  </div>
);

const MultiSelectDropdown = ({ options, selectedValues, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    const newSelection = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];
    onChange(newSelection);
  };

  return (
    <div className="flex flex-col relative" ref={dropdownRef}>
      <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
        {label} <span className="text-red-500 ml-1">*</span>
      </label>
      <div
        className="w-full min-h-11 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:bg-white cursor-pointer flex flex-wrap gap-2 items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-2 grow">
          {selectedValues.length === 0 ? (
            <span className="text-gray-400">Select roles...</span>
          ) : (
            selectedValues.map((role) => (
              <span
                key={role}
                className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-md font-medium flex items-center"
              >
                {formatRole(role)}
                <X
                  className="w-3 h-3 ml-1 cursor-pointer hover:text-orange-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(role);
                  }}
                />
              </span>
            ))
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-orange-50 cursor-pointer flex items-center space-x-3"
              onClick={() => toggleOption(option)}
            >
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center ${selectedValues.includes(option) ? "bg-orange-600 border-orange-600" : "border-gray-300"}`}
              >
                {selectedValues.includes(option) && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <span className="text-gray-700 text-sm">
                {formatRole(option)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
