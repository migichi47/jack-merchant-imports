
import { useAdminContext } from "../context/AdminContext";
import VehicleCard from "../components/VehicleCard";
import Breadcrumbs from "../components/BreadCrumbs";

const Vehicles = () => {
  const { vehicles } = useAdminContext();

  return (
    <div className="space-y-5">
      <Breadcrumbs
        items={[
          {
            label: "All vehicles",
          },
        ]}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {vehicles?.map((vehicle) => (
          <VehicleCard key={vehicle?._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
