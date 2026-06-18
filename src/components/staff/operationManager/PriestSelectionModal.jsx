import { useEffect, useState } from "react";
import { Search, X, ChevronRight, ChevronLeft } from "lucide-react";
import { getData } from "../../../api/Api";
import { PriestCard } from "./PriestCard";

const PriestSelectionModal = ({ onClose, onSelect }) => {
  const [filteredPriests, setFilteredPriests] = useState([]);
  const [totalPages, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCity, setSelectedCity] = useState();
  const [selectedCommunnity, setSelectedCommunity] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();

  const [languages, setLanguage] = useState([]);
  const [communities, setCommunity] = useState([]);
  const [cities, setCity] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedPriest, setSelectedPriest] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchPriests = async () => {
      const baseurl = `/admin/priests`;
      const queryParams = [];

      if (currentPage) {
        queryParams.push(`page=${currentPage - 1}`);
      }

      if (debouncedSearch) {
        queryParams.push(`mobileNumber=${debouncedSearch}`);
      }

      const finalUrl = `${baseurl}${queryParams.length > 0 ? `?${queryParams.join("&")}` : ""}`;

      const data = await getData(finalUrl);
      setFilteredPriests(data?.content);
      setTotalPage(data?.totalPages);
    };

    fetchPriests();
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    const fetchData = async () => {
      const languages = await getData("/masters/languages");
      setLanguage(languages);

      const community = await getData("/masters/communities");
      setCommunity(community);

      const cities = await getData("/masters/cities");
      setCity(cities);
    };

    fetchData();
  }, []);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCity("");
    setSelectedLanguage("");
    setSelectedCity("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-2 sm:p-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[95vh]">
        {/* Header */}
        <div className="border-b border-gray-300 px-4 sm:px-6 py-4 flex items-start justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Select Priest
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Choose a priest for the pooja booking
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="hidden sm:block sticky top-0 z-20 bg-white border-b border-gray-300 px-4 sm:px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
            {/* Search */}
            <div className="relative xl:col-span-2">
              <Search
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search name or mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 
                focus:outline-none focus:border-orange-500 "
              />
            </div>

            {/* Language */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5"
            >
              <option value="">All Languages</option>

              {languages.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.languageName}
                </option>
              ))}
            </select>

            {/* Community */}
            <select
              value={selectedCommunnity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="border  border-gray-300 rounded-lg px-3 py-2.5"
            >
              <option value="">All Communities</option>

              {communities.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.communityName}
                </option>
              ))}
            </select>

            {/* City */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5"
            >
              <option value="">All Cities</option>

              {cities.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.cityName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* No Results */}
          {filteredPriests.length === 0 && (
            <NoResults onClick={() => clearFilters()} />
          )}

          {/* Results */}
          {filteredPriests.length > 0 && (
            <>
              <div className="mb-4 text-sm text-slate-500">
                Showing {currentPage} Page out of {totalPages}
              </div>

              <div className="space-y-4">
                {filteredPriests.map((priest) => {
                  const selected =
                    selectedPriest?.priestId === priest?.priestId;
                  return (
                    <PriestCard
                      key={priest.id}
                      priest={priest}
                      selected={selected}
                      onClick={() => setSelectedPriest(priest)}
                    />
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
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 bg-white p-4 sm:p-5">
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto border border-gray-500 px-5 py-2.5 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              disabled={!selectedPriest}
              onClick={() => onSelect(selectedPriest)}
              className="
                w-full sm:w-auto
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-5
                py-2.5
                rounded-lg
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Select Priest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoResults = ({ onClick }) => (
  <div className="h-72 flex flex-col justify-center items-center">
    <Search size={50} className="text-slate-300" />

    <h3 className="font-semibold text-lg mt-4">No Results Found</h3>

    <p className="text-slate-500 mt-1">Try changing search or filters.</p>

    <button
      onClick={onClick}
      className="bg-brand-500 px-4 py-2 mt-4 text-white rounded-xl flex gap-1 items-center"
    >
      <X className="size-4 shrink-0" /> Clear Filter
    </button>
  </div>
);

export default PriestSelectionModal;
