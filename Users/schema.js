import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
      username: {type: String, required: true, unique: true},
      password: {type: String, required: true},
      firstName: String,
      lastName: String,
      email: String,
      role: {
        type: String,
        enum: ["USER", "ADMIN", "ARTIST", "ORGANIZER"],
        default: "USER"
      },
      following: [{
        ref: "Users",
        type: mongoose.Schema.Types.ObjectId,
      }],
      followers: [{
        ref: "Users",
        type: mongoose.Schema.Types.ObjectId,
      }],
      interested: [{
        ref: "Concerts",
        type: mongoose.Schema.Types.ObjectId,
      }],
      attending: [{
        ref: "Concerts",
        type: mongoose.Schema.Types.ObjectId,
      }],
    },
    {collection: "users"}
);

export default userSchema;