import mongoose from "mongoose";
// Define the schema
const earthquakeSchema = new mongoose.Schema({
  time: { type: Date },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  depth: { type: Number, required: true },
  mag: { type: Number, required: true },
  magType: { type: String, required: true },
  nst: { type: Number, required: true },
  gap: { type: Number, required: true },
  dmin: { type: Number, required: true },
  rms: { type: Number, required: true },
  net: { type: String, required: true },
  id: { type: String, required: true },
  updated: { type: Date, required: true },
  place: { type: String, required: true },
  type: { type: String, required: true },
  horizontalError: { type: Number, required: true },
  depthError: { type: Number, required: true },
  magError: { type: Number, required: true },
  magNst: { type: Number, required: true },
  status: { type: String, required: true },
  locationSource: { type: String, required: true },
  magSource: { type: String, required: true }
});

// Create the model
export const EarthquakeModel = mongoose.model("yer", earthquakeSchema)
export const getEarthquake = async () => EarthquakeModel.find({})