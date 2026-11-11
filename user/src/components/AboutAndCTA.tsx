import { Handshake} from "lucide-react";
import { useEffect, useState } from "react";
import { whyChooseUs } from "../data/aboutAndCTAData";
import { useCars } from "../hooks/useCars";

const AboutAndCTA = () => {
  const { pastImports } = useCars();
  const [carImage, setCarImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const randomCarImport = Math.floor(Math.random() * pastImports?.length);
    setCarImage(pastImports[randomCarImport]?.imageUrl ?? undefined);
  }, [pastImports]);

  return (
    <section className="py-24 px-4 md:px-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* ABOUT US */}
        <div
          id="about"
          className="grid md:grid-cols-2 gap-16 items-center md:mb-28 mb-18"
        >
          <div>
            <span className="text-red-600 font-semibold uppercase tracking-widest text-sm">
              About Jack Merchant Imports
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mt-4 leading-tight">
              Driving Dreams.
              <span className="text-red-600"> Delivering Happiness.</span>
            </h2>
            <p className="text-neutral-600 leading-8 mt-6">
              At Jack Merchant Imports, we believe that importing a vehicle is
              more than just a transaction; it is about fulfilling dreams,
              creating memorable experiences and giving our clients confidence
              in every purchase.
            </p>
            <p className="text-neutral-600 leading-8 mt-4">
              Over the past two years, we have built our business around one
              fundamental promise: to deliver quality vehicles and exceptional
              customer experiences. Our journey is driven by a passion for
              automobiles and an unwavering commitment to helping clients access
              reliable and competitively priced vehicles from international
              markets, particularly Japan.
            </p>
            <div className="flex gap-10 mt-8">
              <div>
                <h3 className="text-4xl font-bold text-red-600">2+</h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Years of Experience
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-red-600">100%</h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Client Commitment
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={carImage}
              alt="Premium imported vehicle"
              className="w-full h-112.5 object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-xl shadow-lg">
              <p className="text-3xl font-bold">2+</p>
              <p className="text-sm">Years of building trust</p>
            </div>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div id="why-choose-us">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-red-600 font-semibold uppercase tracking-widest text-sm">
              Why Choose Us
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mt-4">
              More Than Just Importing Cars
            </h2>

            <p className="text-neutral-500 leading-7 mt-5">
              We make the journey to owning your dream vehicle straightforward,
              transparent and rewarding.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((value) => {
              const Icon = value.icon ?? Handshake;

              return (
                <div
                  key={value.title}
                  className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 mt-6">
                    {value.title}
                  </h3>

                  <p className="text-neutral-500 leading-7 mt-3">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAndCTA;
