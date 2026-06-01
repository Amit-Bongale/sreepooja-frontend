import { Plus, Search, IndianRupee, SquarePen } from "lucide-react";

import { Link } from "react-router";
const SERVICES_DATA = [
  {
    id: "SRV-01",
    title: "Aksharabhyasam Ceremony",
    category: "Ceremonies",
    basePrice: 2500,
    status: "Active",
  },
  {
    id: "SRV-02",
    title: "Ganapathi Homam",
    category: "Homam",
    basePrice: 3500,
    status: "Active",
  },
  {
    id: "SRV-03",
    title: "Navagraha Shanti",
    category: "Pariharam",
    basePrice: 4200,
    status: "Draft",
  },
  {
    id: "SRV-04",
    title: "Satyanarayan Pooja",
    category: "Poojas",
    basePrice: 2100,
    status: "Active",
  },
  {
    id: "SRV-05",
    title: "Chandi Homam",
    category: "Powerful Devi Homam",
    basePrice: 15000,
    status: "InActive",
  },
];

function MangeServices() {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
      case "Sent":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
            {status}
          </span>
        );
      case "Draft":
      case "Scheduled":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
            {status}
          </span>
        );
      case "InActive":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
            {status}
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50">
      <header className="h-18 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 mt-18 md:mt-0 shrink-0">
        <h1 className="text-xl font-serif font-bold text-gray-900 hidden md:block">
          Manage Services
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search poojas..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
            />
          </div>
          <Link to={"/staff/services/add"}>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0">
            <Plus className="h-4 w-4" /> Add Service
          </button> </Link>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 space-y-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-orange-50">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Container */}
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs flex justify-between font-bold text-orange-600 uppercase tracking-wider">
                  {service.category} {getStatusBadge(service.status)}
                </div>
                <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                  {service.title}
                </h3>

                {/* <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>
                      Duration:{" "}
                      <span className="font-medium text-gray-800">
                        {service.duration}
                      </span>
                    </span>
                  </div>
                </div> */}

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-xs text-gray-500 block">
                      Starts from
                    </span>
                    <div className="flex items-center text-gray-900 font-bold text-lg">
                      <IndianRupee className="h-4 w-4" /> {service.basePrice}
                    </div>
                  </div>
                  <Link to={"/edit/services/1"}>
                    <button className="bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors flex gap-2 items-center">
                      <SquarePen className="w-4 h-4" /> Edit
                    </button>{" "}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MangeServices;
