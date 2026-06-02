import { Plus, Search } from "lucide-react";

function ManageLocations() {
  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50">
      <div className=" mt-16 md:mt-0 bg-white border overflow-hidden p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between md:h-18 gap-4">
        <h2 className="text-lg hidden md:flex font-bold text-gray-900 font-serif items-center gap-2">
          Manage Locations
        </h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              //   onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Location..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
              placeholder="Search Location..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
            />
          </div>
          <button
            // onClick={() => setIsAddModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" /> Add Language
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageLocations;
