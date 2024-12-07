import model from "./model.js";

export const createConcert = (concert) => {
  delete concert._id;
  return model.create(concert);
}
export const findAllConcerts = () => model.find();
export const findConcertById = (concertId) => model.findById(concertId);
export const findConcertByIdentifier = (identifier) => model.findOne(
    {identifier: identifier});
export const findConcertsByArtist = (artist) => model.find()
export const updateConcertById = (concertId, concert) => model.updateOne(
    {_id: concertId}, {$set: concert});
export const updateConcertByIdentifier = (identifier,
    concert) => model.updateOne(
    {identifier: identifier}, {$set: concert});
export const deleteConcertById = (concertId) => model.deleteOne(
    {_id: concertId});
export const deleteConcertByIdentifier = (identifier) => model.deleteOne(
    {identifier: identifier});
