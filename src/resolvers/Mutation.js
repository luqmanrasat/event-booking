const User = require('../models/User');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');

function createUser({ userInput }) {
  return User
    .findOne({ email: userInput.email })
    .then(user => {
      if (user) { throw new Error('User exists already') }
      return bcrypt
        .hash(userInput.password, 12)
    })
    .then(hashedPassword => {
      const user = new User({
        email: userInput.email,
        password: hashedPassword,
      });
      
      return user.save();
    })
    .then(result => {
      return { ...result._doc, password: null }
    })
    .catch(err => { throw err });  
}

function createEvent({ eventInput }) {
  const event = new Event({
    title: eventInput.title,
    description: eventInput.description,
    price: +eventInput.price,
    date: new Date(eventInput.date),
    creator: '5d3f8ff4961a1d0a7a55fdb6',
  });
  let createdEvent;


  // to fix: save event after updating user
  return event
    .save()
    .then(result => {
      createdEvent = { ...result._doc };
      return User
        .findById('5d3f8ff4961a1d0a7a55fdb6');
    })
    .then(user => {
      if (!user) { throw new Error('User not found') }
      user.createdEvents.push(event);
      return user.save();
    })
    .then(result => {
      return createdEvent
    })
    .catch(err => { throw err });
}

module.exports = {
  createEvent,
  createUser,
}