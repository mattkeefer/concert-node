import "dotenv/config"
import axios from "axios";
import exampleEvents from "./events.js"

export default function ConcertRoutes(app) {
  const API_KEY = process.env.JAMBASE_API_KEY;

  const getExampleConcerts = async (req, res) => {
    const params = {
      apikey: API_KEY,
      geoStateIso: "US-MA",
    }
    res.send(exampleEvents);
    // const events = await axios.get("https://www.jambase.com/jb-api/v1/events", {
    //   params: params,
    // });
    // res.send(events.data);
  }

  app.get('/api/concerts', getExampleConcerts);
}