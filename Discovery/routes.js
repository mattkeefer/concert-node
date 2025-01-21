import "dotenv/config";
import axios from "axios";

export default function DiscoveryRoutes(app) {
  const API_KEY = process.env.DISCOVERY_API_KEY;
  const EVENTS_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

  const getEvents = async (req, res) => {
    const params = {
      classificationName: 'music',
      apikey: API_KEY,
      ...req.query
    };
    try {
      const events = await axios.get(
          `${EVENTS_URL}`, {params});
      res.json(events.data);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({error: 'Failed to fetch data from Discovery API'});
    }
  }

  app.get('/discovery/events', getEvents);
}