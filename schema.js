const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    events: [Event!]!
  }

  type Mutation {
    createEvent(eventInput: EventInput): Event
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }
`);

module.exports = {
  schema
};