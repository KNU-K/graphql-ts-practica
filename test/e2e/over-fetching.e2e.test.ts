import request from "supertest";
import createRestApp from "../../src/restapi/app";
import { Application } from "express";
import createApp from "../../src/graphql/app";
describe("📈Over-Fetching Test", () => {
    describe("✅ RestAPI test", () => {
        let app: Application;

        beforeAll(async () => {
            app = await createRestApp();
        });

        it("✅✅ 사용자의 이름과 이메일만 조회(1) - 필수요소 테스트", async () => {
            const userRes = await request(app).get("/api/user");
            expect(userRes.status).toBe(200);

            //필수 요소 테스트
            expect(userRes.body).toHaveLength(100);
            expect(userRes.body[0]).toHaveProperty("id");
            expect(userRes.body[0]).toHaveProperty("name");
            expect(userRes.body[0]).toHaveProperty("email");
        });
        it("✅✅ 사용자의 이름과 이메일만 조회(2) - OverFetching으로 인한 불필요한 요소 가져옴.", async () => {
            const userRes = await request(app).get("/api/user");
            expect(userRes.status).toBe(200);

            //필수 요소 테스트
            expect(userRes.body).toHaveLength(100);
            expect(userRes.body[0]).toHaveProperty("age");
            expect(userRes.body[0]).toHaveProperty("phone");
        });
    });

    describe("✅ GraphQL test", () => {
        let app: Application;
        beforeAll(async () => {
            app = await createApp();
        });
        it("✅✅ 프로필, 리뷰, 리뷰 세부정보(1) - 필수 요소 확인", async () => {
            const query = `
            query {
                users {
                    id
                    name
                    email
                }
                
            }
            `;

            const response = await request(app).post("/graphql").send({ query });

            expect(response.status).toBe(200);

            expect(response.body).toHaveProperty("data");
            expect(response.body.data).toHaveProperty("users");
            const users = response.body.data.users;
            expect(users).toHaveLength(100);
            expect(users[0]).toHaveProperty("id");
            expect(users[0]).toHaveProperty("name");
            expect(users[0]).toHaveProperty("email");
        });

        it("✅✅ 프로필, 리뷰, 리뷰 세부정보(2) - 불필요한 요소 제외 여부 확인", async () => {
            const query = `
                query {
                    users {
                        id
                        name
                        email
                    }
                    
                }
                `;
            const response = await request(app).post("/graphql").send({ query });

            expect(response.status).toBe(200);

            expect(response.body).toHaveProperty("data");
            expect(response.body.data).toHaveProperty("users");
            const users = response.body.data.users;
            expect(users).toHaveLength(100);
            expect(users[0]).not.toHaveProperty("age");
            expect(users[0]).not.toHaveProperty("phone");
        });
    });
});
