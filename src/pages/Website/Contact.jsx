import { Clock, Mail, MapPin, Phone, } from "lucide-react";
import Nav from "../../components/Nav";
import Footer from "../../components/website/Footer";
import { ContactForm } from "../../components/website/ContactForm";

function Contact() {
  return (
    <div>
      <Nav />
      <main className="grow">
        {/* Hero Section */}
        <div className="relative bg-orange-600 text-white py-20 overflow-hidden mt-18">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 border-4 border-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              We are here to assist you with your spiritual needs. Reach out to
              us for pooja bookings, customized events, or any inquiries.
            </p>
          </div>
        </div>

        {/* Contact Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                How can we <span className="text-orange-600">help?</span>
              </h2>

              <ContactInfoCard
                icon={Phone}
                title="Call Us"
                content="+91 96115 04567"
                subContent="Mon to Sat, 10 AM - 6 PM"
              />

              <ContactInfoCard
                icon={Mail}
                title="Email Us"
                content="namaste@sreepooja.com"
                subContent="We usually respond within 24 hours"
              />

              <ContactInfoCard
                icon={MapPin}
                title="Head Office"
                content="#87, 2nd Floor, Chord Rd, above Pizza Hut, opposite to Cafe Coffee Day, Bimajyothi LIC Colony, 3rd Stage, Basaveshwar Nagar"
                subContent="Bengaluru, Karnataka 560079, India"
              />

              <ContactInfoCard
                icon={Clock}
                title="Support Hours"
                content="Monday - Saturday"
                subContent="10:00 AM - 6:00 PM (IST)"
              />
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Map / Location Highlight (Visual Map Placeholder) */}
        <div >
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d621.914573309608!2d77.54050596741807!3d12.997093671686521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d1200e15b97%3A0x35d3914e01dc541d!2sT%20Studios!5e1!3m2!1sen!2sin!4v1783437812800!5m2!1sen!2sin" className="w-full h-100 bg-gray-200 relative" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default Contact;

const ContactInfoCard = ({ icon: Icon, title, content, subContent }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start space-x-4">
    <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h3 className="font-bold text-gray-900 text-lg mb-1">{title}</h3>
      <p className="text-gray-600">{content}</p>
      {subContent && <p className="text-gray-500 text-sm mt-1">{subContent}</p>}
    </div>
  </div>
);
