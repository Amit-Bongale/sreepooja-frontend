import { Menu, X, User } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user.user);
  const loggedIn = user || token;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <span className="font-serif font-bold text-xl md:text-2xl tracking-tight text-gray-900">
              SreePooja
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/services"
              className="text-gray-600 hover:text-brand-600 font-medium transition"
            >
              Services
            </Link>

            <Link
              to="/about"
              className="text-gray-600 hover:text-brand-600 font-medium transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-600 hover:text-brand-600 font-medium transition"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Login */}
          <div className="hidden md:flex items-center">
            {loggedIn ? (
              <Link
                to="/account"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-brand-600 transition"
              >
                <User size={18} />
                Account
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-brand-600 transition"
              >
                <User size={18} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-80 border-t border-gray-300" : "max-h-0"
        }`}
      >
        <div className="bg-white px-6 py-4 flex flex-col gap-4">
          <Link
            to="/services"
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-brand-600"
          >
            Services
          </Link>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-brand-600"
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-brand-600"
          >
            Contact
          </Link>

          {loggedIn ? (
            <Link
              to="/account"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-brand-600 transition"
            >
              <User size={18} />
              Account
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-brand-600 transition"
            >
              <User size={18} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
