import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { CarFront, CheckCheck, Clock } from "lucide-react";
import StatusBar from "../components/StatusBar";
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { AdminContext } from "../context/AdminContext";
import Spinner from "../components/Spinner";
import { formatPhoneNumber } from "../services/formatPhone";

const QueryDetails = () => {
  const [query, setQuery] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();
  const [replied, setReplied] = useState(false);
  const { deleteQuery } = useContext(AdminContext);
  const formatedPhone = formatPhoneNumber(query?.contact);

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/queries/${id}`);
        setQuery(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch queries");
      } finally {
        setLoading(false);
      }
    };
    fetchQuery();
  }, [id, replied]);

  const updateQuery = async (newStatus) => {
    await api.patch(`/api/queries/${query._id ?? query.id}`, {
      status: newStatus,
    });
    setReplied(newStatus === "inprogress" ? false : true);
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Spinner size={36} className="text-red-600" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Enquiry from {query?.fullName}</h1>
        <span className="text-gray-500 text-sm">
          Received{" "}
          {new Date(query?.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>

      <div className="bg-white rounded-xl p-5 space-y-4 border border-gray-300">
        <h2 className="font-bold text-lg">Customer enquiry</h2>
        <div className="space-y-5">
          <div className="bg-gray-100 rounded-xl p-3 flex items-center gap-3">
            <CarFront className="text-gray-500" />
            <div className="leading-5">
              <h3 className="text-gray-500">Vehicle of Interest</h3>
              <p className="font-semibold text-lg">
                {query?.car?.make} {query?.car?.model}{" "}
                <span className="text-sm text-pink-500">
                  {query?.car?.year?.from} - {query?.car?.year?.to}
                </span>
              </p>
            </div>
          </div>
          <p className="text-gray-600">
            {query?.description || "__No description__"}
          </p>
          <div className="flex gap-5">
            {query?.email && (
              <Button variant="secondary">
                <MdOutlineMail className="text-lg" />
                Email Customer
              </Button>
            )}
            <Button className="bg-green-600">
              <Link
                className="flex gap-1"
                to={`https://wa.me/${formatedPhone}`}
                target="_blank"
              >
                <FaWhatsapp className="text-lg" /> Whatsapp Customer
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 space-y-4 border border-gray-200">
        <h2 className="font-bold text-lg">Customer details</h2>
        <div className="space-y-5">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs">Name</span>
            <span>{query?.fullName}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs">Email</span>
            <span>{query?.email ?? "N/A"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs">Phone</span>
            <span>{formatedPhone}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 space-y-4 border border-gray-200">
        <h2 className="font-bold text-lg">Status & Assignment</h2>
        <div className="space-y-5">
          <StatusBar status={query?.status} />
          <div className="flex gap-4">
            {!replied ? (
              <Button
                className="bg-transparent text-black border border-gray-300 active:bg-black active:text-white"
                variant={null}
                onClick={() => updateQuery("replied")}
              >
                <CheckCheck className="w-4" />
                Mark as Replied
              </Button>
            ) : (
              <Button
                className="bg-transparent text-black border border-gray-300 active:bg-black active:text-white"
                variant={null}
                onClick={() => updateQuery("inprogress")}
              >
                <Clock className="w-4" />
                Mark as In Progress
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <Button onClick={() => deleteQuery(query?._id ?? query?.id)}>
          Delete Query
        </Button>
      </div>
    </div>
  );
};

export default QueryDetails;
