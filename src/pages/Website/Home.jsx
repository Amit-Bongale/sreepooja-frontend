import {
  CalendarClock,
  CheckCircle2,
  LayoutDashboard,
  Leaf,
  PackageCheck,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  SunDim,
  Users,
} from "lucide-react";
import Nav from "../../components/Nav";
import FeaturedServices from "../../components/website/FeaturedServices";
import Footer from "../../components/website/Footer";
import { Link } from "react-router";
import image from "../../assets/sreepooja_1.jpg"
// import hero from "../../assets/hero.png"

function Home() {
  return (
    <>
      <Nav />
      {/* Hero section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-divine-cream">
        <div className="absolute inset-0 bg-hero-pattern opacity-50"></div>
        {/* <img src={hero} alt="hero" className="inset-0 absolute opacity-25 w-full object-cover" /> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 leading-tight mb-6">
            Bring the Divine to Your <br className="hidden md:block" />
            <span className="text-gradient">Home & Heart</span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            Connect with highly verified, experienced Pandits for authentic
            Hindu rituals. We handle the arrangements, so you can focus on the
            devotion.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/services"
              className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 flex items-center justify-center gap-2"
            >
              Browse Poojas
              <Sparkles className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-brand-100/50 flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-brand-600 h-5 w-5" />
              <span className="font-medium text-gray-700">
                Verified Priests
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="text-brand-600 h-5 w-5" />
              <span className="font-medium text-gray-700">
                100% Authentic Rituals
              </span>
            </div>
            <div className="flex items-center gap-2">
              <i
                data-lucide="shield-check"
                className="text-brand-600 h-5 w-5"
              ></i>
              <ShieldCheck className="text-brand-600 h-5 w-5" />
              <span className="font-medium text-gray-700">Secure Booking</span>
            </div>
          </div>
        </div>
      </section>

      <FeaturedServices />

      {/* process */}
      <section
        id="how-it-works"
        className="py-20 bg-brand-50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-brand-200 rounded-br-full opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-200 rounded-tl-full opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-2">
              Simple Process
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Your Path to Divine Blessings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 relative z-10 border-4 border-brand-50">
                <Search className="text-brand-600 h-8 w-8" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
              </div>
              <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-brand-200 -z-10"></div>
              <h4 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Choose Your Pooja
              </h4>
              <p className="text-gray-600">
                Select the ritual you need. Provide preferred date, time, and
                language preferences.
              </p>
            </div>

            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-brand-600 rounded-full shadow-lg shadow-brand-500/40 flex items-center justify-center mb-6 relative z-10 border-4 border-brand-50 text-white">
                <CalendarClock className="h-8 w-8" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-brand-50">
                  2
                </div>
              </div>
              <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-brand-200 -z-10"></div>
              <h4 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Book & Confirm
              </h4>
              <p className="text-gray-600">
                Review transparent pricing and pay securely online to confirm
                your slot.
              </p>
            </div>

            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 relative z-10 border-4 border-brand-50">
                <SunDim className="h-8 w-8 text-brand-600" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
              </div>
              <h4 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Experience the Divine
              </h4>
              <p className="text-gray-600">
                Our assigned Panditji arrives on time, with all necessary
                Samagri, to perform the ritual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* why us */}
      <section id="why-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <img src={image} alt="sreepooja" />
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-2">
                Why SreePooja?
              </h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                Seamless Devotion, Managed Effortlessly
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We bridge the gap between devotees and experienced priests. Our
                platform not only connects you but provides a dedicated portal
                to manage your spiritual journey.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1 bg-brand-100 p-2 rounded-lg text-brand-600 h-fit">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      Expert, Verified Pandits
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Our priests are vetted scholars from reputed gurukuls,
                      ensuring correct pronunciation and adherence to
                      scriptures.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 mt-1 bg-brand-100 p-2 rounded-lg text-brand-600 h-fit">
                    <LayoutDashboard className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      Smart Account Management
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Track upcoming bookings, view history, manage addresses,
                      and communicate with our support staff from a clean
                      dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 mt-1 bg-brand-100 p-2 rounded-lg text-brand-600 h-fit">
                    <PackageCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      Samagri Included Options
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Opt for 'Pooja with Samagri' and we will arrange all
                      premium, pure ingredients required for the ritual.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-brand-900 text-white">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial-gradient from-brand-800 via-transparent to-transparent"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Ready to seek divine blessings?
          </h2>
          <p className="text-brand-100 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of families who trust PunyaPath for their spiritual
            and religious needs. Book a priest today in just a few clicks.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <button className="bg-white text-brand-900 hover:bg-brand-50 px-8 py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2">
                Create an Account
              </button>
            </Link>

            <Link to={"/contact"}>
            <button className="bg-brand-700 hover:bg-brand-600 border border-brand-500 px-8 py-4 rounded-full font-medium text-lg transition-colors flex items-center justify-center gap-2">
              <PhoneCall className="h-5 w-5" />
              Talk to Support
            </button> </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
