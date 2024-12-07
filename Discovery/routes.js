import "dotenv/config";
import axios from "axios";

export default function DiscoveryRoutes(app) {
  const API_KEY = process.env.DISCOVERY_API_KEY;
  const EVENTS_URL = "https://app.ticketmaster.com/discovery/v2/events.json";
  const EVENT_URL = "https://app.ticketmaster.com/discovery/v2/events";
  const ATTRACTIONS_URL = "https://app.ticketmaster.com/discovery/v2/attractions.json";
  const ATTRACTION_URL = "https://app.ticketmaster.com/discovery/v2/attractions";

  const getEvents = async (req, res) => {
    const params = req.body;
    const classificationName = "music";
    try {
      const events = await axios.get(
          `${EVENTS_URL}?classificationName=${classificationName}&apikey=${API_KEY}`,
          {params: params});
      res.send(events.data);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  const getAttractions = async (req, res) => {
    const params = req.body;
    try {
      const events = await axios.get(`${ATTRACTIONS_URL}?apikey=${API_KEY}`,
          {params: params});
      res.send(events.data);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  app.get('/api/discovery/events', getEvents);
  app.get('/api/discovery/attractions', getAttractions);
}