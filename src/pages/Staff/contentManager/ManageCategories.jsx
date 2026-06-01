import { Edit, Layers, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import AddCategory from "../../../components/staff/contentManager/category/AddCategory";
import EditCategory from "../../../components/staff/contentManager/category/EditCategory";
import { getCategories } from "../../../api/Api";

function ManageCategories() {
  const [CATEGORIES, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);

  const [editCategoryData, setEditCategoryData] = useState({
    id: null,
    categoryName: "",
    slug: "",
    status: "",
  });

  const fetchCategories = async () => {
    const data = await getCategories("/admin/service-categories");
    console.log("Fetched categories:", data);
    setCategories(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
            {status}
          </span>
        );
      case "INACTIVE":
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

  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50">
      <div className=" mt-16 md:mt-0 bg-white border overflow-hidden p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between md:h-18 gap-4">
        <h2 className="text-lg hidden md:flex font-bold text-gray-900 font-serif items-center gap-2">
          Manage Categories
        </h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search categories..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
              placeholder="Search categories..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none w-full sm:w-64"
            />
          </div>
          <button
            onClick={() => setIsAddCategoryModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" /> Add Category
          </button>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        {filteredCategories.length > 0 ? (
          <table className="w-full text-left text-sm whitespace-nowrap rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold w-16">ID</th>
                <th className="px-6 py-4 font-bold">Category Name</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                    CAT-{cat.id.toString().padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {cat.categoryName}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(cat.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                      onClick={() => {
                        setEditCategoryData({
                          id: cat.id,
                          categoryName: cat.categoryName,
                          slug: cat.slug,
                          status: cat.status,
                        });
                        setIsEditCategoryModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center min-h-[70vh] justify-center gap-2 py-10">
            <Layers className="size-18 text-brand-500" />
            <h2 className="text-lg font-bold text-gray-900"> No Category Found</h2>
            <p className="text-gray-500">
              Try adjusting your search or add new category.
            </p>
            <button
              onClick={() => setIsAddCategoryModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0 mt-2"
            >
              <Plus className="h-4 w-4" /> Add Category
            </button>
          </div>
        )}
      </div>

      {isAddCategoryModalOpen && (
        <AddCategory
          setIsAddCategoryModalOpen={setIsAddCategoryModalOpen}
          onSucess={fetchCategories}
        />
      )}

      {isEditCategoryModalOpen && (
        <EditCategory
          editCategoryData={editCategoryData}
          setIsEditCategoryModalOpen={setIsEditCategoryModalOpen}
          onSucess={fetchCategories}
        />
      )}
    </div>
  );
}

export default ManageCategories;
