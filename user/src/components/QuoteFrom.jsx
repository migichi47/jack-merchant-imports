import { CheckCircle2 } from "lucide-react";
import { QueryForm } from "./QueryForm";

const QuoteFrom = () => {
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
        <QueryForm />
      </div>
    </section>
  );
};

export default QuoteFrom;
