import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("VenueModel", schema);
export default model;