import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export const StatCard = ({
  title,
  value,
  icon: Icon,
  colorClass,
  bgClass,
  trend,
  trendUp,
  isCurrency = false,
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          {isCurrency && <span className="mr-1">₹</span>}
          {typeof value === "number" && isCurrency
            ? value.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : value}
        </h3>
      </div>
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgClass}`}
      >
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
    </div>

    {/* Optional Trend Indicator - Mocked for visual realism */}
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <span
          className={`flex items-center font-medium ${trendUp ? "text-green-600" : "text-red-600"}`}
        >
          {trendUp ? (
            <ArrowUpRight className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1" />
          )}
          {trend}%
        </span>
        <span className="text-gray-400 ml-2">vs last month</span>
      </div>
    )}
  </div>
);