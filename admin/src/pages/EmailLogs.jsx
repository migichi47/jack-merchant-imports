import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Search,
  RefreshCw,
  Eye,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  LoaderCircle,
  ArrowUpRight,
} from "lucide-react";
import api from "../services/api";

const statusStyles = {
  sent: {
    label: "Sent",
    className: "bg-green-50 text-green-700 border-green-200",
    icon: CheckCircle2,
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-50 text-green-700 border-green-200",
    icon: CheckCircle2,
  },
  failed: {
    label: "Failed",
    className: "bg-red-50 text-red-700 border-red-200",
    icon: XCircle,
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Invalid date";

  return parsedDate.toLocaleString("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatType = (type = "") =>
  type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "Unknown";

const StatusBadge = ({ status }) => {
  const config = statusStyles[status?.toLowerCase()] ?? {
    label: status || "Unknown",
    className: "bg-gray-100 text-gray-600 border-gray-200",
    icon: AlertTriangle,
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      <Icon size={13} />
      {config.label}
    </span>
  );
};

const EmailDetailsModal = ({ email, onClose }) => {
  if (!email) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-modal-title"
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-gray-100 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              <Mail size={22} />
            </div>

            <div>
              <h2
                id="email-modal-title"
                className="text-lg font-bold text-gray-900"
              >
                Email details
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Complete email record and delivery information
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close email details"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StatusBadge status={email.status} />
            <span className="text-sm text-gray-500">
              {formatDate(email.createdAt)}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Recipient
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-gray-800">
                {email.to || "—"}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Email type
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                {formatType(email.type)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4 sm:col-span-2">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Subject
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                {email.subject || "No subject"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-gray-800">
              Message body
            </h3>
            <div className="max-h-64 overflow-y-auto whitespace-pre-wrap wrap-break-word rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-7 text-gray-700">
              {email.message || "No message content"}
            </div>
          </div>

          {email.status?.toLowerCase() === "failed" && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-2 font-semibold text-red-700">
                <AlertTriangle size={18} />
                Delivery failure reason
              </div>
              <p className="mt-2 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-red-700">
                {email.error || "No error details recorded."}
              </p>
            </div>
          )}

          <div className="rounded-xl border border-gray-200 p-4">
            <h3 className="mb-3 text-sm font-bold text-gray-800">
              Record information
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400">Email record ID</p>
                <p className="mt-1 break-all font-mono text-xs text-gray-600">
                  {String(email._id || "—")}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Related query ID</p>
                <p className="mt-1 break-all font-mono text-xs text-gray-600">
                  {String(email.queryId || "—")}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Last updated</p>
                <p className="mt-1 text-gray-700">
                  {formatDate(email.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-100 p-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PastEmails() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedEmail, setSelectedEmail] = useState(null);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError("");

      // Assumes GET /api/emails returns an array or { emails: [] }
      const response = await api.get("/api/emails");

      const records = Array.isArray(response.data)
        ? response.data
        : response.data.emails;

      if (!Array.isArray(records)) {
        throw new Error("Unexpected response from the email API.");
      }

      setEmails(records);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Could not load email records.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEmails();
  }, []);

  const emailTypes = useMemo(
    () => [...new Set(emails.map((email) => email.type).filter(Boolean))],
    [emails],
  );

  const filteredEmails = useMemo(() => {
    const term = search.trim().toLowerCase();

    return emails.filter((email) => {
      const matchesSearch = [
        email.to,
        email.subject,
        email.message,
        email.type,
        email.error,
        email.queryId,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(term),
      );

      const matchesStatus =
        statusFilter === "all" || email.status?.toLowerCase() === statusFilter;

      const matchesType = typeFilter === "all" || email.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [emails, search, statusFilter, typeFilter]);

  const failedCount = emails.filter(
    (email) => email.status?.toLowerCase() === "failed",
  ).length;

  const sentCount = emails.filter((email) =>
    ["sent", "delivered"].includes(email.status?.toLowerCase()),
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <Mail size={16} />
              Communications
              <span>/</span>
              <span className="text-gray-800">Past emails</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Past Emails
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Review email history, delivery statuses, and failure reasons.
            </p>
          </div>

          <button
            onClick={fetchEmails}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Total emails</p>
              <div className="rounded-xl bg-orange-50 p-2.5 text-orange-600">
                <Mail size={20} />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-900">
              {emails.length}
            </p>
            <p className="mt-1 text-xs text-gray-400">All recorded attempts</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Sent / delivered
              </p>
              <div className="rounded-xl bg-green-50 p-2.5 text-green-600">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-900">{sentCount}</p>
            <p className="mt-1 text-xs text-gray-400">
              Recorded successful sends
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Failed emails</p>
              <div className="rounded-xl bg-red-50 p-2.5 text-red-600">
                <XCircle size={20} />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-900">
              {failedCount}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Attempts needing attention
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search recipient, subject, message, or query ID..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400"
            >
              <option value="all">All statuses</option>
              <option value="sent">Sent</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>

            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400"
            >
              <option value="all">All email types</option>
              {emailTypes.map((type) => (
                <option key={type} value={type}>
                  {formatType(type)}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 text-xs text-gray-400">
            Showing {filteredEmails.length} of {emails.length} emails
          </div>
        </div>

        {/* Email table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3">
              <LoaderCircle
                size={32}
                className="animate-spin text-orange-500"
              />
              <p className="text-sm text-gray-500">Loading email history...</p>
            </div>
          ) : error ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <XCircle size={36} className="text-red-500" />
              <h3 className="mt-3 font-semibold text-gray-900">
                Failed to load emails
              </h3>
              <p className="mt-2 max-w-lg text-sm text-gray-500">{error}</p>
              <button
                onClick={fetchEmails}
                className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white cursor-pointer"
              >
                Try again
              </button>
            </div>
          ) : filteredEmails.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <div className="rounded-2xl bg-gray-100 p-4 text-gray-400">
                <Mail size={30} />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">
                No emails found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-212.5 text-left">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Recipient / subject
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Type
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Date
                    </th>
                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredEmails.map((email) => (
                    <tr key={email._id} className="transition hover:bg-gray-50">
                      <td className="max-w-md px-5 py-4">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {email.to}
                        </p>
                        <p className="mt-1 truncate text-sm text-gray-500">
                          {email.subject || "No subject"}
                        </p>
                        {email.status?.toLowerCase() === "failed" && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                            <AlertTriangle size={12} />
                            {email.error || "Delivery failed"}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-600">
                          {formatType(email.type)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={email.status} />
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                        {formatDate(email.createdAt)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedEmail(email)}
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                        >
                          <Eye size={15} />
                          View
                          <ArrowUpRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs leading-5 text-gray-400">
          Email status reflects the status recorded by your application. A
          successful send does not necessarily mean the recipient received or
          read the email.
        </p>
      </div>

      {selectedEmail && (
        <EmailDetailsModal
          email={selectedEmail}
          onClose={() => setSelectedEmail(null)}
        />
      )}
    </div>
  );
}
