import ExplorePopularCars from "../components/LandingPage/ExplorePopularCars";
import Hero from "../components/LandingPage/Hero";
import WhyChooseUs from "../components/LandingPage/WhyChooseUs";

const LandingPage = () => {
  return (
    <div className="space-y-20 mt-20">
      <Hero />
      <ExplorePopularCars />
      <WhyChooseUs />
    </div>
  );
};

export default LandingPage;
