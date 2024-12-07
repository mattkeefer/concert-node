import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
    {
      name: String,
      type: String,
      id: String,
      url: String,
      locale: String,
      images: [{
        url: String,
        ratio: String, // 16_9, 3_2, 4_3
        width: Number,
        height: Number,
        fallback: Boolean,
      }],
      postalCode: String,
      timezone: String,
      city: {
        name: String,
      },
      state: {
        name: String,
        stateCode: String,
      },
      country: {
        name: String,
        countryCode: String,
      },
      address: {
        line1: String,
        line2: String,
        line3: String,
      },
      location: {
        latitude: Number,
        longitude: Number,
      },
    },
    {collection: "venues"}
);

export default venueSchema;