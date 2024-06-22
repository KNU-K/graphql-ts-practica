import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query: {
        hello: () => "world",
    },
};

export default async function createApp(): Promise<Application> {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    app.use("/graphql", express.json(), expressMiddleware(server));

    return app;
}
