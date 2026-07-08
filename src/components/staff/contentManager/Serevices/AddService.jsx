import { useEffect, useState } from "react";
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
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { getData } from "../../../../api/Api";
import SlugGenerator from "../../../../utils/SlugGenerator";
import { notify } from "../../../../Utils/notify";

function AddService() {
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);

  const [CATEGORIES, setCategories] = useState([]);
  const [LANGUAGES, setLanguages] = useState([]);
  const [COMMUNITY, setCommunity] = useState([]);
  const [CITIES, setCities] = useState([]);

  const initialPackageState = {
    packageType: "CLASSIC",
    shortDescription: "",
    includedItems: "",
    price: "",
    advancePercentage: "",
    durationMinutes: "",
    status: "ACTIVE",
  };

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getData("/pooja-services/categories");
      setCategories(categories);

      const languages = await getData("/masters/languages");
      setLanguages(languages);

      const community = await getData("/masters/communities");
      setCommunity(community);

      const cities = await getData("/masters/cities");
      setCities(cities);
    };

    fetchData();
  }, []);

  const PACKAGE_TYPES = ["", "CLASSIC", "PLATINUM"];

  const [formData, setFormData] = useState({
    serviceName: "",
    slug: "",
    categorySlug: "",
    shortDescription: "",
    fullDescription: "",
    benefits: "",
    durationMinutes: "",
    status: "ACTIVE",
    featured: false,
    cancellationAllowed: true,
    refundAllowed: true,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    languageIds: [],
    communityIds: [],
    cityIds: [],
    packages: [],
    enableCustomPackage: false,
  });

  const [files, setFiles] = useState({
    thumbnailImage: null,
    bannerImage: null,
  });

  const [preview, setPreview] = useState({
    thumbnailImage: null,
    bannerImage: null,
  });

  // --- FORM HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (field, id) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter((item) => item !== id)
        : [...prev[field], id],
    }));
  };

  const handleSelectAll = (field, items, checked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked ? items.map((item) => item.id) : [],
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];

    if (!file) return;

    setFiles((prev) => ({
      ...prev,
      [field]: file,
    }));

    setPreview((prev) => ({
      ...prev,
      [field]: URL.createObjectURL(file),
    }));
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

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/pooja-services`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: submitData,
        },
      );
      if (!res.ok) {
        const data = await res.json();
        notify(data.message || "Failed to create service", "error");
        throw new Error("Failed to create service");
      }
      notify("Service Created Successfully", "success");
      setIsSaving(false);
      navigate("/staff/services");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSaving(false);
    }
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
            </div>

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
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        serviceName: e.target.value,
                        slug: SlugGenerator(e.target.value),
                      });
                    }}
                    type="text"
                    placeholder="e.g. Navagraha Shanti"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    name="categorySlug"
                    value={formData.categorySlug}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.categoryName}
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
                    rows="3"
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
                    rows="6"
                    placeholder="Detailed explanation..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Benefits (` - ` separated)
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

                  <label className="flex items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden">
                    {preview.thumbnailImage ? (
                      <img
                        src={preview.thumbnailImage}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <UploadCloud className="w-6 h-6 mb-2 text-gray-500" />
                        <p className="text-xs text-gray-500 font-medium">
                          Click to upload thumbnail
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "thumbnailImage")}
                    />
                  </label>

                  {files.thumbnailImage && (
                    <p className="mt-2 text-xs text-gray-500">
                      Click the image to change it
                    </p>
                  )}
                </div>

                {/* <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Banner Image
                  </label>

                  <label className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden">
                    {preview.bannerImage ? (
                      <img
                        src={preview.bannerImage}
                        alt="Banner Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <UploadCloud className="w-6 h-6 mb-2 text-gray-500" />
                        <p className="text-xs text-gray-500 font-medium">
                          Click to upload banner
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "bannerImage")}
                    />
                  </label>

                  {files.bannerImage && (
                    <p className="mt-2 text-xs text-gray-500">
                      Click the image to change it
                    </p>
                  )}
                </div> */}
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
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Languages
                  </label>

                  <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 max-h-52 overflow-y-auto">
                    <label className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-300">
                      <input
                        type="checkbox"
                        checked={
                          LANGUAGES.length > 0 &&
                          formData.languageIds.length === LANGUAGES.length
                        }
                        onChange={(e) =>
                          handleSelectAll(
                            "languageIds",
                            LANGUAGES,
                            e.target.checked,
                          )
                        }
                      />
                      <span className="font-semibold text-orange-600">
                        Select All
                      </span>
                    </label>

                    {LANGUAGES.map((lang) => (
                      <label
                        key={lang.id}
                        className="flex items-center gap-2 py-1 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.languageIds.includes(lang.id)}
                          onChange={() =>
                            handleCheckboxChange("languageIds", lang.id)
                          }
                        />
                        <span>{lang.languageName}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Communities
                  </label>

                  <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 max-h-52 overflow-y-auto">
                    <label className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-300">
                      <input
                        type="checkbox"
                        checked={
                          COMMUNITY.length > 0 &&
                          formData.communityIds.length === COMMUNITY.length
                        }
                        onChange={(e) =>
                          handleSelectAll(
                            "communityIds",
                            COMMUNITY,
                            e.target.checked,
                          )
                        }
                      />
                      <span className="font-semibold text-orange-600">
                        Select All
                      </span>
                    </label>

                    {COMMUNITY.map((com) => (
                      <label
                        key={com.id}
                        className="flex items-center gap-2 py-1 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.communityIds.includes(com.id)}
                          onChange={() =>
                            handleCheckboxChange("communityIds", com.id)
                          }
                        />
                        <span>{com.communityName}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Serving Cities
                  </label>

                  <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 max-h-52 overflow-y-auto">
                    <label className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-300">
                      <input
                        type="checkbox"
                        checked={
                          CITIES.length > 0 &&
                          formData.cityIds.length === CITIES.length
                        }
                        onChange={(e) =>
                          handleSelectAll("cityIds", CITIES, e.target.checked)
                        }
                      />
                      <span className="font-semibold text-orange-600">
                        Select All
                      </span>
                    </label>

                    {CITIES.map((city) => (
                      <label
                        key={city.id}
                        className="flex items-center gap-2 py-1 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.cityIds.includes(city.id)}
                          onChange={() =>
                            handleCheckboxChange("cityIds", city.id)
                          }
                        />
                        <span>{city.cityName}</span>
                      </label>
                    ))}
                  </div>
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
                    <option value="INACTIVE">Status: INACTIVE</option>
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
              <div className="flex items-center justify-between mb-6">
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
                    {formData.packages.length > 0 && (
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
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          name="advancePercentage"
                          value={pkg.advancePercentage}
                          onChange={(e) => {
                            const value = Math.max(
                              0,
                              Math.min(Number(e.target.value), 100),
                            );

                            setFormData((prev) => {
                              const updatedPackages = [...prev.packages];
                              updatedPackages[index] = {
                                ...updatedPackages[index],
                                advancePercentage: value,
                              };

                              return {
                                ...prev,
                                packages: updatedPackages,
                              };
                            });
                          }}
                          placeholder="20"
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 outline-none text-sm"
                        />
                      </div>
                      <div className="md:col-span-3 flex items-end pb-2">
                        <select
                          name="status"
                          value={pkg.status}
                          onChange={(e) => handlePackageChange(index, e)}
                          className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 outline-none"
                        >
                          <option value="ACTIVE">Status: ACTIVE</option>
                          <option value="INACTIVE">Status: INACTIVE</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Short Description{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
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
                          Included Items (` - ` separated)
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
                
                <label className="flex mt-4 items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="enableCustomPackage"
                    checked={formData.enableCustomPackage}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Custom Package Enabled
                  </span>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-5 w-5" /> Publish Service
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddService;
