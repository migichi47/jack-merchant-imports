import { Ship } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
            <Ship size={21} />
          </div>
          <div>
            <p className="font-black">JACK MERCHANTS IMPORTS</p>
            <p className="mt-1 text-xs text-neutral-400">
              Your car import journey starts here.
            </p>
          </div>
        </a>

        <div className="flex flex-wrap gap-5 text-sm text-neutral-400">
          <a href="#vehicles" className="hover:text-white">
            Find a car
          </a>
          <a href="#how-it-works" className="hover:text-white">
            How it works
          </a>
          <a href="#request-quote" className="hover:text-white">
            Contact us
          </a>
        </div>

        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} Jack Merchants Imports.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
