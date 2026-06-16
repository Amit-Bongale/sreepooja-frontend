import { Command, Edit, Plus, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../../api/Api";
import AddCommunity from "../../../components/staff/contentManager/community/AddCommunity";
import EditCommunity from "../../../components/staff/contentManager/community/EditCommunity";

// const priest = {
//     name: "john",
//     age: 23,
//     city: "bengaluru",
//     state: "karnataka",
//     address: "location abcd",
//     mobileNo: 12232323234,
// }

function ManagePriests() {
  const [priests, setPriests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editCommunityData, setEditCommunityData] = useState({
    id: null,
    communityName: "",
    active: "",
  });

  const fetchCommunities = async () => {
    const data = await getData("/admin/masters/communities");
    console.log("Fetched communities:", data);
    setPriests(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCommunities();
  }, []);

  const filteredCommunities = priests.filter((community) =>
    community.communityName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
        {filteredCommunities.length > 0 ? (
          <table className="w-full text-left text-sm whitespace-nowrap rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold w-16">ID</th>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Mobile No</th>
                {/* <th className="px-6 py-4 font-bold">languages</th>
                <th className="px-6 py-4 font-bold">community</th> */}
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCommunities.map((data) => (
                <tr key={data.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                    COM-{data.id.toString().padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {data.communityName}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold border ${data.active ? "border-green-500 text-green-700 bg-green-100" : "border-red-500 text-red-700 bg-red-100"}`}
                    >
                      {data.active ? "Active" : "Inactive"}{" "}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      onClick={() => {
                        setEditCommunityData({
                          id: data.id,
                          communityName: data.communityName,
                          active: data.active,
                        });
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <button
                      className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                      onClick={() => {
                        setEditCommunityData({
                          id: data.id,
                          communityName: data.communityName,
                          active: data.active,
                        });
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <AddCommunity
          setIsAddModalOpen={setIsAddModalOpen}
          onSucess={fetchCommunities}
        />
      )}

      {isEditModalOpen && (
        <EditCommunity
          editCommunityData={editCommunityData}
          setIsEditModalOpen={setIsEditModalOpen}
          onSucess={fetchCommunities}
        />
      )}
    </div>
  );
}

export default ManagePriests