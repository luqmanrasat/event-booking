const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    events: [Event!]!
  }

  type Mutation {
    createUser(userInput: UserInput!): User
    createEvent(eventInput: EventInput): Event
  }

  type User {
    _id: ID!
    email: String!
    password: String
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  input UserInput {
    email: String!
    password: String!
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