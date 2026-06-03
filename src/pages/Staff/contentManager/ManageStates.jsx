import { ChevronRight, Edit, MapPin, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../../api/Api";
import { Link } from "react-router";
import AddState from "../../../components/staff/contentManager/Locations/AddState";
import EditState from "../../../components/staff/contentManager/Locations/EditState";

function ManageStates() {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editData, setEditData] = useState({
    id: null,
    stateName: "",
    active: "",
  });

  const filteredData = locations.filter((loc) =>
    loc.stateName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const fetchLocations = async () => {
    const data = await getData("/admin/masters/states");
    console.log("Fetched languages:", data);
    setLocations(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLocations();
  }, []);

  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50">
      <div className=" mt-16 md:mt-0 bg-white border overflow-hidden p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between md:h-18 gap-4">
        <h2 className="text-lg hidden md:flex font-bold text-gray-900 font-serif items-center gap-2">
          Manage States
        </h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Location..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
              placeholder="Search Location..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" /> Add States
          </button>
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        {filteredData.length > 0 ? (
          <table className="w-full text-left text-sm whitespace-nowrap rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold w-16">ID</th>
                <th className="px-6 py-4 font-bold">stateName</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((data) => (
                <tr key={data.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                    ST-{data.id.toString().padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {data.stateName}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold border ${data.active ? "border-green-500 text-green-700 bg-green-100" : "border-red-500 text-red-700 bg-red-100"}`}
                    >
                      {data.active ? "Active" : "Inactive"}{" "}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-6">
                    <button
                      className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                      onClick={() => {
                        setEditData({
                          id: data.id,
                          stateName: data.stateName,
                          active: data.active,
                        });
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <Link to={`/staff/${data.stateName}/${data.id}/cities`}>
                      <span className="flex items-center border border-brand-500 text-brand-500 py-2 px-4 rounded-md gap-1 hover:bg-brand-50 ">
                        View Cities <ChevronRight className="size-4" />{" "}
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center min-h-[70vh] justify-center gap-2 py-10">
            <MapPin className="size-18 text-brand-500" />
            <h2 className="text-lg font-bold text-gray-900">
              No Locations Found
            </h2>
            <p className="text-gray-500 text-center">
              Try adjusting your search or add new Location.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0 mt-2"
            >
              <Plus className="h-4 w-4" /> Add Location
            </button>
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <AddState
          label={"State"}
          onSucess={fetchLocations}
          setIsAddModalOpen={setIsAddModalOpen}
        />
      )}

      {isEditModalOpen && (
        <EditState
          label={"State"}
          editData={editData}
          onSucess={fetchLocations}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}
    </div>
  );
}

export default ManageStates;
