import request from "supertest";
import createRestApp from "../src/restapi/app";
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

            // 프로필 정보 요청
            await request(app).get("/api/user/1").expect(200);

            // 사용자 리뷰 목록 요청
            const userReviewRes = await request(app).get("/api/user/1/review").expect(200);
            for (const userReview of userReviewRes.body) {
                await request(app).get(`/api/review/${userReview.reviewId}`).expect(200);
            }

            const endTime = performance.now();
            const duration = endTime - startTime;
            totalDuration += duration;

            console.log(`Request ${i + 1} 소요 시간: ${duration} milliseconds`);
        }

        const averageDuration = totalDuration / numRequests;
        console.log(`평균 소요 시간: ${averageDuration} milliseconds`);
    });
});
