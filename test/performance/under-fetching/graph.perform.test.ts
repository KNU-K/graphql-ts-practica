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

        for (let i = 0; i < numRequests; i++) {
            const startTime = performance.now();

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
                            author {
                                name
                            }
                        }
                    }
                    review(id: 1) {
                        reviewId
                        content
                        score
                        timestamp
                        author {
                            name
                        }
                    }
                }
            `;

            const response = await request(app).post("/graphql").send({ query }).expect(200);

            const endTime = performance.now();
            const duration = endTime - startTime;
            totalDuration += duration;

            console.log(`Request ${i + 1} 소요 시간: ${duration} milliseconds`);

            // 추가적인 assertion을 통해 예상 값과 비교할 수 있음
            expect(response.body.data.user.reviews.length).toBe(4); // 예상되는 리뷰 목록 개수
        }

        const averageDuration = totalDuration / numRequests;
        console.log(`평균 소요 시간: ${averageDuration} milliseconds`);
    });
});
