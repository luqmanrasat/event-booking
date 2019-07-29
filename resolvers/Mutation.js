const Event = require('../models/event');

function createEvent(args) {
  const event = new Event({
    title: args.eventInput.title,
    description: args.eventInput.description,
    price: +args.eventInput.price,
    date: new Date(args.eventInput.date)
  });

  return event.save()
  .then(result => { return { ...result._doc } })
  .catch(err => { throw err });
}

module.exports = {
  createEvent
}