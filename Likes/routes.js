import * as dao from "./dao.js";

export default function LikeRoutes(app) {
  const addUserConcertInterested = async (req, res) => {
    const concert = req.body;
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const storedConcert = await dao.userSavesConcert(currentUser._id, concert,
        false);
    res.json(storedConcert);
  }

  const addUserConcertAttending = async (req, res) => {
    const concert = req.body;
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const storedConcert = await dao.userSavesConcert(currentUser._id, concert,
        true);
    res.json(storedConcert);
  }

  const removeUserConcertInterested = async (req, res) => {
    const {id} = req.params;
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    await dao.userUnsavesConcert(currentUser._id, id, false);
    res.sendStatus(200);
  }

  const removeUserConcertAttending = async (req, res) => {
    const {id} = req.params;
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    await dao.userUnsavesConcert(currentUser._id, id, true);
    res.sendStatus(200);
  }

  const getAllInterestedConcerts = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const interestedConcerts = dao.findAllInterestedConcerts(currentUser._id);
    res.json(interestedConcerts);
  }

  const getAllAttendingConcerts = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const attendingConcerts = dao.findAllAttendingConcerts(currentUser._id);
    res.json(attendingConcerts);
  }

  app.post('/api/likes/interested', addUserConcertInterested);
  app.post('/api/likes/attending', addUserConcertAttending);
  app.delete('/api/likes/interested/:id', removeUserConcertInterested);
  app.delete('/api/likes/attending/:id', removeUserConcertAttending);
  app.get('/api/likes/interested', getAllInterestedConcerts);
  app.get('/api/likes/attending', getAllAttendingConcerts);
}