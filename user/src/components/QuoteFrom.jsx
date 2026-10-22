import { ArrowBigRight, CheckCircle2 } from "lucide-react";
import { formatUSD } from "../services/UtilityFunctions";

const QuoteFrom = ({
  handleSubmit,
  selectedVehicle,
  form,
  setForm,
  submitting,
  submitMessage,
}) => {
  return (
    <section
      id="request-quote"
      className="scroll-mt-24 bg-neutral-50 py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">
            Get started
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Let's find your next car.
          </h2>
          <p className="mt-5 leading-7 text-neutral-600">
            Send us your details and requirements. Our team can use them to
            prepare a personalised response.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Tell us your preferred vehicle",
              "Share your approximate budget",
              "Discuss the import and delivery costs",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-neutral-700"
              >
                <CheckCircle2 size={19} className="shrink-0 text-red-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h3 className="text-xl font-bold">Request an import quotation</h3>
          <p className="mt-2 text-sm text-neutral-500">
            Fields marked with * are required.
          </p>

          {selectedVehicle && (
            <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
                Vehicle of interest
              </p>
              <p className="mt-1 font-bold text-neutral-900">
                {selectedVehicle.year} {selectedVehicle.brand_name}{" "}
                {selectedVehicle.model_name}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                Listed at {formatUSD(selectedVehicle.price_usd)} in Japan
              </p>
            </div>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Full name *
              </span>
              <input
                required
                value={form.fullName}
                onChange={(event) =>
                  setForm({ ...form, fullName: event.target.value })
                }
                placeholder="Your full name"
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none
                focus:border-pink-500 focus:ring-2 focus:ring-red-600/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Phone number *
              </span>
              <input
                required
                type="tel"
                value={form.contact}
                onChange={(event) =>
                  setForm({ ...form, contact: event.target.value })
                }
                placeholder="07XX XXX XXX"
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none
                focus:border-pink-500 focus:ring-2 focus:ring-red-600/10"
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
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none
                focus:border-pink-500 focus:ring-2 focus:ring-red-600/10"
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
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none
                focus:border-pink-500 focus:ring-2 focus:ring-red-600/10"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold">
                Vehicle requirements *
              </span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
                placeholder="Make, model, preferred year, budget and anything else we should know..."
                className="w-full resize-y rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none
                focus:border-red-600 focus:ring-2 focus:ring-red-600/10 text-pink-500 font-semibold"
              />
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

          {submitMessage && (
            <p
              role="status"
              className="mt-4 rounded-lg bg-neutral-100 p-4 text-sm leading-6 text-neutral-700"
            >
              {submitMessage}
            </p>
          )}

          <p className="mt-4 text-center text-xs leading-5 text-neutral-500">
            Your enquiry will not be sent until this form is connected to the
            Jack Merchants backend.
          </p>
        </form>
      </div>
    </section>
  );
};

export default QuoteFrom;
