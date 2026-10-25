import { ArrowDown, ArrowRight, CheckCircle2, Clock3 } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-neutral-950 text-white min-h-[90vh] flex items-center"
    >
      <div className="absolute -right-40 -top-40 -z-10 h-1255w-125nded-full bg-red-600/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 -z-10 h-100 w-100nded-full bg-red-600/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-32">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-neutral-200">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Your trusted car import partner in Kenya
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Your next car.
            <br />
            <span className="text-red-500">From Japan</span> to Kenya.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-neutral-300 sm:text-lg">
            Find the right vehicle, get guidance through the import process, and
            receive a personalised quotation from Jack Merchants Imports.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/#quick-search"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-700"
            >
              Explore vehicles <ArrowRight size={18} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              How importing works <ArrowDown size={17} />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-red-500" />
              Personalised quotations
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-red-500" />
              Guided import process
            </span>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="rounded-3xl border border-white/10 bg-white/4 p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
              Your import journey
            </p>
            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              A better way to bring your car home.
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-400">
              From choosing a vehicle in Japan to planning its delivery to
              Kenya, our team helps you understand each step.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  number: "01",
                  title: "Choose your vehicle",
                  description: "Browse listings or tell us what you want.",
                },
                {
                  number: "02",
                  title: "Receive your quotation",
                  description: "Discuss costs and your import requirements.",
                },
                {
                  number: "03",
                  title: "Follow your import",
                  description: "Get guidance as your order progresses.",
                },
              ].map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-sm font-bold text-red-400">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-red-500/20 bg-red-600/10 p-4">
              <div className="flex items-center gap-3">
                <Clock3 className="shrink-0 text-red-400" size={22} />
                <div>
                  <p className="font-semibold">Delivery planning</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-300">
                    Your estimated delivery timeline will be confirmed for your
                    specific vehicle and order.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-3 -z-10 h-28 w-28 rounded-full bg-red-600/30 blur-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
