import { useEffect, useState } from "react";
import { notify } from "../../utils/notify";
import { useSelector } from "react-redux";
import ChangePasswordModal from "../../components/ChangePasswordModal";

function Profile() {
  const [userData, setUserData] = useState();
  const [changePass, setChangePass] = useState(false);
  const currentuser = useSelector((state) => state.user.user);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/user/userDetails`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
        notify("Failed to fetch user data. Please try again.", "error");
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        notify("Profile updated successfully!", "success");
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
        notify("Failed to update profile. Please try again.", "error");
      });
  };

  return (
    <div className="bg-white overflow-hidden mt-16 md:mt-0">
      <div className="p-6 border-b border-gray-100 h-20">
        <h3 className="text-lg font-bold text-gray-900">
          Personal Information {userData?.firstName}
        </h3>
        <p className="text-sm text-gray-500">Update your details</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              onChange={handleInputChange}
              defaultValue={userData?.firstName}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              onChange={handleInputChange}
              defaultValue={userData?.lastName}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              defaultValue={userData?.email}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleInputChange}
              defaultValue={userData?.dob}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>

            <div className="flex justify-between w-full px-4 py-2.5 bg-gray-300 border border-gray-200 rounded-xl overflow-hidden gap-2">
              <input
                type="tel"
                name="mobileNo"
                // onChange={handleInputChange}
                defaultValue={userData?.mobileNo}
                disabled
                className="w-full focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <button className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm md:text-md font-medium rounded-xl shadow-md transition-all shrink-0 ">
                Change Number
              </button>
            </div>

            {!currentuser.roles.includes("USER") && (
              <div className="mt-4">
                <button
                  onClick={() => setChangePass(true)}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm md:text-md font-medium rounded-xl shadow-md transition-all shrink-0 "
                >
                  Change Password
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={handleUpdateProfile}
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-md transition-all"
          >
            Upadate Profile
          </button>
        </div>
      </div>

      {changePass && (
        <ChangePasswordModal
          isOpen={changePass}
          onClose={() => setChangePass(false)}
        />
      )}
    </div>
  );
}

export default Profile;
