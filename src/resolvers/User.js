const Event = require('../models/Event');

async function createdEvents(eventIds, context) {
  try {
    const events = await Event.find({ _id: { $in: eventIds }});
    return events.map(event => {
      return {
        ...event._doc,
        date: new Date(event.date).toISOString(),
        creator: context.creator.bind(this, event.creator, context)
      }
    });
  } catch (err) { throw err }
}

module.exports = {
  createdEvents
}