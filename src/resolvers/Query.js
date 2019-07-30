const Event = require('../models/Event');

function events() {
  return Event
    .find()
    .then(events => { 
      return events.map(event => { 
        return { ...event._doc };
      })
    })
    .catch(err => { throw err })
}

module.exports = {
  events
}