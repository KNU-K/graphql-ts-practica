import request from "supertest";
import createRestApp from "../../src/restapi/app";
import { Application } from "express";
import createApp from "../../src/graphql/app";

describe("⬇️Under-Fetching Test", () => {
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
            expect(userReviewRes.body).toHaveLength(4);
            expect(userReviewRes.body[0]).toHaveProperty("reviewId");
            expect(userReviewRes.body[0]).toHaveProperty("userId");
            expect(userReviewRes.body[0]).toHaveProperty("content");

            expect(userReviewRes.body[0]).toHaveProperty("timestamp");
            expect(reviewRes.status).toBe(200);
            expect(reviewRes.body).toHaveProperty("reviewId");
            expect(reviewRes.body).toHaveProperty("timestamp");
            expect(reviewRes.body).toHaveProperty("userId");
            expect(reviewRes.body).toHaveProperty("content");
            expect(reviewRes.body).toHaveProperty("score");
        });
    });

    describe("✅ GraphQL test", () => {
        let app: Application;
        beforeAll(async () => {
            app = await createApp();
        });
        it("✅✅ 프로필, 리뷰, 리뷰 세부정보", async () => {
            const query = `
                        query {
                            user(id: 1) {
                                id
                                name
                                email
                                reviews {
                                    reviewId
                                    content
                                    score
                                    timestamp
                                    author{
                                         name
                                    }
                                }
                            }
                            
                        }
                        `;
            const response = await request(app).post("/graphql").send({ query });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("data");
            expect(response.body.data).toHaveProperty("user");
            expect(response.body.data.user).toHaveProperty("id");
            expect(response.body.data.user).toHaveProperty("name");
            expect(response.body.data.user).toHaveProperty("id");
            expect(response.body.data.user).toHaveProperty("reviews");
            expect(response.body.data.user.reviews).toHaveLength(4);

            expect(response.body.data.user.reviews[0]).toHaveProperty("reviewId");
            expect(response.body.data.user.reviews[0]).toHaveProperty("content");
            expect(response.body.data.user.reviews[0]).toHaveProperty("score");
            expect(response.body.data.user.reviews[0]).toHaveProperty("timestamp");
            expect(response.body.data.user.reviews[0]).toHaveProperty("author");
            expect(response.body.data.user.reviews[0].author).toHaveProperty("name");
        });
    });
});
