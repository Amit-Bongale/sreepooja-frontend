import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getData } from "../../api/Api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function FeaturedServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("/pooja-services/featured");
      setServices(data);
    };
    fetchData();
  }, []);

  return (
    <section id="services" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-2">
            Our Services
          </h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Sacred Rituals for Every Occasion
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from our comprehensive list of Vedic rituals performed by
            knowledgeable scholars right at your preferred location.
          </p>
        </div>

        <div className="relative">
          {/* Custom Navigation Buttons */}
          {/* <button className="custom-prev absolute left-0 top-1/3 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-brand-600 hover:text-white transition cursor-pointer">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button className="custom-next absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-brand-600 hover:text-white transition cursor-pointer">
            <ChevronRight className="h-5 w-5" />
          </button> */}

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={20}
            slidesPerView={3}
            className="pb-10"
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {services.map((s, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover group relative flex flex-col">
                  <div className="h-48 bg-linear-to-br from-brand-100 to-amber-50 relative flex items-center justify-center overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${s?.thumbnailImage}`}
                      alt={s?.serviceName}
                    />

                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand-700">
                      Most Popular
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">
                      {s?.serviceName}
                    </h4>

                    <p className="text-gray-600 text-sm mb-4 h-25 overflow-hidden">
                      {s?.shortDescription}...
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-500">
                        Starts at ₹{s?.startingPrice}
                      </span>

                      <Link to={`/services/${s?.slug}`}>
                        <button className="text-brand-600 font-semibold hover:text-brand-800 flex items-center gap-1 cursor-pointer">
                          Book Now <ArrowRight className="h-4 w-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-12 text-center">
          <Link to="/services">
            <button className="inline-flex items-center gap-2 border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white px-8 py-3 rounded-full font-medium transition-colors cursor-pointer">
              View All Poojas
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedServices;
