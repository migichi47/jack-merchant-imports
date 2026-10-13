import ExplorePopularCars from "../components/LandingPage/ExplorePopularCars";
import Hero from "../components/LandingPage/Hero";
import WhyChooseUs from "../components/LandingPage/WhyChooseUs";
import QuerySection from "../components/QuerySection";

const LandingPage = () => {
  return (
    <div className="space-y-20 mt-20">
      <Hero />
      <QuerySection />
      <ExplorePopularCars />
      <WhyChooseUs />
    </div>
  );
};

export default LandingPage;
