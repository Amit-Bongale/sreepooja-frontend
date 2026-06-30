import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Languages,
  ChevronRight,
  X,
  Filter,
  Clock,
  IndianRupee,
  Command,
  ChevronLeft,
  // ShieldCheck,
} from "lucide-react";
import Nav from "../../components/Nav";
import { Link } from "react-router";
import { getData } from "../../api/Api";

export default function Services() {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const [SERVICES, setServices] = useState([]);

  const [CATEGORIES, setCategories] = useState([]);
  const [LANGUAGES, setLanguages] = useState([]);
  const [COMMUNITY, setCommunity] = useState([]);
  const [LOCATIONS, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getData("/pooja-services/categories");
      setCategories(categories);

      const languages = await getData("/masters/languages");
      setLanguages(languages);

      const community = await getData("/masters/communities");
      setCommunity(community);

      const cities = await getData("/masters/cities");
      setLocations(cities);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 when filters change
  useEffect(() => {
    const resetPage = async () => {
      setCurrentPage(1);
    };
    resetPage();
  }, [searchQuery, selectedLocation, selectedLanguage, selectedCategory]);

  useEffect(() => {
    const fetchData = async () => {
      const baseurl = `/pooja-services`;
      const queryParams = [];
      if (selectedCategory && selectedCategory !== "all") {
        queryParams.push(`categorySlug=${selectedCategory}`);
      }

      if (debouncedSearch) {
        queryParams.push(`search=${debouncedSearch}`);
      }

      if(currentPage){
        queryParams.push(`page=${currentPage-1}`)
      }

      const finalUrl = `${baseurl}${queryParams.length > 0 ? `?${queryParams.join("&")}` : ""}`;

      const services = await getData(finalUrl);
      setServices(services?.content);
      setTotalPage(services?.totalPages);
    };
    fetchData();
  }, [selectedCategory, debouncedSearch, currentPage]);

  function formatDuration(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs && mins) {
      return `${hrs} hr ${mins} min`;
    }

    if (hrs) {
      return `${hrs} hr`;
    }

    return `${mins} min`;
  }

  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50 flex flex-col">
      <Nav />

      {/* --- FILTERS SECTION (Moved down) --- */}
      <div className="bg-white border-b border-gray-200 py-3 z-40 relative mt-17 md:mt-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            {/* Search Bar */}
            <div className="flex w-full">
              <div className="relative w-full flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for poojas, homams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl text-sm transition-all outline-none"
                />
              </div>
              <div className="flex items-center gap-4 md:hidden">
                <button
                  className="text-gray-500 hover:text-orange-600 focus:outline-none p-2"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Filter className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex w-full sm:w-auto gap-3">
              {/* Location Dropdown */}
              <div className="relative w-1/2 sm:w-48">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-200 hover:border-orange-300 focus:border-orange-500 rounded-xl text-sm transition-all outline-none appearance-none cursor-pointer text-gray-700 font-medium"
                >
                  {LOCATIONS?.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.cityName}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 rotate-90 pointer-events-none" />
              </div>

              {/* Language Dropdown */}
              <div className="relative w-1/2 sm:w-48">
                <Languages className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-200 hover:border-orange-300 focus:border-orange-500 rounded-xl text-sm transition-all outline-none appearance-none cursor-pointer text-gray-700 font-medium"
                >
                  <option value="all">All Languages</option>
                  {LANGUAGES?.map((lang) => (
                    <option key={lang?.id} value={lang?.id}>
                      {lang?.languageName}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 rotate-90 pointer-events-none" />
              </div>

              {/* Community  Dropdown */}
              <div className="relative w-1/2 sm:w-48 ">
                <Command className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-200 hover:border-orange-300 focus:border-orange-500 rounded-xl text-sm transition-all outline-none appearance-none cursor-pointer text-gray-700 font-medium"
                >
                  <option value="all">All Community</option>
                  {COMMUNITY?.map((community) => (
                    <option key={community.id} value={community.communityName}>
                      {community.communityName}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 rotate-90 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Category Chips (Quick Select) */}
      <div className="md:hidden border-b border-gray-100 bg-white overflow-x-auto hide-scrollbar px-4 py-3 flex gap-2">
        {CATEGORIES?.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.slug)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-orange-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category.categoryName}
          </button>
        ))}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium bg-orange-50 text-orange-600 hover:bg-orange-100 flex items-center gap-1"
        >
          More <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col md:flex-row gap-8 items-start">
        {/* --- SIDEBAR (Desktop) / MOBILE DRAWER --- */}
        <aside
          className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
                md:sticky md:top-36 md:translate-x-0 md:z-10 md:w-64 md:bg-transparent md:shadow-none md:shrink-0 md:block
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
        >
          <div className="h-full md:max-h-[calc(100vh-10rem)] flex flex-col bg-white md:bg-transparent rounded-xl md:border md:border-gray-200 overflow-hidden">
            {/* Drawer Header (Mobile Only) */}
            <div className="flex md:hidden items-center justify-between p-4 border-b border-gray-200">
              <span className="font-bold text-lg text-gray-900">
                Filters & Categories
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-0">
              <h3 className="hidden md:block font-serif font-bold text-lg text-gray-900 bg-gray-50/50 p-4 border-b border-gray-200">
                Browse Services
              </h3>

              <ul className="space-y-1 md:p-3">
                {/* all categories */}
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center justify-between transition-all duration-200 ${
                      selectedCategory === "all"
                        ? "bg-orange-50 text-orange-700 font-bold border-l-2 border-orange-500 pl-3"
                        : "text-gray-600 hover:bg-gray-50 hover:text-orange-600 font-medium border-l-4 border-transparent pl-3"
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {CATEGORIES?.map((category) => {
                  const isActive = selectedCategory === category.slug;
                  return (
                    <li key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.slug);
                          setIsMobileMenuOpen(false); // Close mobile drawer on selection
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center justify-between transition-all duration-200 ${
                          isActive
                            ? "bg-orange-50 text-orange-700 font-bold border-l-2 border-orange-500 pl-3"
                            : "text-gray-600 hover:bg-gray-50 hover:text-orange-600 font-medium border-l-4 border-transparent pl-3"
                        }`}
                      >
                        {category.categoryName}
                        {isActive && (
                          <ChevronRight className="h-4 w-4 text-orange-500" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer Overlay */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-gray-900/60 z-40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* --- SERVICE GRID --- */}
        <div className="flex-1 min-w-0">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
                {selectedCategory === "all"
                  ? "Explore Divine Services"
                  : selectedCategory}
              </h1>
            </div>
          </div>

          {SERVICES?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES?.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-4/3 overflow-hidden bg-orange-50">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${service.thumbnailImage}`}
                        alt={service.serviceName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 "
                      />
                    </div>

                    {/* Content Container */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">
                        {service.categorySlug}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                        {service.serviceName}
                      </h3>

                      <div className="space-y-2 mb-1 flex-1">
                        <div className="flex items-center text-sm text-gray-600 gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>
                            Duration:
                            <span className="font-medium text-gray-800">
                              {formatDuration(service.durationMinutes)}
                            </span>
                          </span>
                        </div>
                        {/* <div className="flex items-center text-sm text-gray-600 gap-2">
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                          <span>Verified Priests</span>
                        </div> */}
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-xs text-gray-500 block">
                            Starts from
                          </span>
                          <div className="flex items-center text-gray-900 font-bold text-lg">
                            <IndianRupee className="h-4 w-4" />{" "}
                            {service?.startingPrice == 0 ? "CUSTOM" : service?.startingPrice}
                          </div>
                        </div>
                        <Link to={`/services/${service.slug}`}>
                          <button className="bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* --- PAGINATION --- */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 0}
                    className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i+1)}
                      className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                        currentPage === i+1
                          ? "bg-orange-600 text-white shadow-md"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-orange-600"
                      }`}
                    >
                      {i+1} 
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl border border-gray-200 border-dashed">
              <div className="h-20 w-20 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <Search className="h-10 w-10 text-orange-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No services found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                We couldn't find any poojas matching your current filters. Try
                adjusting your search, location, or language preferences.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLocation("");
                  setSelectedLanguage("");
                  setSelectedCategory("");
                  setCurrentPage(0);
                }}
                className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
