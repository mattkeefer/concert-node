import mongoose from "mongoose";

const ConcertSchema = new mongoose.Schema(
    {
      title: {type: String, required: true}, // Concert name or title
      artists: [{
        name: {type: String, required: true},
        image: String,
      }], // Artists or bands performing
      venue: {
        name: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String},
        country: {type: String, required: true},
        address: {type: String},
      },
      image: String,
      startDate: {type: Date, required: true}, // Concert start date and time
      endDate: {type: Date}, // Concert end date and time
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