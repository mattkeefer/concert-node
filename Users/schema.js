import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
      firstName: {type: String, required: true}, // User's first name
      lastName: {type: String, required: true}, // User's last name
      username: {type: String, required: true, unique: true}, // Unique username
      email: {type: String, required: true, unique: true}, // Unique email
      password: {type: String, required: true}, // Hashed password
      profilePicture: {type: String}, // URL to profile picture
      bio: {type: String}, // Optional user bio
      savedConcerts: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Concert'} // Array of concert IDs
      ],
      following: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'} // Array of user IDs
      ],
      followers: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'} // Array of user IDs
      ],
      createdAt: {type: Date, default: Date.now}, // Timestamp for account creation
    }
);

export default mongoose.model('User', UserSchema)