/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Star,
  Clock,
  IndianRupee,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Info,
  Calendar,
  Users,
  Sparkles,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import Nav from "../../components/Nav";
import { Link, useParams } from "react-router";
import { getData } from "../../api/Api";

export default function ServiceDetails() {
  const { slug } = useParams();
  const [details, setDetails] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`/pooja-services/${slug}`);
      setDetails(data);
    };
    fetchData();
  }, [slug]);

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

  // --- STATE ---
  const [selectedPackage, setSelectedPackage] = useState("CLASSIC"); // Default to platinm for better upselling

  const currentPackage = details?.packages.find(
    (pkg) => pkg.packageType === selectedPackage,
  );

  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50 flex flex-col">
      <Nav />

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 max-w-7xl  mt-16 lg:mt-22 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {details?.categorySlug}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            {details?.serviceName}
          </h1>
          <p className="text-md text-gray-600 max-w-3xl text-justify">
            {details?.shortDescription}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT COLUMN: Details? */}
          <div className="lg:col-span-2 space-y-10">
            {/* Featured Image */}
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-orange-50 border border-gray-200">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${details?.thumbnailImage}`}
                alt={details?.serviceName}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Quick Info Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Duration
                </span>
                <span className="font-bold text-gray-900">
                  {formatDuration(details?.durationMinutes)}
                </span>
              </div>

              <div className="flex flex-col gap-1 col-span-2 md:col-span-2">
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Info className="h-4 w-4" /> Languages Available
                </span>
                <span className="font-bold text-gray-900">
                  {details?.languages.join(", ")}
                </span>
              </div>
            </div>

            {/* About Section */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                About this Pooja
              </h2>
              <p className="text-gray-600 leading-relaxed text-md text-justify">
                {details?.fullDescription}
              </p>
            </section>

            {/* Benefits Section */}
            <section className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-orange-500" />
                Divine Benefits
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details?.benefits.split(",").map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* RIGHT COLUMN: Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
              {/* Widget Header */}
              <div className="bg-gray-900 text-white p-6 pb-8">
                <h3 className="text-xl font-serif font-bold mb-1">
                  Select Package
                </h3>
                <p className="text-gray-400 text-sm">
                  Choose how you want to perform the pooja.
                </p>
              </div>

              {/* Widget Body (Pulls up over header) */}
              <div className="p-6 pt-0 -mt-4 flex-1 flex flex-col">
                <div className="space-y-5 mb-8">
                  {/* Classic Package Option */}
                  {details?.packages?.map((pkg) => (
                    <button
                      key={pkg.packageType}
                      id={pkg.packageType}
                      onClick={() => setSelectedPackage(pkg.packageType)}
                      className="w-full"
                    >
                      <label
                        className={` relative flex flex-col p-5 rounded-2xl cursor-pointer transition-all duration-200 border-2 ${selectedPackage === pkg.packageType ? "border-orange-500 bg-orange-50 shadow-md" : "border-gray-200 bg-white hover:border-orange-200"} `}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPackage === pkg.packageType ? "border-orange-500" : "border-gray-300"}`}
                            >
                              {selectedPackage === pkg.packageType && (
                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                              )}
                            </div>
                            <span className="font-bold text-gray-900">
                              {pkg.packageType}
                            </span>
                          </div>
                          <span className="font-bold text-gray-900 flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            {pkg.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 text-left ml-8">
                          {pkg.shortDescription}
                        </p>
                      </label>
                    </button>
                  ))}

                  <button
                    id={"custom"}
                    onClick={() => setSelectedPackage("custom")}
                    className="w-full"
                  >
                    <label
                      className={` relative flex flex-col p-5 rounded-2xl cursor-pointer transition-all duration-200 border-2 ${selectedPackage === "custom" ? "border-orange-500 bg-orange-50 shadow-md" : "border-gray-200 bg-white hover:border-orange-200"} `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPackage === "custom" ? "border-orange-500" : "border-gray-300"}`}
                          >
                            {selectedPackage === "custom" && (
                              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                            )}
                          </div>
                          <span className="font-bold text-gray-900">
                            Custom
                          </span>
                        </div>
                        <span className="font-bold text-gray-900 flex items-center">
                          <IndianRupee className="h-4 w-4" />
                          Varies
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 text-left ml-8">
                        Tailored to your specific needs
                      </p>
                    </label>
                  </button>
                </div>

                {/* Package Inclusions Summary */}
                {currentPackage?.includedItems && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 flex-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-3">
                      What's included in {currentPackage.packageType}:
                    </h4>
                    <ul className="space-y-2.5">
                      {currentPackage.includedItems
                        .split(",")
                        .map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Booking Action */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">
                      {currentPackage == "custom"
                        ? "Estimated Price"
                        : "Total Price"}
                    </span>
                    <span className="text-3xl font-bold text-gray-900 flex items-center">
                      {!currentPackage?.isCustom && (
                        <IndianRupee className="h-6 w-6" />
                      )}
                      {currentPackage == "custom"
                        ? "Varies"
                        : currentPackage?.price}
                    </span>
                  </div>

                  {currentPackage == "custom" ? (
                    <button className="w-full bg-gray-900 hover:bg-black text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Contact Support
                    </button>
                  ) : (
                    <Link 
                      to={`/checkout/${details?.slug}/${currentPackage?.packageType}`}
                      className="w-full"
                    >
                      <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-600/20 transition-all flex justify-center items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Proceed to Book
                      </button>
                    </Link>
                  )}

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    {currentPackage == "custom"
                      ? "Our team will reach out to discuss your requirements."
                      : "Secure booking. Pay partially to confirm."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
