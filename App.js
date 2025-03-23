import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import "dotenv/config";
import UserRoutes from "./Users/routes.js";
import ConcertRoutes from "./Concerts/routes.js";
import DiscoveryRoutes from "./Discovery/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
    })
);
app.use(express.json());
UserRoutes(app);
ConcertRoutes(app);
DiscoveryRoutes(app);
// SetlistRoutes(app);
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

