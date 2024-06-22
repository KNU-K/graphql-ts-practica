import request from "supertest";
import createRestApp from "../src/restapi/app";
import createGraphApp from "../src/graphql/app";
import { Application } from "express";

describe("Performance Comparison", () => {
    let restApp: Application;
    let graphApp: Application;

    beforeAll(async () => {
        restApp = await createRestApp();
        graphApp = await createGraphApp();
    });
    it("GraphQL API Performance", async () => {
        const iterations = 10; // Number of times to repeat the request
        let totalTime = 0;

        const query = `query {
                            userProfile(id: 1) {
                                id
                                name
                                email
                            }
                            getBoard(id:1){
                                postId
                                userId
                                title
                            }
                            getComment(boardId:1){
                                commentId
                                postId
                                userId
                            }
                        }`;

        for (let i = 0; i < iterations; i++) {
            const startTime = process.hrtime();
            await request(graphApp).post("/graphql").send({ query });
            const endTime = process.hrtime(startTime);
            const elapsedMs = endTime[0] * 1000 + endTime[1] / 1000000;
            totalTime += elapsedMs;
        }

        const averageTime = totalTime / iterations;
        console.log(`Average response time for GraphQL API: ${averageTime} ms`);
    });
    it("REST API Performance", async () => {
        const iterations = 10; // Number of times to repeat the request
        let totalTime = 0;

        for (let i = 0; i < iterations; i++) {
            const startTime = process.hrtime();
            await request(restApp).get("/api/profile");
            await request(restApp).get("/api/board/1");
            await request(restApp).get("/api/comment").query({ board_id: 1 });
            const endTime = process.hrtime(startTime);
            const elapsedMs = endTime[0] * 1000 + endTime[1] / 1000000;
            totalTime += elapsedMs;
        }

        const averageTime = totalTime / iterations;
        console.log(`Average response time for REST API: ${averageTime} ms`);
    });
});
