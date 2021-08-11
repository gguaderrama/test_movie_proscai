import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
// import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import { MovieResolver } from "./resolvers/MovieResolver";
import cors from 'cors';

(async () => {
  const app = express();

  // Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};


app.use(cors(options));

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MovieResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });



  app.listen(4000, () => {
    console.log("express server started");
  });
})();
