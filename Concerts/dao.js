import Concert from './schema.js';

const concertDao = {
  // Create a new concert
  createConcert: async (concertData) => {
    delete concertData._id;
    const concert = new Concert(concertData);
    return await concert.save();
  },

  // Find a concert by its ID
  findConcertById: async (id) => {
    return Concert.findById(id);
  },

  // Find a concert corresponding to the discovery concert id
  findOneConcertByDiscoveryId: async (discoveryId) => {
    return Concert.findOne({discoveryId: discoveryId});
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
    const {artist, venue, city, startDate, endDate, sort} = query;

    // Build dynamic query
    const searchCriteria = {};
    // if (artist) {
    //   searchCriteria.artists = {$regex: artist, $options: 'i'};
    // }
    if (venue || city) {
      searchCriteria.venue = {};
      if (venue) {
        searchCriteria.venue.name = {$regex: venue, $options: 'i'};
      }
      if (city) {
        searchCriteria.venue.city = {$regex: city, $options: 'i'};
      }
    }
    // Find concerts starting after "start date"
    if (startDate) {
      searchCriteria.startDate = {$gte: new Date(startDate)};
    }
    // Find concerts starting before "end date"
    if (endDate) {
      searchCriteria.startDate = {$lte: new Date(endDate)};
    }

    return sort === false ?
        Concert.find(searchCriteria) :
        Concert.find(searchCriteria).sort({startDate: 1});
  },
}

export default concertDao;
