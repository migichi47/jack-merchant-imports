import { MessageCircle, Search, ShieldCheck } from "lucide-react";


const TrustStrip = () => {
  return (
    <section className="border-b border-neutral-200 bg-white hidden lg:block">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 py-7 sm:grid-cols-3 sm:px-8">
        {[
          {
            icon: ShieldCheck,
            title: "Guided process",
            text: "Understand the steps before committing.",
          },
          {
            icon: Search,
            title: "Vehicle discovery",
            text: "Explore listings by make, model and budget.",
          },
          {
            icon: MessageCircle,
            title: "Personal assistance",
            text: "Get help choosing a suitable vehicle.",
          },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-4">
            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <Icon size={22} />
            </div>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-1 text-sm text-neutral-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustStrip;
