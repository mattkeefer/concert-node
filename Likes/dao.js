import userModel from "../Users/model.js";
import concertModel from "../Concerts/model.js";

export const userSavesConcert = async (userId, concert, isAttending) => {
  const user = await userModel.findById(userId);
  let storedConcert = await concertModel.findOne(
      {id: concert.id});
  if (!storedConcert) {
    storedConcert = await concertModel.create(concert);
  }
  if (isAttending) {
    await userModel.updateOne({_id: user._id},
        {$addToSet: {attending: storedConcert._id}});
    await concertModel.updateOne({_id: storedConcert._id},
        {$addToSet: {attendingUsers: user._id}});
  } else {
    await userModel.updateOne({_id: user._id},
        {$addToSet: {interested: storedConcert._id}});
    await concertModel.updateOne({_id: storedConcert._id},
        {$addToSet: {interestedUsers: user._id}});
  }
  return concertModel.findById(storedConcert._id);
}

export const userUnsavesConcert = async (userId, concertId, isAttending) => {
  const user = await userModel.findById(userId);
  const concert = await concertModel.findOne({id: concertId});

  if (isAttending) {
    await userModel.updateOne({_id: user._id},
        {$pull: {attending: concert._id}});
    await concertModel.updateOne({_id: concert._id},
        {$pull: {attendingUsers: user._id}});
  } else {
    await userModel.updateOne({_id: user._id},
        {$pull: {interested: concert._id}});
    await concertModel.updateOne({_id: concert._id},
        {$pull: {interestedUsers: user._id}});
  }

  return concertModel.findById(concert._id);
}

export const findAllAttendingConcerts = async (userId) => {
  const user = await userModel.findById(userId).populate("attending");
  return user.attending;
}

export const findAllInterestedConcerts = async (userId) => {
  const user = await userModel.findById(userId).populate("interested");
  return user.interested;
}