import Concert from './schema.js';
import userDao from "../Users/dao.js";

const concertDao = {
  // Create a new concert
  createConcert: async (concertData) => {
    delete concertData._id;
    const concert = new Concert(concertData);
    return await concert.save();
  },

  // Find a concert by its ID
  findConcertById: async (id) => {
    return Concert.findById(id).populate('attendingUsers').exec();
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
    const {
      userId,
      keyword,
      artist,
      venue,
      city,
      startDate,
      endDate,
      sort,
      following,
      saved
    } = query;

    // Build dynamic query
    const searchCriteria = {};
    const concertQuery = [];

    if (keyword) {
      searchCriteria.title = {$regex: keyword, $options: 'i'};
    }
    if (artist) {
      searchCriteria['artists.name'] = {$regex: artist, $options: 'i'};
    }
    if (venue) {
      searchCriteria['venue.name'] = {$regex: venue, $options: 'i'};
    }
    if (city) {
      searchCriteria['venue.city'] = {$regex: city, $options: 'i'};
    }
    // Find concerts starting after "start date"
    if (startDate) {
      searchCriteria.startDate = {$gte: new Date(startDate)};
    }
    // Find concerts starting before "end date"
    if (endDate) {
      searchCriteria.startDate = {$lte: new Date(endDate)};
    }

    concertQuery.push(searchCriteria);

    // Handle user-based filtering
    if (userId && (following === 'true' || saved === 'true')) {
      const user = await userDao.findUserFollowingById(userId);
      if (!user) throw new Error('User not found');
      if (following === 'true') {
        if (!user.following) return [];
        concertQuery.push({attendingUsers: {$in: user.following}});
      }
      if (saved === 'true') {
        concertQuery.push({attendingUsers: userId});
      }
    }

    return sort === false ?
        Concert.find({$and: concertQuery}) :
        Concert.find({$and: concertQuery}).sort({startDate: 1});
  },
}

export default concertDao;
