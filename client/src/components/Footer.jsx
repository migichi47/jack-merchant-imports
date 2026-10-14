import React from "react";
import Logo from "./Logo";
import { Dot } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-zinc-950 p-5 text-white w-full">
      <div className="max-w-300 mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <div className="space-y-5 [&>div]:space-y-2.5">
          <Logo variant="secondary" />
          <p className="text-zinc-400 text-sm">
            Personalized vehicle sourcing and guided importation into Kenya.
            Start with your preferences. Move forward with a clearer plan.
          </p>
        </div>

        <div className="space-y-5 [&>div]:space-y-2.5">
          <h1 className="uppercase font-semibold text-sm">Explore</h1>
          <div className="flex flex-col text-zinc-400 text-sm [&>span]:hover:text-white
          [&>span]:cursor-pointer [&>span]:hover:underline">
            {[
              "Home",
              "Our Services",
              "How it works",
              "About Us",
              "Contact Us",
            ].map((link) => (
              <span key={link}>{link}</span>
            ))}
          </div>
        </div>
        <div className="space-y-5 [&>div]:space-y-2.5">
          <h1 className="uppercase font-semibold text-sm">Our services</h1>
          <div className="flex flex-col text-zinc-400 text-sm">
            {[
              "Vehicle Sourcing",
              "Vehicle Importation",
              "Importation Guidance",
              "Personalized Import Quotes",
              "Customer Assistance",
            ].map((link) => (
              <span key={link}>{link}</span>
            ))}
          </div>
        </div>
        <div className="space-y-5 [&>div]:space-y-2.5">
          <h1 className="uppercase font-semibold text-sm">contact</h1>
          <div
            className="flex flex-col text-zinc-400 text-sm [&>span]:flex [&>span]:items-center [&>span]:gap-1
          [&>span]:[&>span]:text-zinc-300"
          >
            {[
              {
                name: "Phone",
                contact: "0715366111",
              },
              {
                name: "WhatsApp",
                contact: "0715366111",
              },
              {
                name: "Email",
                contact: "jackkamau36@gmail.com",
              },
            ].map((contact, i) => (
              <span key={i}>
                {contact.name} <Dot className="w-4" />{" "}
                <span>{contact.contact}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
