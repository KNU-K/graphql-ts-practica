import express, { Application } from "express";
import loader from "./loaders";

export default async function createApp(): Promise<Application> {
    const app = express();
    await loader({ app });
    return app;
}
