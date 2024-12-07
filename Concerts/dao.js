import Concert from './schema.js';

const concertDao = {
  // Create a new concert
  createConcert: async (concertData) => {
    const concert = new Concert(concertData);
    return await concert.save();
  },

  // Find a concert by its ID
  findConcertById: async (id) => {
    return Concert.findById(id);
  },

  // Update a concert by its ID
  updateConcert: async (id, updatedData) => {
    return Concert.findByIdAndUpdate(id, updatedData, {new: true});
  },

  // Delete a concert by its ID
  deleteConcert: async (id) => {
    return Concert.findByIdAndDelete(id);
  },

  // Find concerts based on a search query
  findConcertsByQuery: async (query) => {
    const {artist, venue, city, startDate, endDate} = query;

    // Build dynamic query
    const searchCriteria = {};
    if (artist) {
      searchCriteria.artist = {$regex: artist, $options: 'i'};
    }
    if (venue) {
      searchCriteria.venue = {$regex: venue, $options: 'i'};
    }
    if (city) {
      searchCriteria.city = {$regex: city, $options: 'i'};
    }
    if (startDate || endDate) {
      searchCriteria.date = {};
      if (startDate) {
        searchCriteria.date.$gte = new Date(startDate);
      }
      if (endDate) {
        searchCriteria.date.$lte = new Date(endDate);
      }
    }

    return Concert.find(searchCriteria);
  },
}

export default concertDao;
