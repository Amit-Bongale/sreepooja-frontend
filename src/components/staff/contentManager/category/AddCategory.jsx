import { X } from "lucide-react";
import { useState } from "react";
import { notify } from "../../../../Utils/notify";

function AddCategory({ setIsAddCategoryModalOpen, onSucess }) {
  const [data, setData] = useState({
    categoryName: "",
    slug: "",
    status: "ACTIVE"
  });

  const handleSubmit = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/service-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      notify("Failed to add category", "error");
      throw new Error("Failed to add category");
    }

    notify("Category Added Successfully", "success");
    setIsAddCategoryModalOpen(false);
    setData({ categoryName: "", slug: "" });
    onSucess();
  };

  return (
    <div className="fixed inset-0 z-60 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 font-serif">
            Add New Category
          </h3>
          <button
            onClick={() => setIsAddCategoryModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.categoryName}
              onChange={(e) =>
                setData({ ...data, categoryName: e.target.value })
              }
              placeholder="e.g. Vastu Poojas"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => setData({ ...data, slug: e.target.value })}
              placeholder="e.g. vastu-poojas"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all"
            />
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button
            onClick={() => setIsAddCategoryModalOpen(false)}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md transition-colors"
          >
            Save Category
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
