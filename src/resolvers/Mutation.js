const User = require('../models/User');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');

async function createUser({ userInput }, context) {
  try {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) { throw new Error('User exists already') }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      password: hashedPassword,
    });
        
    const result = await user.save();
    return {
      ...result._doc,
      password: null,
      createdEvents: context.createdEvents.bind(this, result.createdEvents, context),
    };
  } catch (err) { throw err }
}

async function createEvent({ eventInput }, context) {
  const event = new Event({
    title: eventInput.title,
    description: eventInput.description,
    price: +eventInput.price,
    date: new Date(eventInput.date),
    creator: '5d4012ad3ab8641a5eb1782b',
  });
  let createdEvent;

  // to fix: save event after updating user
  try {
    const result = await event.save();
    createdEvent = {
      ...result._doc,
      date: new Date(result.date).toISOString(),
      creator: context.creator.bind(this, result.creator, context),
    };

    const user = await User.findById('5d4012ad3ab8641a5eb1782b');
    if (!user) { throw new Error('User not found') }

    user.createdEvents.push(event);
    await user.save();

    return createdEvent;
  } catch (err) { throw err }
}

module.exports = {
  createEvent,
  createUser,
}