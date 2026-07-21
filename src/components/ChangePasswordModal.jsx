import { useState } from "react";
import { notify } from "../Utils/notify";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!form.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    }

    if (
      form.newPassword &&
      form.confirmPassword &&
      form.newPassword !== form.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      let payload = {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/staff/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        notify(data.message, "error");
        return;
      }

      notify("Password Changed Successfully", "success");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        <div className="mb-6 bg-brand-500 p-4 text-white ">
          <h2 className="text-2xl font-semibold">Change Password</h2>
          <p className="mt-1 text-sm">Update your account password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Current Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Current Password
            </label>

            <div className="flex overflow-hidden rounded-lg border border-gray-300 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-200">
              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="flex-1 px-4 py-2.5 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    current: !showPassword.current,
                  })
                }
                className="px-4 text-sm font-medium text-brand-600 hover:bg-gray-100"
              >
                {showPassword.current ? "Hide" : "Show"}
              </button>
            </div>

            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              New Password
            </label>

            <div className="flex overflow-hidden rounded-lg border border-gray-300 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-200">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="flex-1 px-4 py-2.5 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    new: !showPassword.new,
                  })
                }
                className="px-4 text-sm font-medium text-brand-600 hover:bg-gray-100"
              >
                {showPassword.new ? "Hide" : "Show"}
              </button>
            </div>

            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>

            <div className="flex overflow-hidden rounded-lg border border-gray-300 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-200">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="flex-1 px-4 py-2.5 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirm: !showPassword.confirm,
                  })
                }
                className="px-4 text-sm font-medium text-brand-600 hover:bg-gray-100"
              >
                {showPassword.confirm ? "Hide" : "Show"}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brand-600 px-5 py-2 font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-100"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
