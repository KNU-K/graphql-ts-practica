import request from "supertest";
import createRestApp from "../src/restapi/app";
import createGraphApp from "../src/graphql/app";
import { Application } from "express";

describe("✅ RestAPI test", () => {
    let app: Application;

    beforeAll(async () => {
        app = await createRestApp();
    });

    it("✅✅ 프로필, 리뷰, 리뷰 세부정보", async () => {
        const userRes = await request(app).get("/api/user/1");
        const userReviewRes = await request(app).get("/api/user/1/review");
        const reviewRes = await request(app).get("/api/review/1");
        expect(userRes.status).toBe(200);
        expect(userRes.body).toHaveProperty("id");
        expect(userRes.body).toHaveProperty("name");
        expect(userRes.body).toHaveProperty("email");
        expect(userRes.body).toHaveProperty("age");
        expect(userRes.body).toHaveProperty("phone");
        expect(userReviewRes.status).toBe(200);
        expect(userReviewRes.body).toHaveProperty("reviewId");
        expect(userReviewRes.body).toHaveProperty("userId");
        expect(userReviewRes.body).toHaveProperty("content");
        expect(userReviewRes.body).toHaveProperty("timestamp");
        expect(userReviewRes.status).toBe(200);
        expect(userReviewRes.body).toHaveProperty("reviewId");
        expect(userReviewRes.body).toHaveProperty("userId");
        expect(userReviewRes.body).toHaveProperty("content");
        expect(userReviewRes.body).toHaveProperty("timestamp");
        expect(reviewRes.status).toBe(200);
        expect(reviewRes.body).toHaveProperty("reviewId");
        expect(reviewRes.body).toHaveProperty("timestamp");
        expect(reviewRes.body).toHaveProperty("userId");
        expect(reviewRes.body).toHaveProperty("content");
        expect(reviewRes.body).toHaveProperty("score");
    });
});
