import { User, IndianRupee, MapPin, Calendar, Search } from "lucide-react";
import { useState } from "react";

const BOOKINGS = [
  {
    id: "BKG-9012",
    title: "Aksharabhyasa Ceremony",
    date: "25 Oct 2023",
    time: "09:00 AM - 11:00 AM",
    location: "Home - Indiranagar, Bengaluru",
    status: "Confirmed",
    priest: "Pt. Ramachandra",
    amount: 4500,
    paymentStatus: "Advance Paid",
    image:
      "https://staticprintenglish.theprint.in/wp-content/uploads/2024/05/ANI-20240523043952.jpg",
  },
  {
    id: "BKG-8834",
    title: "Ganapathi Homa",
    date: "12 Nov 2023",
    time: "06:00 AM - 09:00 AM",
    location: "Office - HSR Layout, Bengaluru",
    status: "Pending",
    priest: "Assigning soon...",
    amount: 3500,
    paymentStatus: "Fully Paid",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo2PmOz7E1YJIougrOzitp4w2O74S41Os9Ww&s",
  },
  {
    id: "BKG-7541",
    title: "Satyanarayana Pooja",
    date: "10 Sep 2023",
    time: "04:00 PM - 07:00 PM",
    location: "Home - Indiranagar, Bengaluru",
    status: "Completed",
    priest: "Pt. Venkatesh",
    amount: 2100,
    paymentStatus: "Fully Paid",
    image:
      "https://temple.yatradham.org/public/Product/puja-rituals/puja-rituals_xI5GRJgO_202501012234350.jpg",
  },
];

function Bookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredBookings = BOOKINGS.filter((booking) => {
    // Search Matching
    const matchesSearch =
      booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.priest.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter Matching
    let matchesFilter = true;

    if (filterType === "Upcoming") {
      matchesFilter =
        booking.status === "Confirmed" || booking.status === "Pending";
    }

    if (filterType === "Past") {
      matchesFilter = booking.status === "Completed";
    }

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Completed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 mt-16 mb-4 md:mb-0 md:mt-0 sm:px-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 h-20">
        <h3 className="text-lg font-bold text-gray-900">All Bookings</h3>
        <div className="flex p-1 rounded-lg gap-2 md:gap-4">
          <div className="relative w-full flex-1">
            <Search className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-800" />
            <input
              type="text"
              placeholder="Search for Bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl text-sm transition-all outline-none"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-3 text-sm text-gray-800 font-medium focus:outline-none cursor-pointer bg-gray-100 rounded-xl"
          >
            <option value="All">All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Past">Past</option>
          </select>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="p-5 sm:px-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col md:flex-row gap-5">
              <img
                src={booking.image}
                alt={booking.title}
                className="w-full md:w-32 h-40 md:h-28 object-cover rounded-xl border border-gray-200"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-bold text-gray-500 mb-1 block">
                      Booking ID: {booking.id}
                    </span>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {booking.title}
                    </h4>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Date & Time</p>
                      <p className="font-medium text-gray-800">
                        {booking.date}, {booking.time.split("-")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Assigned Priest</p>
                      <p className="font-medium text-gray-800">
                        {booking.priest}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="truncate pr-2">
                      <p className="text-xs text-gray-400">Location</p>
                      <p
                        className="font-medium text-gray-800 truncate"
                        title={booking.location}
                      >
                        {booking.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100 gap-4">
                  <div>
                    <span className="text-xs text-gray-500 block">
                      Total Amount
                    </span>
                    <span className="font-bold text-gray-900 flex items-center text-lg">
                      <IndianRupee className="h-4 w-4" /> {booking.amount}
                      <span className="text-xs font-normal text-gray-500 ml-2">
                        ({booking.paymentStatus})
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                    {booking.status === "Completed" && (
                      <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg text-sm font-bold hover:bg-orange-100 transition-colors">
                        Rate & Review
                      </button>
                    )}
                    {booking.paymentStatus === "Advance Paid" && (
                      <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors flex items-center gap-1">
                        <IndianRupee className="h-4 w-4" /> Pay Remaining
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
