import { CheckCircle } from "lucide-react";

const priest = {
    name: "john Doe",
    languages: ["kannda" , "hindi"],
    area: "bengaluru",
}

const PriestCard = ({
  selected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(priest)}
      className={`border rounded-2xl p-4 cursor-pointer transition-all ${
        selected
          ? "border-brand-500 bg-brand-50"
          : "border-gray-200 hover:border-brand-300"
      }`}
    >
      <div className="flex justify-between">

        <div>
          <h3 className="font-semibold">
            {priest.name}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {priest.languages.join(", ")}
          </p>

          <p className="text-sm text-gray-500">
            {priest.area}
          </p>
        </div>

        <div className="text-right">
          {selected && (
            <CheckCircle
              className="ml-auto mt-2 text-brand-500"
              size={20}
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default PriestCard;