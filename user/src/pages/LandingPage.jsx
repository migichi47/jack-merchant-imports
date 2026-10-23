import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import QuerySection from "../components/QuerySection";
import HowItWorks from "../components/HowItWorks";
import AboutAndCTA from "../components/AboutAndCTA";
import QuoteFrom from "../components/QuoteFrom";
import Footer from "../components/Footer";

export default function LandingPage() {
  const [maxPrice, setMaxPrice] = useState("Any budget");

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      {/* Navigation */}

      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <QuerySection maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
        <HowItWorks />
        <AboutAndCTA />

        {/* Quote form */}
        <QuoteFrom />
      </main>
      <Footer />
    </div>
  );
}
