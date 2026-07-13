/* eslint-disable no-unused-vars */
import {
  Command,
  Plus,
  Search,
  Phone,
  MapPin,
  Languages,
  Users,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Filter,
  X,
  Dot,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../../api/Api";
import AddPriestModal from "../../../components/staff/operationManager/AddPriestModal";
import { notify } from "../../../utils/notify";
import ViewPriestDetails from "../../../components/staff/operationManager/ViewPriestDetails";

function ManagePriests() {
  const [priests, setPriests] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [languages, setLanguages] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [cities, setCities] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedCommunity, setSelectedCommunity] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const languages = await getData("/masters/languages");
      setLanguages(languages);

      const community = await getData("/masters/communities");
      setCommunities(community);

      const cities = await getData("/masters/cities");
      setCities(cities);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchPriests = async () => {
    const baseurl = `/admin/priests`;
    const queryParams = [];

    if (currentPage) {
      queryParams.push(`page=${currentPage - 1}`);
    }

    if (debouncedSearch) {
      queryParams.push(`mobileNumber=${debouncedSearch}`);
    }

    if (selectedCommunity) {
      queryParams.push(`trimathastharu=${selectedCommunity}`);
    }

    if (selectedLanguage) {
      queryParams.push(`languageId=${selectedLanguage}`);
    }

    if (selectedCity) {
      queryParams.push(`cityId=${selectedCity}`);
    }

    const finalUrl = `${baseurl}${queryParams.length > 0 ? `?${queryParams.join("&")}` : ""}`;

    const data = await getData(finalUrl);

    setPriests(data?.content);
    setTotalPage(data?.totalPages);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPriests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    debouncedSearch,
    searchQuery,
    selectedCity,
    selectedCommunity,
    selectedLanguage,
  ]);

  const clearFilter = () => {
    setSelectedCity("");
    setShowFilters(false);
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedLanguage("");
    setSelectedCommunity("");
  };

  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50">
      <div className=" mt-16 md:mt-0 bg-white border overflow-hidden p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between md:h-18 gap-4">
        <h2 className="text-lg hidden md:flex font-bold text-gray-900 font-serif items-center gap-2">
          Manage Priests
        </h2>
        <div
          className="flex gap-3 items-center
        "
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search communities..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
              placeholder="Search by name..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
            />
          </div>

          <button
            className="size-5 text-gray-400 mr-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter />
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" /> Add Priest
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white border-b border-gray-300 p-4 flex flex-wrap gap-4 md:justify-center">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2.5 w-full md:w-fit"
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
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            className="border  border-gray-300 rounded-lg px-3 py-2.5 w-full md:w-fit"
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
            className="border border-gray-300 rounded-lg px-3 py-2.5 w-full md:w-fit"
          >
            <option value="">All Cities</option>

            {cities.map((item) => (
              <option key={item?.id} value={item?.id}>
                {item?.cityName}
              </option>
            ))}
          </select>

          <button
            className="bg-brand-500 text-white py-2 px-4 rounded-xl shrink-0 flex items-center gap-1"
            onClick={() => clearFilter()}
          >
            <X className="size-5" /> Clear Filter
          </button>
        </div>
      )}

      <div className="overflow-x-auto p-4">
        {priests.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="space-y-4">
              {priests.map((priest) => {
                return (
                  <PriestCard
                    key={priest.priestId}
                    priest={priest}
                    onClick={() => setSelectedId(priest.priestId)}
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
          </div>
        ) : (
          <div className="flex flex-col items-center min-h-[70vh] justify-center gap-2 py-10">
            <Users className="size-18 text-brand-500" />
            <h2 className="text-lg font-bold text-gray-900">No Priest Found</h2>
            <p className="text-gray-500 text-center">
              Try adjusting your search or add new Priest.
            </p>

            <div className=" md:flex gap-4 flex-wrap">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0 mt-2"
              >
                <Plus className="h-4 w-4" /> Add Priest
              </button>

              <button
                onClick={() => clearFilter()}
                className="border border-orange-600 hover:bg-orange-100 text-brand-500 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0 mt-2"
              >
                <X className="h-4 w-4" /> Clear Filter
              </button>
            </div>
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <AddPriestModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            notify("Priest Added Successfully", "success");
            setIsAddModalOpen(false);
            fetchPriests();
          }}
        />
      )}

      {selectedId && (
        <ViewPriestDetails
          onClose={() => setSelectedId(null)}
          priestId={selectedId}
        />
      )}
    </div>
  );
}

export default ManagePriests;

const PriestCard = ({ priest, selected, onClick }) => {
  return (
    <div
      className={`w-full text-left rounded-xl border transition-all
        ${
          selected
            ? "border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-200"
            : "border-slate-200 hover:border-orange-300 hover:bg-orange-50/40"
        }
      `}
    >
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
        {/* Avatar */}
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
              icon={<Languages size={14} />}
              label={priest?.languages.join(", ")}
            />

            <Badge icon={<Users size={14} />} label={priest.communityName} />

            <Badge icon={<MapPin size={14} />} label={priest.city} />
          </div>
        </div>

        <div className="self-start gap-2 sm:self-center">
          <div>
            {priest?.active ? (
              <span className="bg-green-200 w-fit py-1 px-4 mb-4 rounded-2xl flex shrink-0 text-xs items-center justify-center border border-green-700">
                <Dot className="size-6" /> Active
              </span>
            ) : (
              <span className="bg-red-200 w-fit py-1 px-4 mb-4 rounded-2xl flex shrink-0 text-xs items-center justify-center border border-red-700">
                <Dot className="size-6" /> Inactive
              </span>
            )}
          </div>
          <button
            onClick={onClick}
            className="bg-brand-500 text-white px-4 py-2 rounded-md"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ icon, label }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-slate-100 text-sm">
    {icon}
    {label}
  </span>
);
