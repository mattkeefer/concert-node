import * as dao from "./dao.js";

export default function VenueRoutes(app) {
  const createVenue = async (req, res) => {
    const venue = await dao.createVenue(req.body);
    res.json(venue);
  }

  const deleteVenue = async (req, res) => {
    const {id} = req.params;
    const status = await dao.deleteVenueById(id);
    res.json(status);
  }

  const deleteVenueByTmId = async (req, res) => {
    const {tmid} = req.params;
    const status = await dao.deleteVenueByTmId(tmid);
    res.json(status);
  }

  const findAllVenues = async (req, res) => {
    const venues = await dao.findAllVenues();
    res.json(venues);
  }

  const findVenueByTmId = async (req, res) => {
    const {tmid} = req.params;
    const venue = await dao.findVenueByTmId(tmid);
    res.json(venue);
  }

  const updateVenue = async (req, res) => {
    const {id} = req.params;
    const status = await dao.updateVenueById(id, req.body);
    const updatedVenue = await dao.findVenueById(id);
    res.json(updatedVenue);
  }

  const updateVenueByTmId = async (req, res) => {
    const {tmid} = req.params;
    const status = await dao.updateVenueByTmId(tmid, req.body);
    const updatedVenue = await dao.findVenueByTmId(tmid);
    res.json(updatedVenue);
  }

  app.get('/api/venues', findAllVenues);
  app.post('/api/venues', createVenue);
  app.get('/api/venues/:tmid', findVenueByTmId);
  app.put('/api/venues/:tmid', updateVenueByTmId);
  app.delete('/api/venues/:tmid', deleteVenueByTmId);
}