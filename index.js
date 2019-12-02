
const express = require('express')
var path = require('path');
const http = require('http');
const { ApolloServer, PubSub, gql } = require("apollo-server-express");
const fetch = require("node-fetch");
const cors = require('cors')
const app = express();
app.use(cors())

const typeDefs = gql`
  type Click {
    id: ID!
    color: String!
    timestamp: String!
  }
  type Query {
    getClicks: [Click]
  }
  input ClickInput {
    id: ID!
    color: String!
    timestamp: String!
  }
  type Mutation {
    addClick(input: ClickInput): [Click]
  }
  type Subscription {
    newClicks: [Click]
  }
`;

const clicks = [];
const pubsub = new PubSub();

const NEW_CLICK = "NEW_CLICK";

const resolvers = {
  Query: {
    getClicks: () => clicks
  },
  Mutation: {
    addClick: (_root, { input }) => {
      console.log(input)
      clicks.push(input);
      pubsub.publish(NEW_CLICK, { newClicks: clicks });
      return clicks;
    }
  },
  Subscription: {
    newClicks: {
      subscribe: () => {
        return pubsub.asyncIterator(NEW_CLICK);
      }
    }
  }
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
});
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static('public'))
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, "public", "index.html"))
//   })
// }

const PORT = process.env.PORT || 5000

// const httpServer = http.createServer(app);
// server.installSubscriptionHandlers(httpServer);
// httpServer.listen(PORT, () => console.log(`Server started on port ${server.graphqlPath}`));

httpServer.listen(PORT, () => console.log(`Server started on port ${server.graphqlPath}`));