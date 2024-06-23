import { Application } from "express";
import expressLoader from "./express";
import graphqlLoader from "./graphql";
export default async ({ app }: { app: Application }) => {
    await expressLoader({ app });
    console.log("express loaded successfully");
    await graphqlLoader({ app });
    console.log("graphql loaded successfully");
};
