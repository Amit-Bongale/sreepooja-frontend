import { useState } from "react";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  FileText,
  Globe,
  Tags,
  Package,
  UploadCloud,
  Check,
} from "lucide-react";
import { Link } from "react-router";

function AddService() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // --- DUMMY DATA FOR DROPDOWNS ---
  const CATEGORIES = [
    { id: 1, name: "Ceremonies" },
    { id: 2, name: "Homam" },
    { id: 3, name: "Poojas" },
    { id: 4, name: "Pariharam" },
  ];
  const LANGUAGES = [
    { id: 1, name: "Sanskrit" },
    { id: 2, name: "Tamil" },
    { id: 3, name: "Telugu" },
    { id: 4, name: "Hindi" },
    { id: 5, name: "Kannada" },
  ];
  const COMMUNITIES = [
    { id: 1, name: "All" },
    { id: 2, name: "Smartha" },
    { id: 3, name: "Vaishnava" },
  ];
  const CITIES = [
    { id: 1, name: "Bengaluru" },
    { id: 2, name: "Chennai" },
    { id: 3, name: "Hyderabad" },
    { id: 4, name: "Mumbai" },
  ];

  const PACKAGE_TYPES = ["CLASSIC", "PREMIUM", "PLATINUM", "CUSTOM"];

  const initialPackageState = {
    packageType: "CLASSIC",
    shortDescription: "",
    includedItems: "",
    price: "",
    advancePercentage: "",
    durationMinutes: "",
    active: true,
  };

  const [formData, setFormData] = useState({
    serviceName: "",
    slug: "",
    categoryId: "",
    shortDescription: "",
    fullDescription: "",
    benefits: "",
    durationMinutes: "",
    status: "ACTIVE", // ACTIVE, DRAFT, ARCHIVED
    featured: false,
    cancellationAllowed: true,
    refundAllowed: true,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    languageIds: [],
    communityIds: [],
    cityIds: [],
    packages: [{ ...initialPackageState }],
  });

  const [files, setFiles] = useState({
    thumbnailImage: null,
    bannerImage: null,
  });

  // --- FORM HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Auto-generate slug from serviceName
    if (name === "serviceName" && !formData.slug) {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, [name]: value, slug: autoSlug }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelectChange = (e, field) => {
    const options = e.target.options;
    const values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(Number(options[i].value));
      }
    }
    setFormData((prev) => ({ ...prev, [field]: values }));
  };

  const handleFileChange = (e, field) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({ ...prev, [field]: e.target.files[0] }));
    }
  };

  // --- PACKAGE HANDLERS ---
  const handleAddPackage = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, { ...initialPackageState }],
    }));
  };

  const handleRemovePackage = (index) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
    }));
  };

  const handlePackageChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedPackages = [...formData.packages];
    updatedPackages[index] = {
      ...updatedPackages[index],
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData((prev) => ({ ...prev, packages: updatedPackages }));
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate creating FormData for multipart/form-data upload
    const submitData = new FormData();

    // Append JSON data as a Blob or String (depending on backend config, usually stringified JSON part)
    submitData.append(
      "request",
      new Blob([JSON.stringify(formData)], { type: "application/json" }),
    );

    // Append Files
    if (files.thumbnailImage)
      submitData.append("thumbnailImage", files.thumbnailImage);
    if (files.bannerImage) submitData.append("bannerImage", files.bannerImage);

    console.log("Submitting Payload to /pooja-services:", formData);
    console.log("Files attached:", files);

    // Simulate API Call delay
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50 flex">
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="max-w-5xl mx-auto space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6 pb-20 relative">
            {/* Form Header & Actions */}
            <div className="flex mt-16 md:mt-0 flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <Link to={"/staff/services"}>
                <button
                  type="button"
                  className="text-gray-500 hover:text-orange-600 font-medium flex items-center gap-2 transition-colors w-fit"
                >
                  <ArrowLeft className="h-5 w-5" /> Back to Services
                </button>
              </Link>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>{" "}
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-5 w-5" /> Publish Service
                    </span>
                  )}
                </button>
              </div>
            </div>

            {showSuccessMessage && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 flex items-center gap-3">
                <Check className="h-5 w-5" /> Service successfully created!
                Redirecting...
              </div>
            )}

            {/* SECTION 1: General Info */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-5 flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-500" /> General
                Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Service Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="serviceName"
                    value={formData.serviceName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. Navagraha Shanti"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="navagraha-shanti"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    name="durationMinutes"
                    value={formData.durationMinutes}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="e.g. 120"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Short Description
                  </label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Brief summary of the pooja..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Full Description
                  </label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Detailed explanation..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Benefits (Comma separated or bullet points)
                  </label>
                  <textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="List the divine benefits..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* SECTION 2: Media */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-5 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-orange-500" /> Media & Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Thumbnail Image
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-6 h-6 mb-2 text-gray-500" />
                      <p className="text-xs text-gray-500 font-medium">
                        {files.thumbnailImage
                          ? files.thumbnailImage.name
                          : "Click to upload thumbnail"}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "thumbnailImage")}
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Banner Image
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-6 h-6 mb-2 text-gray-500" />
                      <p className="text-xs text-gray-500 font-medium">
                        {files.bannerImage
                          ? files.bannerImage.name
                          : "Click to upload hero banner"}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "bannerImage")}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* SECTION 3: Attributes & Settings */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Tags className="h-5 w-5 text-orange-500" /> Availability &
                Attributes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Languages (Hold Ctrl/Cmd to multi-select)
                  </label>
                  <select
                    multiple
                    name="languageIds"
                    value={formData.languageIds}
                    onChange={(e) => handleMultiSelectChange(e, "languageIds")}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none h-28"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Communities
                  </label>
                  <select
                    multiple
                    name="communityIds"
                    value={formData.communityIds}
                    onChange={(e) => handleMultiSelectChange(e, "communityIds")}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none h-28"
                  >
                    {COMMUNITIES.map((com) => (
                      <option key={com.id} value={com.id}>
                        {com.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Serving Cities
                  </label>
                  <select
                    multiple
                    name="cityIds"
                    value={formData.cityIds}
                    onChange={(e) => handleMultiSelectChange(e, "cityIds")}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none h-28"
                  >
                    {CITIES.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Featured
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="cancellationAllowed"
                    checked={formData.cancellationAllowed}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Cancellation Allowed
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="refundAllowed"
                    checked={formData.refundAllowed}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Refund Allowed
                  </span>
                </label>
                <div>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 outline-none"
                  >
                    <option value="ACTIVE">Status: ACTIVE</option>
                    <option value="DRAFT">Status: DRAFT</option>
                    <option value="ARCHIVED">Status: ARCHIVED</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 4: SEO */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Globe className="h-5 w-5 text-orange-500" /> SEO Meta Data
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Meta Title
                  </label>
                  <input
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Meta Keywords
                  </label>
                  <input
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="hindu rituals, online pooja, etc."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 5: Dynamic Packages */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-500" /> Service
                  Packages
                </h2>
                <button
                  type="button"
                  onClick={handleAddPackage}
                  className="bg-orange-50 text-orange-600 hover:bg-orange-100 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                >
                  <Plus className="h-4 w-4" /> Add Package
                </button>
              </div>

              {formData.packages.length === 0 && (
                <p className="text-gray-500 text-center py-6 border-2 border-dashed rounded-xl">
                  No packages added. Click above to add one.
                </p>
              )}

              <div className="space-y-6">
                {formData.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="relative p-5 rounded-xl border border-gray-200 bg-gray-50 group"
                  >
                    {/* Delete Package Button */}
                    {formData.packages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePackage(index)}
                        className="absolute -top-3 -right-3 bg-white border border-gray-200 text-red-500 p-1.5 rounded-full shadow-sm hover:bg-red-50 transition-colors"
                        title="Remove Package"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                      <div className="md:col-span-3">
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Package Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          name="packageType"
                          value={pkg.packageType}
                          onChange={(e) => handlePackageChange(index, e)}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none text-sm"
                        >
                          {PACKAGE_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Price (₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="number"
                          step="0.01"
                          min="0"
                          name="price"
                          value={pkg.price}
                          onChange={(e) => handlePackageChange(index, e)}
                          placeholder="0.00"
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none text-sm"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Advance % <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          name="advancePercentage"
                          value={pkg.advancePercentage}
                          onChange={(e) => handlePackageChange(index, e)}
                          placeholder="20"
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none text-sm"
                        />
                      </div>
                      <div className="md:col-span-3 flex items-end pb-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="active"
                            checked={pkg.active}
                            onChange={(e) => handlePackageChange(index, e)}
                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <span className="text-sm font-bold text-gray-700">
                            Is Active
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Short Description{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          name="shortDescription"
                          value={pkg.shortDescription}
                          onChange={(e) => handlePackageChange(index, e)}
                          placeholder="e.g. Only Priest Services"
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Included Items (Newline separated)
                        </label>
                        <textarea
                          name="includedItems"
                          value={pkg.includedItems}
                          onChange={(e) => handlePackageChange(index, e)}
                          rows="2"
                          placeholder="- Priest&#10;- Pooja Items"
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none text-sm resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddService;
