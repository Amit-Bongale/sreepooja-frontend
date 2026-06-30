export const getStatusBadge = (status) => {
  const baseClasses =
    "px-2.5 py-1 rounded-full text-xs font-bold border";

  const statusStyles = {
    ACTIVE: "bg-green-100 text-green-700 border-green-200",
    CONFIRMED: "bg-green-100 text-green-700 border-green-200",
    SENT: "bg-green-100 text-green-700 border-green-200",
    true: "bg-green-100 text-green-700 border-green-200",

    DRAFT: "bg-amber-100 text-amber-700 border-amber-200",
    SCHEDULED: "bg-amber-100 text-amber-700 border-amber-200",
    PENDING_PAYMENT: "bg-amber-100 text-amber-700 border-amber-200",

    INACTIVE: "bg-red-100 text-red-700 border-red-200",
    false : "bg-red-100 text-red-700 border-red-200",
    CANCELLED : "bg-red-100 text-red-700 border-red-200"

  };

  return (
    <span
      className={`${baseClasses} ${
        statusStyles[status] || "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
};