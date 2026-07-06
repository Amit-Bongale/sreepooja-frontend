import { Plus, Search, IndianRupee, SquarePen, Book } from "lucide-react";

import { Link } from "react-router";
import { getStatusBadge } from "../../../utils/getStatusBadge";
import { useEffect, useState } from "react";
import { getData } from "../../../api/Api";

function MangeServices() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTearm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData("/admin/pooja-services");
      setServices(res);
    };

    fetchData();
  }, []);

  const filterdData = services.filter((s) =>
    s.serviceName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
              onChange={(e) => setSearchTearm(e.target.value)}
              placeholder="Search poojas..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
            />
          </div>
          <Link to={"/staff/services/add"}>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0">
              <Plus className="h-4 w-4" /> Add Service
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 space-y-6">
        {filterdData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filterdData.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-orange-50">
                  {service?.featured === true && (
                    <span className="bg-brand-100 absolute right-2 top-2 px-2 text-brand-700 border-brand-500 text-center text-sm font-bold rounded-2xl z-60">
                      Featured
                    </span>
                  )}
                  <img
                    src={`${
                      service.thumbnailImage
                        ? `${import.meta.env.VITE_API_BASE_URL}${service.thumbnailImage}`
                        : "/placeholder-image.jpg"
                    }`}
                    alt={service.serviceName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Container */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs flex justify-between font-bold text-orange-600 uppercase tracking-wider">
                    {service.categorySlug} {getStatusBadge(service.status)}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                    {service.serviceName}
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
                        <IndianRupee className="h-4 w-4" />{" "}
                        {service?.startingPrice == 0
                          ? "Custom"
                          : service?.startingPrice}
                      </div>
                    </div>
                    <Link to={`/staff/services/edit/${service.slug}`}>
                      <button className="bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors flex gap-2 items-center">
                        <SquarePen className="w-4 h-4" /> Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center min-h-[70vh] justify-center gap-2 py-10">
            <Book className="size-18 text-brand-500" />
            <h2 className="text-lg font-bold text-gray-900">
              No Service Found
            </h2>
            <p className="text-gray-500">
              Try adjusting your search or add new Service.
            </p>
            <Link to={"/staff/services/add"}>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0 mt-2">
                <Plus className="h-4 w-4" /> Add Service
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default MangeServices;
