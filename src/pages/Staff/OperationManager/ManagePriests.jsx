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
} from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../../api/Api";
import AddPriestModal from "../../../components/staff/operationManager/AddPriestModal";

function ManagePriests() {
  const [priests, setPriests] = useState([
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
      id: "14",
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
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [language, setLanguage] = useState("");
  const [community, setCommunity] = useState("");
  const [city, setCity] = useState("");

  const fetchPriests = async () => {
    // const data = await getData("/admin/masters/communities");
    // console.log("Fetched communities:", data);
    // setPriests(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPriests();
  }, []);

  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50">
      <div className=" mt-16 md:mt-0 bg-white border overflow-hidden p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between md:h-18 gap-4">
        <h2 className="text-lg hidden md:flex font-bold text-gray-900 font-serif items-center gap-2">
          Manage Priests
        </h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search communities..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
              placeholder="Search by name..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" /> Add Priest
          </button>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        {priests.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="space-y-4">
              {priests.map((priest) => {
                return (
                  <PriestCard
                    key={priest.id}
                    priest={priest}
                    onClick={() => setSelectedId(priest.id)}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center min-h-[70vh] justify-center gap-2 py-10">
            <Command className="size-18 text-brand-500" />
            <h2 className="text-lg font-bold text-gray-900">
              {" "}
              No Community Found
            </h2>
            <p className="text-gray-500 text-center">
              Try adjusting your search or add new Community.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0 mt-2"
            >
              <Plus className="h-4 w-4" /> Add Community
            </button>
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <AddPriestModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}

export default ManagePriests;

const PriestCard = ({ priest, selected, onClick }) => {
  return (
    <div
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
          <button className="bg-brand-500 text-white px-4 py-2 rounded-md">
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
