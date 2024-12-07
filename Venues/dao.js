import model from "./model.js";

export const createVenue = (venue) => {
  const existing = model.findOne(
      {id: venue.id});
  if (existing) {
    return existing;
  }
  return model.create(venue);
}

export const findAllVenues = () => model.find();

export const findVenueById = (vid) => model.findById(vid);

export const findVenueByTmId = (tmid) => model.findOne(
    {id: tmid});

export const updateVenueById = (id, venue) => model.updateOne(
    {_id: id}, {$set: venue});

export const updateVenueByTmId = (tmid,
    venue) => model.updateOne(
    {id: tmid}, {$set: venue});

export const deleteVenueById = (id) => model.deleteOne(
    {_id: id});

export const deleteVenueByTmId = (tmid) => model.deleteOne(
    {id: tmid});