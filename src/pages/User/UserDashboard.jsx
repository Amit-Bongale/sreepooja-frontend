import { Calendar, MapPin, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import handsIcon from "../../assets/icons/hands.png";

function UserDashboard() {
  
  const user = useSelector((state) => state.user.user);

  return (
    <div className=" mt-16 md:mt-0 flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* greetings */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden md:flex items-center justify-between">
          {/* gradient background */}
          <div className="absolute right-0 top-0 w-1/3 h-full bg-linear-to-l from-brand-50 to-transparent pointer-events-none"></div>

          <div className="relative z-10 mb-3">
            <h1 className="text-2xl flex md:text-3xl font-serif font-bold text-gray-900 mb-2">
              Namaste, {user.name}
            </h1>
            <p className="text-gray-600 max-w-xl text-sm md:text-base">
              Welcome to your spiritual dashboard. Manage your upcoming poojas,
              track priests, and keep your divine journey organized.
            </p>
          </div>

          <Link to="/services" className="relative z-10 shrink-0">
            <button className="bg-brand-50  text-brand-700 border border-brand-500 hover:bg-brand-100 px-4 py-2 z-10 rounded-full font-semibold transition-colors flex items-center gap-2 text-sm ">
              <Plus className={"h-4 w-4"} /> Book New Pooja
            </button>
          </Link>
        </div>

        {/* increase cols to 3 for phase 2 wishlist  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif font-bold text-gray-900">
                  Upcoming Pooja
                </h3>
              </div>

              <div className="border-2 border-brand-500 rounded-2xl p-1 shadow-lg shadow-brand-500/10">
                <div className="bg-white rounded-xl p-6 md:p-8 relative overflow-hidden">
                  <i
                    data-lucide="flower-2"
                    className="absolute -right-6 -bottom-6 h-48 w-48 text-brand-50 opacity-50 pointer-events-none"
                  ></i>

                  <div className="flex flex-col md:flex-row gap-6 justify-between relative z-10">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold mb-4 border border-green-200">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>{" "}
                        Confirmed
                      </div>
                      <h4 className="text-2xl font-serif font-bold text-gray-900 mb-1">
                        Satyanarayan Vrat Katha
                      </h4>
                      <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> rajajaji nagar 2nd block, Bengaluru 560001 
                      </p>

                      <div className="flex flex-wrap gap-4 md:gap-8">
                        <div>
                          <p class="text-xs text-gray-400 font-medium mb-1">
                            DATE & TIME
                          </p>
                          <p className="font-semibold text-gray-900 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-brand-500" />
                            Oct 24, 9:00 AM
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-medium mb-1">
                            ASSIGNED PANDIT
                          </p>
                          <p className="font-semibold text-gray-900 flex items-center gap-2">
                            <span className="h-5 w-5 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                              P
                            </span>
                            Pt. Sharma Ji
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col gap-3 justify-start mt-4 md:mt-0">
                      <button className="flex-1 md:flex-none bg-brand-50 text-brand-700 hover:bg-brand-100 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm flex items-center justify-center gap-2 border border-brand-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif font-bold text-gray-900">
                  Recent Bookings
                </h3>
                <Link
                  to="/user/bookings"
                  className="text-gray-500 hover:text-brand-600 text-sm font-medium transition-colors flex items-center gap-1"
                >
                  View All <i data-lucide="arrow-right" className="h-4 w-4"></i>
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center shrink-0">
                      <img src={handsIcon} alt="Pooja" className="size-8" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">
                        Griha Pravesh Pooja
                      </h5>
                      <p className="text-sm text-gray-500">
                        Aug 15, 2023 • Performed by Pt. Verma
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-semibold">
                      Completed
                    </span>
                    <button className="text-brand-600 hover:text-brand-800 text-sm font-medium">
                      Rebook
                    </button>
                  </div>
                </div>

                <div className="p-5 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center shrink-0">
                      <img src={handsIcon} alt="Pooja" className="size-8" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">
                        Navagraha Shanti
                      </h5>
                      <p className="text-sm text-gray-500">
                        Jan 10, 2023 • Performed by Pt. Tiwari
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-semibold">
                      Completed
                    </span>
                    <button className="text-brand-600 hover:text-brand-800 text-sm font-medium">
                      Rebook
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 Wishlist and Queries section */}
          <div className="space-y-8">
            {/* wishlist section */}
            {/* <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-serif font-bold text-gray-900">
                  Your Wishlist
                </h3>
                <div className="bg-brand-100 text-brand-700 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:border-brand-300 transition-colors">
                    <i
                      data-lucide="car"
                      className="h-5 w-5 text-gray-500 group-hover:text-brand-500"
                    ></i>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 text-sm group-hover:text-brand-600 transition-colors">
                      Vahan Pooja
                    </h5>
                    <p className="text-xs text-gray-500">Saved 2 weeks ago</p>
                  </div>
                  <button className="text-gray-400 hover:text-brand-600">
                    <i data-lucide="arrow-up-right" className="h-4 w-4"></i>
                  </button>
                </div>

                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:border-brand-300 transition-colors">
                    <i
                      data-lucide="building"
                      className="h-5 w-5 text-gray-500 group-hover:text-brand-500"
                    ></i>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 text-sm group-hover:text-brand-600 transition-colors">
                      Office Opening
                    </h5>
                    <p className="text-xs text-gray-500">Saved 1 month ago</p>
                  </div>
                  <button className="text-gray-400 hover:text-brand-600">
                    <i data-lucide="arrow-up-right" className="h-4 w-4"></i>
                  </button>
                </div>
              </div>

              <button className="w-full mt-6 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                View Full Wishlist
              </button>
            </div> */}

            {/* Queries Section */}
            {/* <div className="bg-linar-to-b from-white to-orange-50/50 rounded-2xl border border-brand-100 shadow-sm p-6 relative overflow-hidden">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MessageCircleQuestionMark classNameName="h-5 w-5 text-brand-500" />
                Support Queries
              </h3>
              <p className="text-sm text-gray-600 mb-5">
                You have 1 active conversation with our support team regarding
                samagri.
              </p>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-brand-50 relative">
                <div className="absolute -left-1 top-4 w-2 h-2 rounded-full bg-brand-500"></div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-brand-600 uppercase">
                    Awaiting Reply
                  </span>
                  <span className="text-xs text-gray-400">2 hrs ago</span>
                </div>
                <p className="text-sm text-gray-800 font-medium line-clamp-2">
                  "Do I need to arrange flowers for the Satyanarayan Pooja, or
                  is it included in the package?"
                </p>
                <a
                  href="#"
                  className="inline-block mt-3 text-xs font-semibold text-brand-600 hover:text-brand-800"
                >
                  View Conversation &rarr;
                </a>
              </div>

              <button className="w-full mt-4 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:border-brand-300 hover:text-brand-600 transition-colors flex items-center justify-center gap-2">
                <i data-lucide="help-circle" className="h-4 w-4"></i> Ask a new
                question
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
