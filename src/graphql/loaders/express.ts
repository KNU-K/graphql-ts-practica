import { Application, json, urlencoded } from "express";
import graphqlServer from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";

export default async ({ app }: { app: Application }) => {
    app.use(json());
    app.use(urlencoded({ extended: false }));
};
