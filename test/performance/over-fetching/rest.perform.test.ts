import request from "supertest";
import createRestApp from "../../../src/restapi/app";
import { Application } from "express";
import { performance } from "perf_hooks";

describe("✅ RestAPI Performance Test", () => {
    let app: Application;

    beforeAll(async () => {
        app = await createRestApp();
    });

    it("✅ Measure Performance", async () => {
        const numRequests = 10;
        let totalDuration = 0;

        for (let i = 0; i < numRequests; i++) {
            const startTime = performance.now();

            const userRes = await request(app).get("/api/user");
            expect(userRes.status).toBe(200);

            const endTime = performance.now();
            const duration = endTime - startTime;
            totalDuration += duration;

            console.log(
                `Request ${i + 1} 소요 시간: ${duration} milliseconds, Response Size: ${
                    userRes.header["content-length"]
                } bytes`
            );
            expect(userRes.status).toBe(200);
        }

        const averageDuration = totalDuration / numRequests;
        console.log(`평균 소요 시간: ${averageDuration} milliseconds`);
    });
});
