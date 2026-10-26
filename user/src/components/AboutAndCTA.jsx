import { ArrowRight } from "lucide-react";

const AboutAndCTA = () => {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-neutral-950 py-16 text-white sm:py-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
            Jack Merchants Imports
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Have a specific car in mind?
          </h2>
          <p className="mt-4 leading-7 text-neutral-300">
            You don't have to find the perfect listing yourself. Tell us what
            you need, and start a conversation about sourcing the right vehicle.
          </p>
        </div>

        <a
          href="#request-quote"
          className="inline-flex shrink-0 items-center gap-3 rounded-lg bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-700"
        >
          Let's discuss your car <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
};

export default AboutAndCTA;
