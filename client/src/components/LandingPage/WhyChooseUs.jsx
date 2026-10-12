import { CarFront } from "lucide-react";
import WhyChooseUsData from "../../data/WhyChooseUsData";

const WhyChooseUs = () => {
  return (
    <div className="px-5 max-w-300 mx-auto space-y-5">
      <h1 className="flex space-y-2 text-2xl sm:text-4xl capitalize gap-2 mx-auto w-fit">
        <span>Why you can</span> <span className="font-bold">trust us</span>
      </h1>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {WhyChooseUsData.map((card, i) => {
          const { header, description, icon } = card;
          return (
            <div
              className="bg-gray-100 rounded-lg border border-gray-200 p-5 flex flex-col justify-between"
              key={i}
            >
              <div className="flex justify-between">
                <span className="bg-gray-300 h-fit p-3 rounded-full">
                  {icon}
                </span>
                <CarFront className="w-20 h-20 text-gray-200" />
              </div>
              <div className="text-gray-700 space-y-2">
                <h1 className="text-xl font-bold">{header}</h1>
                <p className="text-gray-500 text-sm">{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyChooseUs;
