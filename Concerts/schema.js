import mongoose from "mongoose";

const ConcertSchema = new mongoose.Schema(
    {
      title: {type: String, required: true}, // Concert name or title
      artist: {type: String, required: true}, // Artist or band name
      venue: {
        name: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String},
        country: {type: String, required: true},
        address: {type: String},
        latitude: {type: Number},
        longitude: {type: Number},
      },
      date: {type: Date, required: true}, // Concert date and time
      ticketInfo: {
        url: {type: String}, // Link to ticket purchasing
        priceRange: {
          min: {type: Number},
          max: {type: Number},
          currency: {type: String},
        },
      },
      setlist: [{type: String}], // List of songs performed (for past concerts)
      source: {
        type: String,
        enum: ['Ticketmaster', 'Setlist.fm'],
        required: true,
      }, // API source
      tags: [{type: String}], // User-defined tags for sharing/discovery
      createdAt: {type: Date, default: Date.now}, // Timestamp for creation
    },
);

export default mongoose.model('Concert', ConcertSchema);