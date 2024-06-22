import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import createApp from "./app";

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

(async function startServer() {
    const app = await createApp();
    const httpServer = http.createServer(app);
    const PORT = 4000;
    httpServer.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}/graphql`);
    });
})();
