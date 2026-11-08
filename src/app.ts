import express from "express";
import cors from "cors";
import "dotenv/config";
import UserRoutes from "./Users/routes.js";
import ConcertRoutes from "./Concerts/routes.js";
import DiscoveryRoutes from "./Discovery/routes.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());
UserRoutes(app);
ConcertRoutes(app);
DiscoveryRoutes(app);
// SetlistRoutes(app);

export default app;
