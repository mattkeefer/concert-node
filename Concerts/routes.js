import concertDao from "./dao.js";

export default function ConcertRoutes(app) {

  // Create a new concert
  const createConcert = async (req, res) => {
    try {
      const concert = await concertDao.createConcert(req.body);
      res.status(201).json(concert);
    } catch (err) {
      res.status(400).json({error: err.message});
    }
  };

  // Get a concert by ID
  const getConcertById = async (req, res) => {
    try {
      const concert = await concertDao.findConcertById(req.params.id);
      if (!concert) {
        return res.status(404).json({error: 'Concert not found'});
      }
      res.json(concert);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  };

  // Update a concert
  const updateConcert = async (req, res) => {
    try {
      const updatedConcert = await concertDao.updateConcert(req.params.id,
          req.body);
      if (!updatedConcert) {
        return res.status(404).json(
            {error: 'Concert not found'});
      }
      res.json(updatedConcert);
    } catch (err) {
      res.status(400).json({error: err.message});
    }
  };

  // Delete a concert
  const deleteConcert = async (req, res) => {
    try {
      const deletedConcert = await concertDao.deleteConcert(req.params.id);
      if (!deletedConcert) {
        return res.status(404).json(
            {error: 'Concert not found'});
      }
      res.status(204).send(); // No content
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  };

  // Search for concerts
  const searchConcerts = async (req, res) => {
    try {
      const concerts = await concertDao.findConcertsByQuery(req.query);
      res.json(concerts);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  };

  app.post('/concerts', createConcert);
  app.get('/concerts/:id', getConcertById);
  app.put('/concerts/:id', updateConcert);
  app.delete('/concerts/:id', deleteConcert);
  app.get('/concerts', searchConcerts); // Search concerts using query parameters
}