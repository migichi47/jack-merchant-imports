import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import { navLinks } from "../data/navlinks";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
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
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
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
  );
}
