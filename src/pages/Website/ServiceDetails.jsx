import { useState } from "react";
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
import { Link } from "react-router";

// --- DUMMY BACKEND DATA ---
const SERVICE_DETAILS = {
  id: 1,
  title: "Aksharabhyasam Ceremony",
  category: "Ceremonies",
  image:
    "https://newsmantra.in/wp-content/uploads/2024/10/EuroKids-Aksharabhyasam-celebrations_01.jpeg", // Generic spiritual placeholder
  rating: 4.8,
  reviews: 124,
  duration: "2-3 Hours",
  languages: ["Telugu", "Tamil", "Kannada", "Sanskrit"],
  shortDescription:
    "Initiate your child into the world of education and alphabets with the divine blessings of Goddess Saraswati and Lord Ganesha.",
  about:
    "Aksharabhyasam or Vidyāraṃbhaṃ is a traditional religious ceremony in which the child is given initiation for education. The ritual involves invoking the blessings of Goddess Saraswati, the goddess of knowledge, wisdom, and learning. It is usually performed when the child is two and a half to three years old. The priest guides the child to write their first letters, usually a sacred mantra, on a plate of rice.",
  benefits: [
    "Invokes the blessings of Goddess Saraswati for a bright educational future.",
    "Improves the child's grasping power, memory, and concentration.",
    "Removes negative forces and obstacles from the child's path of learning.",
    "Marks a spiritual and auspicious beginning to lifelong education.",
  ],
  packages: [
    {
      type: "classic",
      name: "Classic Package",
      shortDesc: "Only Priest Services",
      price: 2500,
      includes: [
        "Experienced Vedic Priest",
        "Complete Pooja Guidance",
        "Chanting of Mantras",
        "Travel Allowance for Priest included",
      ],
      excludes: [
        "Pooja Samagri (Ingredients)",
        "Flowers and Fruits",
        "Prasadam",
      ],
    },
    {
      type: "platinum",
      name: "Platinum Package",
      shortDesc: "Priest + Complete Samagri",
      price: 4500,
      tag: "Most Recommended",
      includes: [
        "Experienced Vedic Priest",
        "Premium Quality Pooja Samagri",
        "Fresh Flowers & Fruits",
        "Complete Setup Guidance",
        "Travel Allowance for Priest included",
      ],
      excludes: ["Prasadam preparation (to be done at home)"],
    },
    {
      type: "custom",
      name: "Custom Package",
      shortDesc: "Tailored to your specific needs",
      price: "Custom",
      tag: "Flexible",
      isCustom: true,
      includes: [
        "Everything in Platinum Package",
        "Additional Priests if required",
        "Premium decorations & arrangements",
        "Specific dietary Prasadam requests",
        "Personalized Muhurtham matching",
      ],
      excludes: [],
    },
  ],
};

export default function ServiceDetails() {
  // --- STATE ---
  const [selectedPackage, setSelectedPackage] = useState("platinum"); // Default to platinm for better upselling

  const currentPackage = SERVICE_DETAILS.packages.find(
    (pkg) => pkg.type === selectedPackage,
  );

  return (
    <div className="font-sans text-gray-800 antialiased min-h-screen bg-gray-50 flex flex-col">
      <Nav />

      {/* --- BREADCRUMBS --- */}
      <div className=" border-b mt-16 lg:mt-22 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm text-gray-500 font-medium items-center gap-2">
            <a href="#" className="hover:text-orange-600">
              Home
            </a>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <a href="#" className="hover:text-orange-600">
              Services
            </a>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <a href="#" className="hover:text-orange-600">
              {SERVICE_DETAILS.category}
            </a>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 truncate">
              {SERVICE_DETAILS.title}
            </span>
          </nav>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {SERVICE_DETAILS.category}
            </span>
            <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {SERVICE_DETAILS.rating}{" "}
              <span className="text-gray-500 font-normal">
                ({SERVICE_DETAILS.reviews} reviews)
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            {SERVICE_DETAILS.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {SERVICE_DETAILS.shortDescription}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT COLUMN: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Featured Image */}
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-orange-50 border border-gray-200">
              <img
                src={SERVICE_DETAILS.image}
                alt={SERVICE_DETAILS.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Info Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Duration
                </span>
                <span className="font-bold text-gray-900">
                  {SERVICE_DETAILS.duration}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Users className="h-4 w-4" /> Priests
                </span>
                <span className="font-bold text-gray-900">1 Main Priest</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2 md:col-span-2">
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Info className="h-4 w-4" /> Languages Available
                </span>
                <span className="font-bold text-gray-900">
                  {SERVICE_DETAILS.languages.join(", ")}
                </span>
              </div>
            </div>

            {/* About Section */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                About this Pooja
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {SERVICE_DETAILS.about}
              </p>
            </section>

            {/* Benefits Section */}
            <section className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-orange-500" />
                Divine Benefits
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICE_DETAILS.benefits.map((benefit, index) => (
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
                  {SERVICE_DETAILS.packages.map((pkg) => (
                    <button
                      id={pkg.type}
                      onClick={() => setSelectedPackage(pkg.type)}
                      className="w-full"
                    >
                      <label
                        className={`
                                        relative flex flex-col p-5 rounded-2xl cursor-pointer transition-all duration-200 border-2
                                        ${
                                          selectedPackage === pkg.type
                                            ? "border-orange-500 bg-orange-50 shadow-md"
                                            : "border-gray-200 bg-white hover:border-orange-200"
                                        }
                                    `}
                      >
                        {pkg.tag && (
                          <span className="absolute -top-3 right-4 bg-linear-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            {pkg.tag}
                          </span>
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPackage === pkg.type ? "border-orange-500" : "border-gray-300"}`}
                            >
                              {selectedPackage === pkg.type && (
                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                              )}
                            </div>
                            <span className="font-bold text-gray-900">
                              {pkg.name}
                            </span>
                          </div>
                          <span className="font-bold text-gray-900 flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            {pkg.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 text-left ml-8">
                          {pkg.shortDesc}
                        </p>
                      </label>
                    </button>
                  ))}
                </div>

                {/* Package Inclusions Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 flex-1">
                  <h4 className="font-bold text-gray-900 text-sm mb-3">
                    What's included in {currentPackage.name}:
                  </h4>
                  <ul className="space-y-2.5">
                    {currentPackage.includes.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {currentPackage.excludes &&
                    currentPackage.excludes.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-bold text-gray-900 text-sm mb-2">
                          Not included:
                        </h4>
                        <ul className="space-y-2">
                          {currentPackage.excludes.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-500"
                            >
                              <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>

                {/* Booking Action */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">
                      {currentPackage.isCustom
                        ? "Estimated Price"
                        : "Total Price"}
                    </span>
                    <span className="text-3xl font-bold text-gray-900 flex items-center">
                      {!currentPackage.isCustom && (
                        <IndianRupee className="h-6 w-6" />
                      )}
                      {currentPackage.isCustom
                        ? "Varies"
                        : currentPackage.price}
                    </span>
                  </div>

                  {currentPackage.isCustom ? (
                    <button className="w-full bg-gray-900 hover:bg-black text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Contact Support
                    </button>
                  ) : (
                    <Link to={`/checkout?serviceId=${SERVICE_DETAILS.id}&package=${currentPackage.type}`} className="w-full">
                    <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-600/20 transition-all flex justify-center items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Proceed to Book
                    </button> </Link>
                  )}

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    {currentPackage.isCustom
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
