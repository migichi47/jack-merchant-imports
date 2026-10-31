const HowItWorks = () => {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">
            Simple and transparent
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            How it works
          </h2>
          <p className="mt-4 leading-7 text-neutral-600">
            We help you move from choosing a car to planning its journey to
            Kenya, one step at a time.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Tell us what you want",
              description:
                "Choose from available listings or share your preferred make, model, year and budget.",
            },
            {
              number: "02",
              title: "Review your quotation",
              description:
                "Discuss the vehicle price, shipping, applicable taxes, duties and other import charges.",
            },
            {
              number: "03",
              title: "Plan your import",
              description:
                "Once terms are agreed, follow the arrangements and receive updates from our team.",
            },
          ].map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-neutral-200 p-7 transition hover:border-red-200 hover:shadow-lg sm:p-8"
            >
              <p className="text-5xl font-black tracking-tight text-red-600/20">
                {step.number}
              </p>
              <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
