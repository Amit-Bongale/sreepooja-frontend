import { Mail, MapPin } from "lucide-react";
import logo from "../../assets/sreePooja.png";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center  gap-2 mb-4">
              <h1 className="font-serif text-xl font-bold text-white flex items-center ml-6">
                <img src={logo} alt="logo" className="size-14 rounded-full" />
                Sree<span className="text-brand-600">Pooja</span>
              </h1>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner for authentic Hindu rituals, connecting
              devotees with knowledgeable priests for a seamless divine
              experience.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-brand-400 transition-colors">
                  Griha Pravesh
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-400 transition-colors">
                  Marriage / Vivah
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-400 transition-colors">
                  Havan & Yagna
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-400 transition-colors">
                  Funeral / Antim Sanskar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-brand-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/onboarding" className="hover:text-brand-400 transition-colors">
                  Join as a Priest
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-brand-400 transition-colors">
                  Pricing Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-brand-400 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="text-brand-500 h-4 w-4 mt-0.5 shrink-0" />
                <span>#87, 2nd Floor, Chord Rd, above Pizza Hut, opposite to Cafe Coffee Day, Bimajyothi LIC Colony, 3rd Stage, Basaveshwar Nagar, Bengaluru, Karnataka 560079</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="text-brand-500 h-4 w-4 " />
                <a
                  href="mailto:namaste@punyapath.com"
                  className="hover:text-white transition-colors"
                >
                  contact@sreepooja.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()}  SreePooja. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
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
