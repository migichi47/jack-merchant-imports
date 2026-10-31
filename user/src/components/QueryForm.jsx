import { ArrowBigRight } from "lucide-react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useEffect, useState } from "react";
import { useCars } from "../hooks/useCars";

export function QueryForm({ ref }) {
  const initialForm = {
    fullName: "",
    contact: "",
    email: "",
    budget: "",
    description: "",
    car: {
      make: "",
      model: "",
    },
  };
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const { selectedVehicle } = useCars();

  useEffect(() => {
    if (!selectedVehicle) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((prev) => ({
      ...prev,
      car: {
        ...prev.car,
        make: selectedVehicle.make ?? "",
        model: selectedVehicle.model ?? "",
      },
    }));
  }, [selectedVehicle]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/api/queries", { ...form });
      toast.success("Query submitted successfully");
      setForm(initialForm);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm w-full sm:p-8 sm:max-w-200 sm:min-w-160 mx-auto"
    >
      {selectedVehicle ? (
        <h2 className="font-semibold text-green-600">
          Confirm query for{" "}
          <span className="text-xl font-bold">
            {selectedVehicle.make} {selectedVehicle.model}{" "}
            {selectedVehicle.year}
          </span>
        </h2>
      ) : (
        <h3 className="text-xl font-bold">Request an import quotation</h3>
      )}
      <p className="mt-2 text-xs text-neutral-500">
        Fields marked with * are required.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Full name *</span>
          <input
            required
            value={form.fullName}
            onChange={(event) =>
              setForm({ ...form, fullName: event.target.value })
            }
            placeholder="Your full name"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-xs outline-none
                focus:border-pink-500 focus:ring-2 focus:ring-red-600/10 font-semibold"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">
            Phone number *
          </span>
          <input
            required
            type="tel"
            maxLength={13}
            value={form.contact}
            onChange={(event) =>
              setForm({ ...form, contact: event.target.value })
            }
            placeholder="07XX XXX XXX"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-xs outline-none
                focus:border-pink-500 focus:ring-2 focus:ring-red-600/10 font-semibold"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">
            Email address
          </span>
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            placeholder="you@example.com"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-xs outline-none
                focus:border-pink-500 focus:ring-2 focus:ring-red-600/10 font-semibold"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Make</span>
          <input
            type="text"
            value={form.car.make}
            required
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                car: {
                  ...prev.car,
                  make: event.target.value,
                },
              }))
            }
            placeholder="eg. Toyota"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm text-pink-500 outline-none
                focus:border-pink-500 focus:ring-2 focus:ring-red-600/10 font-semibold"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Model</span>
          <input
            type="text"
            required
            value={form.car.model}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                car: {
                  ...prev.car,
                  model: event.target.value,
                },
              }))
            }
            placeholder="eg. premio"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm text-pink-500 outline-none
                focus:border-pink-500 focus:ring-2 focus:ring-red-600/10 font-semibold"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">
            Approximate budget (KES)
          </span>
          <input
            value={form.budget}
            onChange={(event) =>
              setForm({ ...form, budget: event.target.value })
            }
            inputMode="numeric"
            placeholder="e.g. 3000000"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-xs outline-none
                focus:border-pink-500 focus:ring-2 focus:ring-red-600/10 font-semibold"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold">
            Query Description{" "}
            {form?.message?.length >= 500 && (
              <span className="text-xs text-red-600">*max limit reached</span>
            )}
          </span>
          <textarea
            rows={4}
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            maxLength={500}
            placeholder="Anything else we should know..."
            className="w-full resize-y rounded-lg border border-neutral-200 px-4 py-3 text-xs outline-none
                focus:border-red-600 focus:ring-2 focus:ring-red-600/10 font-semibold"
          />
          <p className="text-sm text-gray-500">
            {form?.message?.length || 0} / 500 characters
          </p>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-4 font-semibold
            text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        {submitting ? "Processing..." : "Submit enquiry"}
        {!submitting && <ArrowBigRight size={18} />}
      </button>
    </form>
  );
}
