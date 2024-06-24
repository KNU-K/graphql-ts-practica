import request from "supertest";
import createApp from "../../../src/graphql/app";
import { Application } from "express";
import { performance } from "perf_hooks";

describe("✅ GraphQL Performance Test", () => {
    let app: Application;

    beforeAll(async () => {
        app = await createApp();
    });

    it("✅ Measure Performance", async () => {
        const numRequests = 10;
        let totalDuration = 0;

        const query = `
                query {
                    users {
                        id
                        name
                        email
                    }
                }
            `;

        for (let i = 0; i < numRequests; i++) {
            const startTime = performance.now();
            const res = await request(app).post("/graphql").send({ query }).expect(200);

            const endTime = performance.now();
            const duration = endTime - startTime;
            totalDuration += duration;

            console.log(
                `Request ${i + 1} 소요 시간: ${duration} milliseconds, Response Size: ${
                    res.header["content-length"]
                } bytes`
            );
        }

        const averageDuration = totalDuration / numRequests;
        console.log(`평균 소요 시간: ${averageDuration} milliseconds`);
    });
});
