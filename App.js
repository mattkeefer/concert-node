import express from "express";
import cors from "cors"
import session from "express-session"
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "dotenv/config";
import UserRoutes from "./Users/routes.js";
import ConcertRoutes from "./Concerts/routes.js";
import DiscoveryRoutes from "./Discovery/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: CONNECTION_STRING,
    collectionName: 'sessions',
    ttl: 60 * 60 * 24, // 1 day
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    sameSite: 'strict',
  },
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    secure: true,
  };
}

const app = express();
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
    })
);
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
ConcertRoutes(app);
DiscoveryRoutes(app);
// SetlistRoutes(app);
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

