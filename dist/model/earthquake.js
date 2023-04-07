"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEarthquake = exports.EarthquakeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema
const earthquakeSchema = new mongoose_1.default.Schema({
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
exports.EarthquakeModel = mongoose_1.default.model("yer", earthquakeSchema);
const getEarthquake = async () => exports.EarthquakeModel.find({});
exports.getEarthquake = getEarthquake;
//# sourceMappingURL=earthquake.js.map