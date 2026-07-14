import {
  Briefcase,
  Check,
  Edit,
  Landmark,
  MapPin,
  Phone,
  Shield,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "../../../api/Api";
import { formatDate } from "../../../utils/formatter";
import EditPriest from "./EditPriest";
import { notify } from "../../../Utils/notify";

function ViewPriestDetails({ onClose, priestId, status, fetchPriests }) {
  const [priest, setPriest] = useState();
  const [editPriest, setEditPriest] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const data =
      status == "pending"
        ? await getData(`/admin/priests/pending/${priestId}`)
        : await getData(`/admin/priests/${priestId}`);
    setPriest(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priestId, status]);

  const handleAccept = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/priests/pending/${priestId}/approve`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      if (!res.ok) {
        const data = await res.json();
        notify(data.message, "error");
        return;
      }

      notify("Priest Added", "success");
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/priests/pending/${priestId}/reject`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      if (!res.ok) {
        const data = await res.json();
        notify(data.message, "error");
        return;
      }

      // implement whatsapp message
      notify("Priest Rejected", "sucess");
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-brand-500 px-6 py-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center space-x-4">
              <div className="w-15 h-15 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-md overflow-hidden">
                {priest?.priestPhotoUrl ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${priest?.priestPhotoUrl}`}
                    alt={priest?.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-semibold">
                    {priest?.firstName?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {priest?.firstName} {priest?.lastName}
                </h2>
                <div className="flex items-center space-x-2 text-orange-100 text-sm">
                  <span>
                    ID: #
                    {status === "pending"
                      ? priest?.registrationId
                      : priest?.priestId}
                  </span>
                  <span className="flex items-center">
                    {priest?.active ? (
                      <>
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>{" "}
                        Active
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 bg-white rounded-full mr-1"></span>{" "}
                        Inactive
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-2 overflow-y-auto bg-gray-50 grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="p-5">
                  <SectionHeader icon={User} title="Personal Information" />
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem label="First Name" value={priest?.firstName} />
                    <DetailItem label="Last Name" value={priest?.lastName} />
                    <DetailItem
                      label="Date of Birth"
                      value={formatDate(priest?.dob)}
                    />
                    <DetailItem label="Gothra" value={priest?.gothra} />
                    <DetailItem label="Pravara" value={priest?.pravara} />
                    <DetailItem
                      label="Aadhaar Number"
                      value={priest?.aadhaarNumber}
                    />

                    <div className="flex col-span-2 items-center gap-4 mt-1">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider ">
                        Aadhaar PDF
                      </label>
                      <button
                        className="bg-brand-500 shrink-0 text-white px-4 py-1 text-sm rounded-md ml-2"
                        onClick={() =>
                          window.open(
                            `${import.meta.env.VITE_API_BASE_URL}${priest?.aadhaarPdfUrl}`,
                            "_blank",
                          )
                        }
                      >
                        View PDF
                      </button>
                    </div>
                  </div>
                </div>

                <div className=" p-5 ">
                  <SectionHeader icon={Phone} title="Contact Details" />
                  <div className="grid grid-cols-1 gap-4">
                    <DetailItem label="Email Address" value={priest?.email} />
                    <div className="grid grid-cols-2 gap-4">
                      <DetailItem label="Mobile" value={priest?.mobileNumber} />
                      <DetailItem
                        label="WhatsApp"
                        value={priest?.whatsappNumber}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <SectionHeader icon={Landmark} title="Bank Details" />
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem
                      label="Account Holder Name"
                      value={priest?.bankingName}
                    />
                    <DetailItem label="Bank Name" value={priest?.bankName} />
                    <DetailItem label="Branch" value={priest?.bankBranchName} />
                    <DetailItem
                      label="Account No"
                      value={priest?.bankAccountNumber}
                    />
                    <DetailItem
                      label="IFSC Code"
                      value={priest?.bankIfscCode}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className=" p-5">
                  <SectionHeader icon={MapPin} title="Location Details" />
                  <div className="grid grid-cols-1 gap-4">
                    <DetailItem
                      label="Address Line 1"
                      value={priest?.addressLine1}
                    />
                    <DetailItem
                      label="Address Line 2"
                      value={priest?.addressLine2}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <DetailItem label="City" value={priest?.city} />
                      <DetailItem label="Pincode" value={priest?.pincode} />
                    </div>
                    <DetailItem
                      label="Native Place"
                      value={priest?.nativePlace}
                    />
                  </div>
                </div>

                <div className=" p-5">
                  <SectionHeader
                    icon={Briefcase}
                    title="Professional Details"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem
                      label="Experience"
                      value={priest?.experience.replace(/_/g, " ")}
                    />

                    <DetailItem
                      label="Languages"
                      value={priest?.languages
                        ?.filter((lang) => lang !== null && lang !== "")
                        .join(", ")}
                    />

                    <DetailItem
                      label="Community"
                      value={priest?.communityName}
                    />
                    <DetailItem
                      label="Referred By"
                      value={priest?.referredBy}
                    />
                  </div>
                </div>

                <div className="p-5">
                  <SectionHeader icon={Shield} title="System Info" />
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem
                      label="Created At"
                      value={formatDate(priest?.createdAt)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-white border-t border-gray-100 px-6 py-4 flex justify-end space-x-3 shrink-0 rounded-b-3xl">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            {status !== "pending" && (
              <button
                onClick={() => setEditPriest(true)}
                className="px-6 py-2.5 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors flex items-center shadow-md hover:shadow-lg"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Priest
              </button>
            )}

            {status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleReject()}
                  disabled={loading}
                  className="px-6 py-2.5 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors flex items-center shadow-md hover:shadow-lg"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject Priest
                </button>

                <button
                  onClick={() => handleAccept()}
                  disabled={loading}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center shadow-md hover:shadow-lg"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve Priest
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {editPriest && (
        <EditPriest
          onClose={() => setEditPriest(false)}
          priest={priest}
          onSucess={() => {
            fetchData();
            setEditPriest(false);
            fetchPriests();
          }}
        />
      )}
    </>
  );
}

export default ViewPriestDetails;

// --- HELPER COMPONENTS ---
const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center space-x-2 text-brand-500 mb-4 border-b border-orange-100 pb-2">
    <Icon className="w-5 h-5" />
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
      {label}
    </span>
    <span className="text-gray-900 font-medium bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
      {value !== null && value !== "" ? (
        value
      ) : (
        <span className="text-gray-400 italic">Not provided</span>
      )}
    </span>
  </div>
);
