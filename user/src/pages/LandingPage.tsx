import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import QuerySection from "../components/QuerySection";
import AboutAndCTA from "../components/AboutAndCTA";
import QuoteFrom from "../components/QuoteFrom";
import PastImportsSection from "../components/PastImportsSection";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.substring(1);

    // Wait for React to render the target element
    requestAnimationFrame(() => {
      const element = document.getElementById(id);

      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [location.hash, location.key]);
  
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <main>
        <Hero />
        <TrustStrip />
        <QuerySection />
        <PastImportsSection />
        <AboutAndCTA />
        <QuoteFrom />
      </main>
    </div>
  );
}
