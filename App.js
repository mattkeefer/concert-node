import express from "express";
import cors from "cors"
import session from "express-session"
import mongoose from "mongoose";
import "dotenv/config";
import UserRoutes from "./Users/routes.js";
import ConcertRoutes from "./Concerts/routes.js";
import LikeRoutes from "./Likes/routes.js";
import SocialRoutes from "./Social/routes.js";
import VenueRoutes from "./Venues/routes.js";
import DiscoveryRoutes from "./Discovery/routes.js";
import SetlistRoutes from "./Setlist/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
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
VenueRoutes(app);
LikeRoutes(app);
SocialRoutes(app);
DiscoveryRoutes(app);
SetlistRoutes(app);
app.listen(process.env.PORT || 4000);

