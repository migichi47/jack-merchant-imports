import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import SectionHeading from "../components/SectionHeading";
import { Check, Pencil, X } from "lucide-react";
import { toast } from "react-toastify";
import { formatDate } from "../services/formatDate";

const ImportDetails = () => {
  const { id } = useParams();
  const [pastImport, setPastImport] = useState({});
  const [editingField, setEditingField] = useState([]);
  const [update, setUpdate] = useState();
  const [updating, setUpdating] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPastImports = async () => {
    const response = await api.get(`/api/imports/${id}`);
    setPastImport(response.data);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPastImports();
  }, [fetchPastImports]);

  const updateImport = async () => {
    if (!update) return;
    setUpdating(true);
    try {
      const response = await api.patch(`/api/imports/${id}`, {
        [editingField]: update,
      });
      toast.success(response.message || "Import updated succeessfully");
      setUpdate("");
      setEditingField("");
      fetchPastImports();
    } catch (err) {
      toast.error(err.message || err.response || "failed to update import");
    } finally {
      setUpdating(false);
    }
  };

  const detailFields = [
    {
      key: "make",
      label: "Make",
      value: pastImport?.make,
    },
    {
      key: "model",
      label: "Model",
      value: pastImport?.model,
    },
    {
      key: "year",
      label: "Year of Manufacture",
      value: pastImport?.year,
    },
    {
      key: "arrival",
      label: "Date of import",
      value: formatDate(pastImport?.arrival),
    },
    {
      key: "description",
      label: "Description",
      value: pastImport?.description || "N/A",
    },
  ];

  return (
    <div className="flex flex-col">
      <SectionHeading
        title={`Import Details for ${pastImport?.make} ${pastImport?.model}`}
        description={"View or change details of this past import."}
      />
      <div className="flex flex-col sm:flex-row gap-10">
        <img src={pastImport?.imageUrl} alt="" className="w-100 max-w-150" />
        <div className="space-y-3">
          {detailFields.map((detailField) => {
            return (
              <div className="flex gap-3 w-fit">
                <h1 className="text-pink-500">{detailField.label}:</h1>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-5 items-center">
                    {updating && editingField === detailField.key ? (
                      <span className="text-pink-500">Updating...</span>
                    ) : (
                      <span className="font-semibold text-gray-900 cursor-pointer">
                        {detailField.value}
                      </span>
                    )}

                    {editingField === detailField.key ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={updating}
                          onClick={updateImport}
                          className="disabled:opacity-50"
                        >
                          <Check className="w-5 text-green-600" />
                        </button>

                        <button
                          type="button"
                          disabled={updating}
                          onClick={() => {
                            setEditingField(null);
                            setUpdate("");
                          }}
                        >
                          <X className="w-4 text-gray-500" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingField(detailField.key);
                          setUpdate(String(detailField.value ?? ""));
                        }}
                      >
                        <Pencil className="w-4 hover:text-pink-500" />
                      </button>
                    )}
                  </div>

                  {editingField === detailField.key && (
                    <input
                      autoFocus
                      value={update}
                      type="text"
                      disabled={updating}
                      className="border border-gray-400 rounded-sm outline-red-600 pl-1 text-sm py-1"
                      onChange={(e) => setUpdate(e.target.value)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImportDetails;
