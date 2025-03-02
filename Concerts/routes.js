import concertDao from "./dao.js";

export default function ConcertRoutes(app) {

  // Create a new concert
  const createConcert = async (req, res) => {
    try {
      const concert = await concertDao.createConcert(req.body);
      res.json(concert);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  // Get a concert by ID
  const getConcertById = async (req, res) => {
    try {
      const concert = await concertDao.findConcertById(req.params.id);
      if (!concert) {
        res.sendStatus(404);
        return;
      }
      res.json(concert);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  // Find a concert or create it if not exists
  const findOrCreateConcert = async (req, res) => {
    try {
      let concert = await concertDao.findOneConcertByDiscoveryId(
          req.body.discoveryId);
      if (!concert) {
        concert = await concertDao.createConcert(req.body);
      }
      res.json(concert);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // Update a concert
  const updateConcert = async (req, res) => {
    try {
      const updatedConcert = await concertDao.updateConcert(req.params.id,
          req.body);
      if (!updatedConcert) {
        res.sendStatus(404);
        return;
      }
      res.json(updatedConcert);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  // Delete a concert
  const deleteConcert = async (req, res) => {
    try {
      const deletedConcert = await concertDao.deleteConcert(req.params.id);
      if (!deletedConcert) {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  // Search for concerts
  const searchConcerts = async (req, res) => {
    try {
      const currentUser = req.session.currentUser;
      if (!currentUser && (req.query.saved
          || req.query.following)) {
        res.sendStatus(401);
        return;
      }
      const concerts = await concertDao.findConcertsByQuery(req.query);
      res.json(concerts);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  app.post('/concerts', createConcert);
  app.get('/concerts/:id', getConcertById);
  app.post('/concerts/find', findOrCreateConcert);
  app.put('/concerts/:id', updateConcert);
  app.delete('/concerts/:id', deleteConcert);
  app.get('/concerts', searchConcerts); // Search concerts using query parameters
}