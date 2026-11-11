import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

type Card = {
  id: number;
  title: string;
  description: string;
  position: string;
  index: number;
};

const AboutAndCTA = () => {
  const [topCard, setTopCard] = useState<number>(1);
  const [play, setPlay] = useState<boolean>(true);

  useEffect(() => {
    if (!play) return;
    const interval = setInterval(() => {
      setTopCard((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          return (prev = 1);
        }
        return prev + 1;
      });
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [topCard, play]);

  const cards: Card[] = [
    {
      id: 1,
      title: "Driving Dreams. Delivering Happiness.",
      description:
        "At Jack Merchant Imports, we believe that importing a vehicle is more than just a transaction; it is about fulfilling dreams, creating memorable experiences and giving our clients confidence in every purchase. Over the past two years, we have built our business around one fundamental promise: to deliver quality vehicles and exceptional customer experiences. Our journey has been driven by a passion for automobiles and an unwavering commitment to helping clients access quality, reliable and competitively priced vehicles from the international market, particularly Japan.",
      position: "top-30 right-5",
      index: 1 ,
    },
    {
      id: 2,
      title: "Our Commitment to Quality",
      description:
        "Quality is at the heart of everything we do. From carefully identifying vehicles to reviewing auction information, assessing vehicle condition and coordinating the importation process, we pay attention to the details that matter. We understand that purchasing a vehicle is a significant investment. That is why we strive to make the process transparent, professional and seamless, ensuring our clients make informed decisions and receive value for their money.",
      position: "bottom-5 right-52",
      index: 2,
    },
    {
      id: 3,
      title: "Two Years of Trust and Happiness",
      description:
        "Over the last two years, our greatest achievement has not simply been the number of vehicles imported, but the smiles, satisfaction and trust of the clients we have served. Every successful delivery represents another dream fulfilled, another milestone celebrated and another relationship built. We take pride in walking with our clients throughout the journey, from vehicle selection and purchase to shipping, clearance and final delivery.",
      position: "top-5 left-70",
      index: 0,
    },
  ];

  return (
    <section id="about" className="scroll-mt-24 px-10">
      <div
        className="flex max-w-350 mx-auto flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row
        lg:items-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-linear-to-br from-white to-black/80 via-red-400 relative h-150"
      >
        <span
          className="absolute top-5 left-5 rounded-full border border-gray-400 p-2 cursor-pointer hover:bg-gray-200
          transition duration-300"
          onClick={() => setPlay((prev) => !prev)}
        >
          {play ? (
            <Play className="text-gray-600" />
          ) : (
            <Pause className="text-gray-600" />
          )}
        </span>
        <div className="space-y-15 w-150 flex flex-col">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-black">
            What do we do?
          </p>
          <h2 className="mt-4 text-3xl text-transparent bg-clip-text bg-linear-to-r via-black/60 to-black from-red-800 font-black tracking-wider leading-13 sm:text-5xl">
            About Jack Merchants Imports
          </h2>
        </div>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`leading-7 text-neutral-500 bg-white absolute ${card.position} w-150 flex flex-col gap-2 items-center
            rounded-lg p-5 text-center shadow-lg ${topCard === card.id ? "z-10  border border-red-600 scale-105" : `z-${card.index}`}
            transition duration-300`}
          >
            <h1 className="font-bold text-black text-xl">{card.title}</h1>
            <p className="text-md text-zinc-500 leading-6">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutAndCTA;
