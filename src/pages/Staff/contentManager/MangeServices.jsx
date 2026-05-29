import {
  Plus,
  Edit,
  Trash2,
  Search,
  IndianRupee,
} from "lucide-react";

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
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-serif font-bold text-gray-900  sm:block">
            Manage Services
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search poojas..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
            />
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0">
            <Plus className="h-4 w-4" /> Add Service
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-bold">Service Title</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Base Price</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SERVICES_DATA.map((srv) => (
                  <tr key={srv.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{srv.title}</div>
                      <div className="text-xs text-gray-500">{srv.id}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{srv.category}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center mt-2">
                      <IndianRupee className="h-3 w-3 mr-0.5" /> {srv.basePrice}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(srv.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MangeServices;
