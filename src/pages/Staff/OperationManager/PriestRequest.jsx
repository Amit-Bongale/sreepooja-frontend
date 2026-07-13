import {
  ChevronLeft,
  ChevronRight,
  Command,
  MapPin,
  Phone,
  Plus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../../api/Api";
import ViewPriestDetails from "../../../components/staff/operationManager/ViewPriestDetails";

function PriestRequest() {
  const [priests, setPriests] = useState([]);
  const [totalPages, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const baseurl = `/admin/priests/pending`;
      const queryParams = [];

      if (currentPage) {
        queryParams.push(`page=${currentPage - 1}`);
      }

      const finalUrl = `${baseurl}${queryParams.length > 0 ? `?${queryParams.join("&")}` : ""}`;
      const data = await getData(finalUrl);
      setPriests(data.content);
      setTotalPage(data?.totalPages);
    };
    fetchData();
  }, [currentPage]);

  return (
    <div className="text-gray-800 antialiased min-h-screen bg-gray-50">
      <header className="h-18 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 mt-18 md:mt-0 shrink-0">
        <h1 className="text-xl font-serif font-bold text-gray-900 hidden md:block">
          Priest Requests
        </h1>
      </header>

      <main>
        <div className="overflow-x-auto">
          {priests.length > 0 ? (
            <div className="flex-1 overflow-y-auto sm:p-6">
              <div className="space-y-4">
                {priests.map((priest) => {
                  return (
                    <div
                        key={priest?.registrationId}
                      className={`w-full text-left rounded-xl border border-gray-300 transition-all`}
                    >
                      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden shrink-0">
                            {priest.priestPhotoUrl ? (
                              <img
                                src={`${import.meta.env.VITE_API_BASE_URL}${priest?.priestPhotoUrl}`}
                                alt={priest?.firstName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-semibold">
                                {priest?.firstName?.charAt(0)?.toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-lg">
                              {priest?.firstName} {priest?.lastName}
                            </h3>
                          </div>

                          <div className="flex items-center gap-2 text-slate-600 mt-2">
                            <Phone size={14} />
                            {priest?.mobileNumber}
                          </div>

                          <div className="flex flex-wrap gap-2 mt-3">

                            <Badge
                              icon={<Command size={14} />}
                              label={priest.community}
                            />

                            <Badge
                              icon={<MapPin size={14} />}
                              label={priest.city}
                            />
                          </div>
                        </div>

                        <div className="self-start sm:self-center">
                          <button
                            className="bg-brand-500 text-white px-4 py-2 rounded-md"
                            onClick={() => setSelectedId(priest.registrationId)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* --- PAGINATION --- */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 0}
                    className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                        currentPage === i + 1
                          ? "bg-orange-600 text-white shadow-md"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-orange-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center min-h-[70vh] justify-center gap-2 py-10">
              <Users className="size-18 text-brand-500" />
              <h2 className="text-lg font-bold text-gray-900">
                No Priest Found
              </h2>
              <p className="text-gray-500 text-center">
                Try adjusting your search or add new Priest.
              </p>

              <div className=" md:flex gap-4 flex-wrap">
                <button
                  // onClick={() => setIsAddModalOpen(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0 mt-2"
                >
                  <Plus className="h-4 w-4" /> Add Priest
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {selectedId && (
        <ViewPriestDetails
          onClose={() => setSelectedId(null)}
          priestId={selectedId}
          status="pending"
        />
      )}
    </div>
  );
}

export default PriestRequest;

const Badge = ({ icon, label }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-slate-100 text-sm">
    {icon}
    {label}
  </span>
);
