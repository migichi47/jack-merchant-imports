import { useMemo, useState } from "react";
import { demoVehicles } from "../services/UtilityFunctions";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import QuerySection from "../components/QuerySection";
import HowItWorks from "../components/HowItWorks";
import AboutAndCTA from "../components/AboutAndCTA";
import QuoteFrom from "../components/QuoteFrom";
import Footer from "../components/Footer";

export default function LandingPage({ vehicles: suppliedVehicles }) {
  // Passing `vehicles` from a parent overrides the demo data.
  const vehicles = suppliedVehicles ?? demoVehicles;

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

  const makes = useMemo(
    () => [
      "All makes",
      ...new Set(vehicles.map((vehicle) => vehicle.brand_name).filter(Boolean)),
    ],
    [vehicles],
  );

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const name = `${vehicle.brand_name} ${vehicle.model_name} ${
        vehicle.trim || ""
      }`.toLowerCase();

      const matchesSearch = !query || name.includes(query);
      const matchesMake = make === "All makes" || vehicle.brand_name === make;

      const budgetLimits = {
        "Under $3,000": 3000,
        "Under $5,000": 5000,
        "Under $10,000": 10000,
        "Under $15,000": 15000,
      };

      const matchesPrice =
        maxPrice === "Any budget" ||
        (vehicle.price_usd ?? Infinity) <= budgetLimits[maxPrice];

      return (
        vehicle.is_available !== false &&
        matchesSearch &&
        matchesMake &&
        matchesPrice
      );
    });
  }, [vehicles, search, make, maxPrice]);

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
          makes={makes}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          filteredVehicles={filteredVehicles}
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
