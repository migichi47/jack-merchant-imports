import {useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import QuerySection from "../components/QuerySection";
import HowItWorks from "../components/HowItWorks";
import AboutAndCTA from "../components/AboutAndCTA";
import QuoteFrom from "../components/QuoteFrom";
import Footer from "../components/Footer";

export default function LandingPage() {
  const [search, setSearch] = useState("");
  const [make, setMake] = useState("All makes");
  const [maxPrice, setMaxPrice] = useState("Any budget");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    contact: "",
    email: "",
    budget: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  function openQuote(vehicle = null) {
    setSelectedVehicle(vehicle);
    setSubmitMessage("");
    setForm((previous) => ({
      ...previous,
      message: vehicle
        ? `I'm interested in the ${vehicle.year} ${vehicle.brand_name} ${vehicle.model_name}.`
        : previous.message,
    }));

    document.getElementById("request-quote")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitMessage("");

    try {
      // TODO: Replace this with your real backend endpoint.
      // Example:
      // await api.post("/queries", {
      //   ...form,
      //   car: selectedVehicle
      //     ? {
      //         make: selectedVehicle.brand_name,
      //         model: selectedVehicle.model_name,
      //         year: selectedVehicle.year,
      //       }
      //     : undefined,
      // });

      await new Promise((resolve) => setTimeout(resolve, 400));

      setSubmitMessage(
        "Demo only: the form is working, but no enquiry has been sent. Connect your backend to receive real requests.",
      );
    } catch {
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      {/* Navigation */}

      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <QuerySection
          openQuote={openQuote}
          search={search}
          setSearch={setSearch}
          make={make}
          setMake={setMake}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        <HowItWorks />
        <AboutAndCTA />

        {/* Quote form */}
        <QuoteFrom
          handleSubmit={handleSubmit}
          selectedVehicle={selectedVehicle}
          form={form}
          setForm={setForm}
          submitting={submitting}
          submitMessage={submitMessage}
        />
      </main>
      <Footer />
    </div>
  );
}
