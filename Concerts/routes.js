import * as dao from "./dao.js";

export default function ConcertRoutes(app) {
  const createConcert = async (req, res) => {
    const concert = await dao.createConcert(req.body);
    res.json(concert);
  }

  const deleteConcert = async (req, res) => {
    const {source, id} = req.params;
    const status = await dao.deleteConcertByIdentifier(source + ":" + id);
    res.json(status);
  }

  const findAllConcerts = async (req, res) => {
    const concerts = await dao.findAllConcerts();
    res.json(concerts);
  }

  const findConcertByIdentifier = async (req, res) => {
    const {source, id} = req.params;
    const concert = await dao.findConcertByIdentifier(source + ":" + id);
    res.json(concert);
  }

  const findConcertsByIds = async (req, res) => {
    const cids = req.body;
    const concerts = await Promise.all(
        cids.map(cid => dao.findConcertById(cid)));
    res.json(concerts);
  }

  const updateConcert = async (req, res) => {
    const {concertId} = req.params;
    const status = await dao.updateConcertById(concertId, req.body);
    const updatedConcert = await dao.findConcertById(concertId);
    res.json(updatedConcert);
  }

  const searchConcert = async (req, res) => {
    const
  }

  app.get('/api/concerts', findAllConcerts);
  app.post('/api/concerts', createConcert);
  app.post('/api/concerts/ids', findConcertsByIds);
  app.get('/api/concerts/:source/:id', findConcertByIdentifier);
  app.put('/api/concerts/:concertId', updateConcert);
  app.delete('/api/concerts/:source/:id', deleteConcert);
}