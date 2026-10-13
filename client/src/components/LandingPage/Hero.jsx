import { MoveDown, MoveRight, MoveUpRight } from "lucide-react";
import Button from "../Button";

const Hero = () => {
  const handleClick = () => {
    document.getElementById("query")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div className="flex flex-col items-center px-4 justify-center text-center space-y-12 max-w-200 mx-auto h-[60vh]">
      <h1 className="flex flex-col space-y-2">
        <span className="text-lg">YOUR NEXT CAR STARTS HERE</span>
        <span className="text-5xl font-bold">
          Your Dream Car Imported with Confidence
        </span>
      </h1>
      <p className="text-gray-500">
        Find your ideal vehicle from the global market. We help you navigate the
        car importation process with clear guidance, transparent pricing, and
        support from selection to delivery.
      </p>
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={handleClick}>
          <span>Request an Import Quote</span>
          <MoveUpRight className="w-4" />
        </Button>
        <Button variant="secondary" onClick={handleClick}>
          <span>How it Works</span>
          <MoveDown className="w-4" />
        </Button>
      </div>
      <img
        src="https://framerusercontent.com/images/nCykaw7ADDDCvvzz4EcLErY17c.png?scale-down-to=1024&width=1680&height=397"
        alt=""
        id="query"
      />
    </div>
  );
};

export default Hero;
