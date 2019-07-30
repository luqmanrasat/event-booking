const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const { schema } = require('./schema');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const resolvers = {
  ...Query,
  ...Mutation,
};

const app = express();
app.use(bodyParser.json());
app.use('/graphql', graphqlHttp({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-3tkoq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then(() => app.listen(3000))
  .catch(err => console.error(err));
