const User = require('../models/User');

async function creator(userId, context) {
  try {
    const user = await User.findById(userId);
    return { 
      ...user._doc,
      password: null,
      createdEvents: context.createdEvents.bind(this, user.createdEvents, context),
    };
  } catch (err) { throw err }
}

module.exports = {
  creator
}