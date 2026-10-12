import { getSignedVehicleImage } from "./carImages.js";


export async function addImagesToVehicles(vehicles) {
  const vehiclesWithImages = await Promise.all(
    vehicles.map(async (vehicle) => {
      try {
        const imageUrl = await getSignedVehicleImage({
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
        });

        return {
          ...vehicle,
          imageUrl,
        };
      } catch (error) {
        console.error(
          `Image lookup failed for ${vehicle.make} ${vehicle.model}:`,
          error.response?.data || error.message
        );

        return {
          ...vehicle,
          imageUrl: null,
        };
      }
    })
  );

  return vehiclesWithImages;
}
