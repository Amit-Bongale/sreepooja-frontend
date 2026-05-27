const USER_DATA = {
  firstName: "Rahul ",
  lastName: "Sharma",
  email: "rahul.sharma@example.com",
  mobileNo: "+91 98765 43210",
  dob: "15-05-1990",
  avatar:
    "https://ui-avatars.com/api/?name=Rahul+Sharma&background=ea580c&color=fff",
};

function Profile() {
  return (
    <div className="bg-white overflow-hidden mt-16 md:mt-0">
      <div className="p-6 border-b border-gray-100 h-20">
        <h3 className="text-lg font-bold text-gray-900">
          Personal Information
        </h3>
        <p className="text-sm text-gray-500">
          Update your details
        </p>
      </div>
      <div className="p-6">
        {/* <div className="flex items-center gap-4 mb-8">
          <img
            src={USER_DATA.avatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full shadow-sm"
          />
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              defaultValue={USER_DATA.firstName}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              defaultValue={USER_DATA.lastName}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue={USER_DATA.email}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue={USER_DATA.mobileNo}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              defaultValue={USER_DATA.dob}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-md transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
