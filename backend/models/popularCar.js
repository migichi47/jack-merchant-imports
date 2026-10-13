
import mongoose, { Schema } from "mongoose";

const popularCarSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  make: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  transmission: {
    type: String,
    default: "",
  },
  drive_type: {
    type: String,
    default: "",
  },
  fuel_type: {
    type: String,
    default: "",
  },
  body_class: {
    type: String,
    default: "",
  },
  doors: {
    type: Number,
    default: null,
  },
  imageUrl: {
    type: String,
    default: "",
  },
});

const PopularCar = mongoose.model(
  "PopularCar",
  popularCarSchema
);

export default PopularCar;