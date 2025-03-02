import bcrypt from 'bcrypt';
import User from './schema.js';
import Concert from '../Concerts/schema.js';

const userDao = {
  /**
   * Create a new user.
   * @param {Object} userData - User details (name, username, email, password, etc.)
   * @returns {Promise<Object>} - The created user
   */
  createUser: async (userData) => {
    try {
      delete userData._id;
      const newUser = new User(userData);
      return await newUser.save();
    } catch (err) {
      throw new Error(`Error creating user: ${err.message}`);
    }
  },

  /**
   * Find a user by ID.
   * @param {String} userId - The user's ID
   * @returns {Promise<Object|null>} - The user or null if not found
   */
  findUserById: async (userId) => {
    return await User.findById(userId)
    .populate('followers', '_id, firstName lastName username profilePicture')
    .populate('following', '_id, firstName lastName username profilePicture')
    .exec();
  },

  findUserByIdAndPopulateSavedConcerts: async (userId) => {
    return await User.findById(userId).populate('savedConcerts').exec();
  },

  findUserFollowingById: async (userId) => {
    return await User.findById(userId).select('following').lean().exec();
  },

  /**
   * Find a user by username.
   * @param {String} username - The username
   * @returns {Promise<Object|null>} - The user or null if not found
   */
  findUserByUsername: async (username) => {
    try {
      return await User.findOne({username}).exec();
    } catch (err) {
      throw new Error(`Error finding user by username: ${err.message}`);
    }
  },

  findUsersByQuery: async (query) => {
    const {username} = query;
    const searchCriteria = {};

    if (username) {
      searchCriteria.username = {$regex: username, $options: 'i'};
    }

    return User.find(searchCriteria);
  },

  /**
   * Update a user's details.
   * @param {String} userId - The user's ID
   * @param {Object} updateData - Fields to update
   * @returns {Promise<Object|null>} - The updated user or null if not found
   */
  updateUser: async (userId, updateData) => {
    try {
      return await User.findByIdAndUpdate(userId, updateData,
          {new: true}).exec();
    } catch (err) {
      throw new Error(`Error updating user: ${err.message}`);
    }
  },

  /**
   * Save a concert to a user's saved list.
   * @param {String} userId - The user's ID
   * @param {String} concertId - The concert's ID
   * @returns {Promise<Object|null>} - The updated user or null if not found
   */
  saveConcert: async (userId, concertId) => {
    try {
      await Concert.findByIdAndUpdate(
          concertId,
          {$addToSet: {attendingUsers: userId}},
          {new: true}
      ).exec();
      return await User.findByIdAndUpdate(
          userId,
          {$addToSet: {savedConcerts: concertId}}, // Avoid duplicate entries
          {new: true}
      ).exec();
    } catch (err) {
      throw new Error(`Error saving concert: ${err.message}`);
    }
  },

  /**
   * Unsave a concert from a user's saved list.
   * @param {String} userId - The user's ID
   * @param {String} concertId - The concert's ID
   * @returns {Promise<Object|null>} - The updated user or null if not found
   */
  unsaveConcert: async (userId, concertId) => {
    try {
      await Concert.findByIdAndUpdate(
          concertId,
          {$pull: {attendingUsers: userId}},
          {new: true}
      ).exec();
      return await User.findByIdAndUpdate(
          userId,
          {$pull: {savedConcerts: concertId}},
          {new: true}
      ).exec();
    } catch (err) {
      throw new Error(`Error unsaving concert: ${err.message}`);
    }
  },

  /**
   * Follow another user.
   * @param {String} userId - The user's ID
   * @param {String} targetUserId - The ID of the user to follow
   * @returns {Promise<void>}
   */
  followUser: async (userId, targetUserId) => {
    try {
      await User.findByIdAndUpdate(userId,
          {$addToSet: {following: targetUserId}}).exec();
      await User.findByIdAndUpdate(targetUserId,
          {$addToSet: {followers: userId}}).exec();
    } catch (err) {
      throw new Error(`Error following user: ${err.message}`);
    }
  },

  /**
   * Unfollow another user.
   * @param {String} userId - The user's ID
   * @param {String} targetUserId - The ID of the user to unfollow
   * @returns {Promise<void>}
   */
  unfollowUser: async (userId, targetUserId) => {
    try {
      await User.findByIdAndUpdate(userId,
          {$pull: {following: targetUserId}}).exec();
      await User.findByIdAndUpdate(targetUserId,
          {$pull: {followers: userId}}).exec();
    } catch (err) {
      throw new Error(`Error unfollowing user: ${err.message}`);
    }
  },

  // Register a new user
  registerUser: async (userData) => {
    const {firstName, lastName, username, email, password} = userData;

    // Check if email or username already exists
    const existingUser = await User.findOne({$or: [{email}, {username}]});
    if (existingUser) {
      throw new Error('Email or username already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    return await newUser.save();
  },

  // Login an existing user
  loginUser: async ({email, password}) => {
    // Find user by email
    const user = await User.findOne({email});
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    return user;
  },
};

export default userDao;
