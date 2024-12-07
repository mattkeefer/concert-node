import mongoose from "mongoose";

const concertSchema = new mongoose.Schema(
    {
      id: String,
      name: String,
      description: String,
      // additionalInfo: String,
      type: String,
      // distance: Number,
      // units: String,
      // location: {
      //   latitude: Number,
      //   longitude: Number,
      // },
      locale: String,
      url: String,
      images: [{
        url: String,
        ratio: String, // 16_9, 3_2, 4_3
        width: Number,
        height: Number,
        fallback: Boolean,
      }],
      dates: {
        start: {
          localDate: String,
          localTime: String,
          dateTime: String,
          dateTBD: Boolean,
          dateTBA: Boolean,
          timeTBA: Boolean,
          noSpecificTime: Boolean,
        },
        end: {
          localDate: String,
          localTime: String,
          dateTime: String,
          approximate: Boolean,
          noSpecificTime: Boolean,
        },
        // access: {
        //   startDateTime: String,
        //   startApproximate: Boolean,
        //   endDateTime: String,
        //   endApproximate: Boolean,
        // },
        timezone: String,
        // status: {
        //   code: String, // onsale, offsale, canceled, postponed, rescheduled
        // },
        spanMultipleDays: Boolean,
      },
      // sales: {
      //   public: {
      //     startDateTime: String,
      //     endDateTime: String,
      //     startTBD: Boolean,
      //   },
      //   presales: [{
      //     name: String,
      //     description: String,
      //     url: String,
      //     startDateTime: String,
      //     endDateTime: String,
      //   }],
      // },
      // info: String,
      // pleaseNote: String,
      priceRanges: [{
        type: String, // standard
        currency: String,
        min: Number,
        max: Number,
      }],
      // accessibility: {
      //   info: String,
      // },
      classifications: [{
        primary: Boolean,
        segment: {
          id: String,
          name: String,
        },
        genre: {
          id: String,
          name: String,
        },
        subGenre: {
          id: String,
          name: String,
        },
      }],
      interestedUsers: [{
        ref: "Users",
        type: mongoose.Schema.Types.ObjectId,
      }],
      attendingUsers: [{
        ref: "Users",
        type: mongoose.Schema.Types.ObjectId,
      }],
    },
    {collection: "concerts"}
);

export default concertSchema;