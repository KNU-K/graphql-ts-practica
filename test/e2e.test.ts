import request from "supertest";
import createApp from "../src/app";
import { Application } from "express";

describe("GraphQL test example", () => {
    let app: Application;

    beforeAll(async () => {
        app = await createApp();
    });

    it("✅ hello world query", async () => {
        const res = await request(app).post("/graphql").send({
            query: "query { hello }",
        });

        console.log(res.body);

        // Add your assertions here
        expect(res.status).toBe(200);
        expect(res.body.data.hello).toBe("world");
    });
});
