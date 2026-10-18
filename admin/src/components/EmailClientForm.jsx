import { useState } from "react";
import { toast } from "react-toastify";
import { Send, X } from "lucide-react";
import api from "../services/api";

const EmailClientForm = ({ query, onClose }) => {
  const [subject, setSubject] = useState(
    "Update on your vehicle import request",
  );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(`/api/queries/${query._id}/email`, {
        subject,
        message,
      });

      toast.success(response.data.message);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-5 rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Email client</h2>
            <p className="mt-1 text-sm text-gray-500">To: {query.email}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
            aria-label="Close email form"
          >
            <X size={20} />
          </button>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={200}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
            maxLength={10000}
            required
            placeholder={`Hello ${query.fullName},\n\nWrite your message here...`}
            className="w-full resize-y rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-red-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={18} />
          {loading ? "Sending..." : "Send email"}
        </button>
      </form>
    </div>
  );
};

export default EmailClientForm;
