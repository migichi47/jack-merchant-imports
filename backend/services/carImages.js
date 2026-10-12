import axios from "axios";

const carImagesApi = axios.create({
  baseURL: "https://carimagesapi.com",
  timeout: 15000,
});

export async function getSignedVehicleImage({ make, model, year }) {
  const response = await carImagesApi.get("/api/v1/signed-url", {
    params: {
      api_key: process.env.CAR_IMAGES_API_KEY,
      make,
      model,
      year,
      width: 800,
      format: "webp",
    },
    headers: {
      "X-Api-Secret": process.env.CAR_IMAGES_API_SECRET,
    },
  });

  return response.data.url;
}

export default carImagesApi;
