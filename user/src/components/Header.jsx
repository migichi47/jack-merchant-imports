import { ArrowRight, Calendar, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import { navLinks } from "../data/navlinks";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-100 py-2 sm:py-2 px-4">
        <div className="max-w-7xl mx-auto flex md:justify-between justify-center items-center text-xs sm:text-[12px]">
          <div className="hidden md:flex items-center gap-2 text-gray-600">
            <Calendar size={18} />
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-gray-500 inline-flex font-semibold leading-[1.08] tracking-tight gap-2">
            Import your next car from Japan to Kenya.
          </h1>
          <div className="hidden md:flex items-center gap-4">
            <span className="border border-green-300 bg-green-100 rounded-full p-1">
              LIVE RATES
            </span>
            <div>
              USD/KES: <span className="font-semibold">130.00</span>
            </div>
          </div>
        </div>
      </header>
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-15 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-neutral-600 transition hover:text-pink-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#request-quote"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3
              text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Get a quote <ArrowRight size={16} />
            </a>
          </div>

          <button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-lg border border-neutral-200 p-2 md:hidden"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-neutral-200 bg-white p-5 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-neutral-50"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#request-quote"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 block rounded-lg bg-red-600 px-4 py-3 text-center font-semibold text-white"
            >
              Get a quote
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
