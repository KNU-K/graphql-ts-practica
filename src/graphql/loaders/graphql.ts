import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { Application, json } from "express";
import resolvers from "../schema/resolvers";
import typeDefs from "../schema/typeDefs";

export default async ({ app }: { app: Application }) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    app.use("/graphql", json(), expressMiddleware(server));
};
