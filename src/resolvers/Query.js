const Event = require('../models/Event');

async function events(args, context) {
  try {
    const events = await Event.find();
    return events.map(event => {
      return {
        ...event._doc,
        date: new Date(event.date).toISOString(),
        creator: context.creator.bind(this, event.creator, context),
      }
    });
  } catch (err) { throw err }
}

module.exports = {
  events
}