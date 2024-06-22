import request from "supertest";
import createRestApp from "../src/restapi/app";
import createGraphApp from "../src/graphql/app";
import { Application } from "express";

describe("✅ RestAPI test", () => {
    let app: Application;

    beforeAll(async () => {
        app = await createRestApp();
    });

    it("✅✅ 프로필, 특정 게시물 정보, 댓글 정보 요청", async () => {
        const resProfile = await request(app).get("/api/profile");
        const resBoard = await request(app).get("/api/board/1");
        const resComment = await request(app).get("/api/comment").query({ board_id: 1 });

        /** getProfile */
        expect(resProfile.statusCode).toEqual(200);
        expect(resProfile.body).toHaveProperty("id");
        expect(resProfile.body).toHaveProperty("name");
        expect(resProfile.body).toHaveProperty("email");

        /** getBoard */
        expect(resBoard.statusCode).toEqual(200);
        expect(resBoard.body).toHaveProperty("postId");
        expect(resBoard.body.postId).toEqual(1);
        expect(resBoard.body).toHaveProperty("userId");
        expect(resBoard.body).toHaveProperty("title");

        /** getComment */
        expect(resComment.statusCode).toEqual(200);
        expect(resComment.body).toHaveProperty("commentId");
        expect(resComment.body).toHaveProperty("postId");
        expect(resComment.body.postId).toEqual(1);
        expect(resComment.body).toHaveProperty("userId");
        expect(resComment.body).toHaveProperty("content");
    });
});

describe("✅ GraphQL test", () => {
    let app: Application;

    beforeAll(async () => {
        app = await createGraphApp();
    });

    it("✅✅ 프로필, 특정 게시물 정보, 댓글 정보 요청", async () => {
        const query = `query {
                            userProfile(id: 1) {
                                id
                                name
                                email
                                age
                                phone
                            }
                            getBoard(id:1){
                                postId
                                userId
                                title
                                content
                                timestamp
                            }
                            getComment(boardId:1){
                                commentId
                                postId
                                userId
                                content
                                timestamp
                            }
                        }`;
        const res = await request(app).post("/graphql").send({
            query: query,
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("userProfile");
        expect(res.body.data).toHaveProperty("getBoard");
        expect(res.body.data).toHaveProperty("getComment");
    });
});
