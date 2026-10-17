import { LoaderCircle } from "lucide-react";

const Spinner = ({ size = 20, className = "" }) => {
  return <LoaderCircle size={size} className={`animate-spin ${className}`} />;
};

export default Spinner;
