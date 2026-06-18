import { CheckCircle2, Languages, MapPin, Phone, Users } from "lucide-react";

export const PriestCard = ({ priest, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left rounded-xl border  transition-all
        ${
          selected
            ? "border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-200"
            : "border-slate-200 hover:border-orange-300 hover:bg-orange-50/40"
        }
      `}
    >
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden shrink-0">
            {priest.avatar ? (
              <img
                src={priest.avatar}
                alt={priest.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-semibold">
                {priest.firstName?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-lg">{priest.firstName}</h3>

            {selected && <CheckCircle2 size={18} className="text-orange-500" />}
          </div>

          <div className="flex items-center gap-2 text-slate-600 mt-2">
            <Phone size={14} />
            {priest.mobileNumber}
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge icon={<Languages size={14} />} label={priest.lastName} />

            <Badge icon={<Users size={14} />} label={priest.trimathastharu} />

            <Badge icon={<MapPin size={14} />} label={priest.city} />
          </div>
        </div>

        <div className="self-start sm:self-center">
          <div
            className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${selected ? "border-orange-500" : "border-slate-300"}
            `}
          >
            {selected && <div className="w-3 h-3 rounded-full bg-orange-500" />}
          </div>
        </div>
      </div>
    </button>
  );
};

const Badge = ({ icon, label }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-slate-100 text-sm">
    {icon}
    {label}
  </span>
);