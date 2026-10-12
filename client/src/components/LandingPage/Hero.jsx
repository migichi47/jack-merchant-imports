import Button from "../Button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-7 max-w-200 mx-auto">
      <h1 className="flex flex-col space-y-2">
        <span className="text-xl">YOUR NEXT CAR STARTS HERE</span>
        <span className="text-5xl font-bold">
          Vehicle Importation from Japan
        </span>
      </h1>
      <p className="text-gray-500">
        Find your ideal vehicle from the global market. We help you navigate the
        car importation process with clear guidance, transparent pricing, and
        support from selection to delivery.
      </p>
      <Button variant="secondary">Start your Journey</Button>
      <img
        src="https://framerusercontent.com/images/nCykaw7ADDDCvvzz4EcLErY17c.png?scale-down-to=1024&width=1680&height=397"
        alt=""
      />
    </div>
  );
};

export default Hero;
