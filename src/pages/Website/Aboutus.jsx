import { useState } from "react";
import {
  BadgeCheck,
  CalendarCheck,
  CreditCard,
  Headphones,
  Languages,
  MapPin,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import Nav from "../../components/Nav";
import Footer from "../../components/website/Footer";

const differentiators = [
  {
    icon: BadgeCheck,
    title: "Verified priests",
    text: "Experienced Vedic priests curated for authenticity, discipline, and trust.",
  },
  {
    icon: CalendarCheck,
    title: "Smart booking",
    text: "Plan daily poojas, homas, samskaras, weddings, and large spiritual events with less friction.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent pricing",
    text: "Clear service details and pricing before devotees confirm the ceremony.",
  },
  {
    icon: MapPin,
    title: "Location matching",
    text: "Find priests by city, locality, ritual needs, language, and regional tradition.",
  },
  {
    icon: Languages,
    title: "Regional traditions",
    text: "Support for diverse sampradayas, languages, and family customs across India.",
  },
  {
    icon: CreditCard,
    title: "Secure payments",
    text: "Digital payments, instant booking confirmations, and dependable service records.",
  },
  {
    icon: UsersRound,
    title: "Every setting",
    text: "Services for homes, temples, businesses, community events, and sacred milestones.",
  },
  {
    icon: Headphones,
    title: "Guided support",
    text: "Customer support before, during, and after every booking.",
  },
];

const rituals = [
  "Daily Pooja",
  "Griha Pravesha",
  "Satyanarayana Pooja",
  "Ganapati Homa",
  "Rudrabhisheka",
  "Weddings",
  "Upanayana",
  "Seemantha",
  "Namakarana",
  "Pitru Karya",
  "Temple Rituals",
  "Spiritual Events",
];

const pillars = {
  vision: {
    label: "Vision",
    title: "A trusted digital ecosystem for spiritual services",
    text: "To become the world's most trusted digital ecosystem for Hindu religious and spiritual services, preserving timeless traditions while making them easily accessible to every devotee, anywhere in the world.",
  },
  mission: {
    label: "Mission",
    title: "Simpler access to authentic Vedic rituals",
    text: "To empower millions of devotees with a trusted platform that simplifies access to qualified priests and authentic Vedic rituals, while supporting the preservation of India's spiritual heritage through innovation, transparency, and exceptional service.",
  },
};

const futureItems = [
  "Online consultations with priests",
  "Personalized pooja recommendations",
  "Temple services and festival bookings",
  "Astrology and spiritual learning",
  "Devotional content and digital offerings",
];

const sectionWrap =
  "mx-auto w-[min(1180px,calc(100%_-_40px))] max-[470px]:w-[min(1180px,calc(100%_-_28px))]";
const kicker =
  "inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-normal text-brand-700";
const heading =
  "font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-normal text-brand-900";

function AboutUs() {
  const [activePillar, setActivePillar] = useState("vision");
  const [openFuture, setOpenFuture] = useState(0);
  const currentPillar = pillars[activePillar];

  return (
    <main className="min-w-[320px] overflow-hidden font-sans text-brand-900">
      <Nav />
      <section
        className="border-b border-brand-100 bg-divine-cream"
        aria-labelledby="about-title"
      >
        <div className={`${sectionWrap} py-14 mt-14 text-center`}>
          <span className="text-xs font-extrabold uppercase tracking-normal text-brand-600">
            About Sree Pooja
          </span>
          <h1
            id="about-title"
            className="mx-auto mt-5 max-w-4xl font-serif text-[clamp(2.5rem,5.8vw,5rem)] leading-[1.05] tracking-normal text-brand-900"
          >
            Connecting Devotees with Authentic Vedic Traditions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[clamp(1rem,1.7vw,1.15rem)] leading-8 text-slate-500">
            Sree Pooja is India's next-generation digital platform for booking
            verified Hindu priests and authentic religious services with
            clarity, convenience, and devotion.
          </p>
        </div>
      </section>
      <section
        className={`${sectionWrap} grid gap-[clamp(24px,5vw,64px)] py-[clamp(64px,10vw,80px)] max-md:grid-cols-1`}
        aria-label="Sree Pooja introduction"
      >
        <div className="grid gap-5 text-[clamp(1.02rem,1.5vw,1.18rem)] text-black text-justify">
          <p>
            Sree Pooja is transforming how devotees connect with spiritual
            traditions by combining centuries-old Vedic wisdom with the
            convenience of modern technology.
          </p>
          <p>
            Finding the right priest for an important ceremony has often
            required personal referrals, uncertain availability, and limited
            transparency. Sree Pooja addresses these challenges through a
            secure, reliable, and user-friendly platform that connects devotees
            with verified priests based on location, language, tradition, and
            ritual requirements.
          </p>
        </div>
      </section>

      <section
        className={`${sectionWrap} rounded-lg bg-brand-900 p-[clamp(34px,6vw,58px)] text-brand-50`}
        aria-labelledby="rituals-title"
      >
        <div className="mb-7 max-w-190">
          <span className={`${kicker} text-divine-gold`}>Ritual Coverage</span>
          <h2 id="rituals-title" className={`${heading} my-3 text-white`}>
            From daily poojas to life milestones
          </h2>
          <p className="text-[1.05rem] text-brand-100">
            Every ceremony is supported with the intent to preserve
            authenticity, discipline, and devotion.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {rituals.map((ritual) => (
            <span
              className="rounded-full border border-brand-200/30 bg-white/10 px-3.5 py-2.5 font-medium text-sm text-brand-100 max-[470px]:w-full max-[470px]:text-center"
              key={ritual}
            >
              {ritual}
            </span>
          ))}
        </div>
      </section>

      <section
        className={`${sectionWrap} pt-[clamp(64px,9vw,90px)]`}
        aria-labelledby="priest-network-title"
      >
        <div className="mx-auto max-w-6xl text-center">
          <span className={kicker}>Trusted Priest Network</span>
          <h2 id="priest-network-title" className={`${heading} mt-2.5`}>
            Curated priests, seamless bookings
          </h2>
          <p className="mx-auto mt-5 max-w-6xl text-[clamp(1.02rem,1.6vw,1.18rem)] leading-8 text-black">
            Our carefully curated network of Vedic priests represents diverse
            traditions and regional practices, allowing devotees to book
            services with confidence. Every booking is supported by a seamless
            digital experience, including convenient scheduling, secure
            payments, transparent pricing, booking confirmations, and dedicated
            customer support.
          </p>
        </div>
      </section>

      <section
        className={`${sectionWrap} py-[clamp(70px,10vw,80px)]`}
        aria-labelledby="pillars-title"
      >
        <div className="mb-5 max-w-190">
          <span className={kicker}>Purpose</span>
          <h2 id="pillars-title" className={`${heading} mt-2.5`}>
            Built to protect tradition and improve access
          </h2>
        </div>
        <div className="grid grid-cols-[220px_minmax(0,1fr)] items-stretch gap-5 max-md:grid-cols-1">
          <div
            className="grid gap-2.5 max-md:grid-cols-2 max-[470px]:grid-cols-1"
            role="tablist"
            aria-label="Vision and mission"
          >
            {Object.entries(pillars).map(([key, item]) => {
              const isActive = activePillar === key;

              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`min-h-14 cursor-pointer rounded-lg border px-4 font-extrabold transition ${
                    isActive
                      ? "border-brand-700 bg-brand-700 text-brand-50"
                      : "border-brand-200 bg-white text-brand-800 hover:border-brand-700 hover:bg-brand-700 hover:text-brand-50"
                  }`}
                  onClick={() => setActivePillar(key)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <article className="min-h-72 rounded-lg border border-brand-200 bg-brand-50 p-[clamp(28px,5vw,52px)]">
            <span className="text-xs font-extrabold uppercase text-brand-700">
              {currentPillar.label}
            </span>
            <h3 className={`${heading} my-3`}>{currentPillar.title}</h3>
            <p className="max-w-190 text-[1.1rem] text-black">
              {currentPillar.text}
            </p>
          </article>
        </div>
      </section>

      <section
        className={`${sectionWrap} py-[clamp(70px,10vw,80px)]`}
        id="difference"
        aria-labelledby="difference-title"
      >
        <div className="mb-7 max-w-190">
          <span className={kicker}>What Makes Us Different</span>
          <h2 id="difference-title" className={`${heading} my-3`}>
            Confidence at every step of the ceremony
          </h2>
          <p className="text-[1.05rem] text-black">
            A carefully curated priest network, transparent booking flow, and
            attentive support help devotees perform rituals with peace of mind.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {differentiators.map(({ icon: Icon, title, text }) => (
            <article
              className="min-h-55 rounded-lg border border-brand-200 bg-white p-5 shadow-[0_16px_42px_rgba(124,45,18,0.06)] transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_24px_54px_rgba(124,45,18,0.12)]"
              key={title}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mb-2 mt-4 text-[1.05rem] font-extrabold text-brand-900">
                {title}
              </h3>
              <p className="text-[0.96rem] text-black">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`${sectionWrap} grid grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] items-start gap-[clamp(28px,6vw,72px)] py-[clamp(70px,10vw,100px)] max-lg:grid-cols-1`}
        id="ecosystem"
        aria-labelledby="ecosystem-title"
      >
        <div className="sticky top-7 max-lg:static">
          <span className={kicker}>Beyond Priest Booking</span>
          <h2 id="ecosystem-title" className={`${heading} my-3`}>
            A comprehensive digital ecosystem for devotees
          </h2>
          <p className="text-[1.05rem] text-black">
            Sree Pooja is building services that make faith more accessible
            without compromising tradition. Technology should strengthen
            spiritual connections, not replace them.
          </p>
        </div>
        <div className="grid gap-3">
          {futureItems.map((item, index) => {
            const isOpen = openFuture === index;

            return (
              <div
                className="overflow-hidden rounded-lg border border-brand-200 bg-white"
                key={item}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 bg-transparent px-4.5 py-4 text-left font-extrabold text-brand-900 max-[470px]:items-start"
                  onClick={() => setOpenFuture(isOpen ? -1 : index)}
                >
                  <span>{item}</span>
                  {/* <ChevronDown
                    className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                    size={20}
                    aria-hidden="true"
                  /> */}
                </button>
                {/* <div
                  className={`${isOpen ? "block" : "hidden"} px-4.5 pb-4 text-black`}
                >
                  <p>
                    Designed to help devotees plan, learn, consult, and
                    participate in sacred practices with clarity and respect.
                  </p>
                </div> */}
              </div>
            );
          })}
        </div>
      </section>

      <section
        className={`${sectionWrap} mb-[clamp(48px,8vw,86px)] grid justify-items-center gap-3.5 rounded-lg bg-brand-100 p-[clamp(38px,7vw,68px)] text-center`}
        aria-label="Sree Pooja closing statement"
      >
        <Sparkles className="text-brand-700" size={30} aria-hidden="true" />
        <p className="max-w-205 text-[clamp(1.05rem,2vw,1.2rem)] text-black">
          Every booking is an opportunity to uphold sacred traditions, celebrate
          culture, and help devotees perform rituals with confidence,
          convenience, and complete peace of mind.
        </p>
        <strong className="mt-2 font-serif text-[1.6rem] text-brand-900">
          Sree Pooja
        </strong>
        <span className="font-extrabold text-brand-800">
          Where Tradition Meets Technology. Where Every Prayer Finds the Right
          Priest.
        </span>
      </section>

      <Footer />
    </main>
  );
}

export default AboutUs;
