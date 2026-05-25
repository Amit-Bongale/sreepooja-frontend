import { ArrowRight } from "lucide-react"

function FeaturedServices() {
  return (
       <section id="services" class="py-10 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-2">Our Services</h2>
                <h3 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Sacred Rituals for Every Occasion</h3>
                <p class="text-gray-600 max-w-2xl mx-auto">Select from our comprehensive list of Vedic rituals performed by knowledgeable scholars right at your preferred location.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover group relative flex flex-col">
                    <div class="h-48 bg-linear-to-br from-brand-100 to-amber-50 relative flex items-center justify-center overflow-hidden">
                        {/* image here */}
                        <div class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand-700">Most Popular</div>
                    </div>
                    <div class="p-6 flex-1 flex flex-col">
                        <h4 class="text-xl font-serif font-bold text-gray-900 mb-2">Griha Pravesh</h4>
                        <p class="text-gray-600 text-sm mb-4 flex-1">Purify your new home and invite prosperity, peace, and positive energy before moving in with traditional Vedic mantras.</p>
                        <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <span class="text-sm font-medium text-gray-500">Starts at ₹3,100</span>
                            <button class="text-brand-600 font-semibold hover:text-brand-800 flex items-center gap-1 cursor-pointer ">
                                Book Now <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover group relative flex flex-col">
                    <div class="h-48 bg-linear-to-br from-brand-100 to-amber-50 relative flex items-center justify-center overflow-hidden">
                        {/* image here */}
                        
                    </div>
                    <div class="p-6 flex-1 flex flex-col">
                        <h4 class="text-xl font-serif font-bold text-gray-900 mb-2">Satyanarayan Katha</h4>
                        <p class="text-gray-600 text-sm mb-4 flex-1">Express gratitude and seek blessings from Lord Vishnu. Ideal for birthdays, anniversaries, or new beginnings.</p>
                        <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <span class="text-sm font-medium text-gray-500">Starts at ₹2,100</span>
                            <button class="text-brand-600 font-semibold hover:text-brand-800 flex items-center gap-1 cursor-pointer ">
                                Book Now <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>


                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover group relative flex flex-col">
                    <div class="h-48 bg-linear-to-br from-brand-100 to-amber-50 relative flex items-center justify-center overflow-hidden">
                        {/* image here */}
                    </div>
                    <div class="p-6 flex-1 flex flex-col">
                        <h4 class="text-xl font-serif font-bold text-gray-900 mb-2">Namakaran Sanskar</h4>
                        <p class="text-gray-600 text-sm mb-4 flex-1">A sacred naming ceremony to bless the newborn child with a meaningful name based on Vedic astrology.</p>
                        <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <span class="text-sm font-medium text-gray-500">Starts at ₹2,500</span>
                            <button class="text-brand-600 font-semibold hover:text-brand-800 flex items-center gap-1 cursor-pointer ">
                                Book Now <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-12 text-center">
                <button class="inline-flex items-center gap-2 border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white px-8 py-3 rounded-full font-medium transition-colors cursor-pointer">
                    View All Poojas
                    <ArrowRight className="h-5 w-5"/>
                </button>
            </div>
        </div>
    </section>
  )
}

export default FeaturedServices