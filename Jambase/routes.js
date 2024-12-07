import "dotenv/config"
import axios from "axios";

export default function JambaseRoutes(app) {
  const API_KEY = process.env.JAMBASE_API_KEY;
  const EVENTS_API = "https://www.jambase.com/jb-api/v1/events";

  const getConcerts = async (req, res) => {
    const geoStateIso = "US-MA";
    const today = new Date().toLocaleDateString('en-CA');
    try {
      const events = await axios.get(
          `${EVENTS_API}?geoStateIso=${geoStateIso}&eventDateFrom=${today}&apikey=${API_KEY}`);
      res.send(events.data);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  }

  const getConcert = async (req, res) => {
    const {source, eventId} = req.params;
    const params = {
      apikey: API_KEY,
    }
    try {
      const event = await axios.get(`${EVENTS_API}/id/${source}:${eventId}`, {
        params: params
      });
      res.json(event.data);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  }

  app.get('/api/events/jambase', getConcerts);
  app.get('/api/events/:source/:eventId', getConcert);
}