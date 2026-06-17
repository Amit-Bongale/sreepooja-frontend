import { useMemo, useState } from "react";
import {
  Search,
  Phone,
  MapPin,
  Languages,
  Users,
  CheckCircle2,
  X,
} from "lucide-react";

const priests = [
  {
    id: "1",
    name: "Sri Venkatesh Sharma",
    mobile: "9876543210",
    language: "Kannada",
    community: "Smartha",
    city: "Bangalore",
  },
  {
    id: "2",
    name: "Sri Hari Narayanan",
    mobile: "9988776655",
    language: "Tamil",
    community: "Iyer",
    city: "Chennai",
  },
  {
    id: "0",
    name: "Sri Hari Narayanan",
    mobile: "9988776655",
    language: "Tamil",
    community: "Iyer",
    city: "Chennai",
  },
  {
    id: "4",
    name: "Sri Hari Narayanan",
    mobile: "9988776655",
    language: "Tamil",
    community: "Iyer",
    city: "Chennai",
  },
  {
    id: "4",
    name: "Sri Hari Narayanan",
    mobile: "9988776655",
    language: "Tamil",
    community: "Iyer",
    city: "Chennai",
  },
  {
    id: "6",
    name: "Sri Hari Narayanan",
    mobile: "9988776655",
    language: "Tamil",
    community: "Iyer",
    city: "Chennai",
  },
  {
    id: "7",
    name: "Sri Hari Narayanan",
    mobile: "9988776655",
    language: "Tamil",
    community: "Iyer",
    city: "Chennai",
  },
  {
    id: "8",
    name: "Sri Hari Narayanan",
    mobile: "9988776655",
    language: "Tamil",
    community: "Iyer",
    city: "Chennai",
  },
];

const PriestSelectionModal = ({ loading = false, onClose, onSelect }) => {
  const [selectedId, setSelectedId] = useState(null);

  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("");
  const [community, setCommunity] = useState("");
  const [city, setCity] = useState("");

  const languages = [...new Set(priests.map((item) => item.language))];

  const communities = [...new Set(priests.map((item) => item.community))];

  const cities = [...new Set(priests.map((item) => item.city))];

  const filteredPriests = useMemo(() => {
    return priests.filter((priest) => {
      const searchMatch =
        priest.name?.toLowerCase().includes(search.toLowerCase()) ||
        priest.mobile?.includes(search);

      const languageMatch = !language || priest.language === language;

      const communityMatch = !community || priest.community === community;

      const cityMatch = !city || priest.city === city;

      return searchMatch && languageMatch && communityMatch && cityMatch;
    });
  }, [search, language, community, city]);

  const selectedPriest = priests.find((item) => item.id === selectedId);

  const clearFilters = () => {
    setSearch("");
    setLanguage("");
    setCommunity("");
    setCity("");
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className=" w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 
                focus:outline-none focus:border-orange-500 "
              />
            </div>

            {/* Language */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5"
            >
              <option value="">All Languages</option>

              {languages.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            {/* Community */}
            <select
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              className="border  border-gray-300 rounded-lg px-3 py-2.5"
            >
              <option value="">All Communities</option>

              {communities.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            {/* City */}
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5"
            >
              <option value="">All Cities</option>

              {cities.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Active Filters */}
          {(search || language || community || city) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {language && (
                <FilterChip label={language} onRemove={() => setLanguage("")} />
              )}

              {community && (
                <FilterChip
                  label={community}
                  onRemove={() => setCommunity("")}
                />
              )}

              {city && <FilterChip label={city} onRemove={() => setCity("")} />}

              <button
                onClick={clearFilters}
                className="text-sm text-orange-600 font-medium"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-28 rounded-xl bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && priests.length === 0 && <EmptyState />}

          {/* No Results */}
          {!loading && priests.length > 0 && filteredPriests.length === 0 && (
            <NoResults />
          )}

          {/* Results */}
          {!loading && filteredPriests.length > 0 && (
            <>
              <div className="mb-4 text-sm text-slate-500">
                Showing {filteredPriests.length} priest
                {filteredPriests.length > 1 ? "s" : ""}
              </div>

              <div className="space-y-4">
                {filteredPriests.map((priest) => {
                  const selected = selectedId === priest.id;

                  return (
                    <PriestCard
                      key={priest.id}
                      priest={priest}
                      selected={selected}
                      onClick={() => setSelectedId(priest.id)}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 bg-white p-4 sm:p-5">
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto border border-gray-500 px-5 py-2.5 rounded-lg hover:bg-gray-100"
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

const PriestCard = ({ priest, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        text-left
        rounded-xl
        border 
        transition-all
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
            {priest.avatar ? (
              <img
                src={priest.avatar}
                alt={priest.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-semibold">
                {priest.name?.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-lg">{priest.name}</h3>

            {selected && <CheckCircle2 size={18} className="text-orange-500" />}
          </div>

          <div className="flex items-center gap-2 text-slate-600 mt-2">
            <Phone size={14} />
            {priest.mobile}
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge icon={<Languages size={14} />} label={priest.language} />

            <Badge icon={<Users size={14} />} label={priest.community} />

            <Badge icon={<MapPin size={14} />} label={priest.city} />
          </div>
        </div>

        <div className="self-start sm:self-center">
          <div
            className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${selected ? "border-orange-500" : "border-slate-300"}
            `}
          >
            {selected && <div className="w-3 h-3 rounded-full bg-orange-500" />}
          </div>
        </div>
      </div>
    </button>
  );
};

const Badge = ({ icon, label }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-slate-100 text-sm">
    {icon}
    {label}
  </span>
);

const FilterChip = ({ label, onRemove }) => (
  <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-sm">
    {label}
    <button onClick={onRemove}>
      <X size={14} />
    </button>
  </div>
);

const EmptyState = () => (
  <div className="h-72 flex flex-col justify-center items-center">
    <Users size={50} className="text-slate-300" />

    <h3 className="font-semibold text-lg mt-4">No Priests Available</h3>

    <p className="text-slate-500 mt-1">No priest records found.</p>
  </div>
);

const NoResults = () => (
  <div className="h-72 flex flex-col justify-center items-center">
    <Search size={50} className="text-slate-300" />

    <h3 className="font-semibold text-lg mt-4">No Results Found</h3>

    <p className="text-slate-500 mt-1">Try changing search or filters.</p>
  </div>
);

export default PriestSelectionModal;
