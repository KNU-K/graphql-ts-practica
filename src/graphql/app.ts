import { ApolloServer } from "@apollo/server";
import express, { Application } from "express";
import loaders from "./loaders";

export default async function createApp(): Promise<Application> {
    const app = express();
    await loaders({ app });
    return app;
}
