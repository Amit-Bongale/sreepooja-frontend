import { Mail, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer class="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div class="md:col-span-1">
            <div class="flex items-center gap-2 mb-4">
              <span class="font-serif font-bold text-xl text-white">
                Sree<span class="text-brand-500">Pooja</span>
              </span>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">
              Your trusted partner for authentic Hindu rituals, connecting
              devotees with knowledgeable priests for a seamless divine
              experience.
            </p>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">Services</h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="hover:text-brand-400 transition-colors">
                  Griha Pravesh
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-brand-400 transition-colors">
                  Marriage / Vivah
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-brand-400 transition-colors">
                  Havan & Yagna
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-brand-400 transition-colors">
                  Funeral / Antim Sanskar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="hover:text-brand-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-brand-400 transition-colors">
                  Join as a Priest
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-brand-400 transition-colors">
                  Pricing Policy
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-brand-400 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">Contact</h4>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start gap-2">
                <MapPin className="text-brand-500 h-4 w-4 mt-0.5" />
                <span>108 Spiritual Way, rajajinagar, Bengaluru 560001</span>
              </li>
              <li class="flex items-center gap-2">
                <Mail className="text-brand-500 h-4 w-4 " />
                <a
                  href="mailto:namaste@punyapath.com"
                  class="hover:text-white transition-colors"
                >
                  contact@sreepooja.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-500">
            &copy; 2026 SreePooja. All rights reserved.
          </p>
          <div class="flex items-center gap-4">
            <a
              href="#"
              class="text-gray-500 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              class="text-gray-500 hover:text-white transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
