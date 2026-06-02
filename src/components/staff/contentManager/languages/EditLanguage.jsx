import { CheckIcon, X } from "lucide-react";
import { useState } from "react";
import { notify } from "../../../../Utils/notify";

function EditLanguage({ setIsEditModalOpen, editLanguageData, onSucess }) {
  let [data, setData] = useState(editLanguageData);
  let [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (data.languageName.trim() === "") {
      notify("Language name is required", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/masters/languages/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update category");
      }

      notify("Community updated successfully", "success");
      setIsEditModalOpen(false);
      onSucess();
    } catch (error) {
      notify("Failed to update Language", "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 font-serif">
            Edit Community
          </h3>
          <button
            onClick={() => setIsEditModalOpen(false)}
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
              name="languageName"
              value={data.languageName}
              onChange={(e) => {
                setData({
                  ...data,
                  languageName: e.target.value,
                });
              }}
              placeholder="e.g. Vastu Poojas"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Status
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors w-fit pr-6">
              <div className="relative flex items-center justify-center w-5 h-5">
                <input
                  type="checkbox"
                  checked={data.active}
                  onChange={(e) =>
                    setData({ ...data, active: e.target.checked })
                  }
                  className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-orange-500 checked:bg-orange-500 checked:border-orange-500 transition-all cursor-pointer"
                />
                <CheckIcon
                  className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100"
                  strokeWidth={3}
                />
              </div>
              <span className="text-sm font-bold text-gray-800">
                {data.active ? "Active" : "Inactive"}
              </span>
            </label>
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle save logic here
              handleSubmit();
            }}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md transition-colors"
          >
            {loading ? "Updating.." : "Update Language"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditLanguage;
