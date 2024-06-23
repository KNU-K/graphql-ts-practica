import { Application, json, urlencoded } from "express";
import routes from "../api";
export default async ({ app }: { app: Application }) => {
    /**초기 미들웨어 구성 */
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use("/api", routes());
    console.log("successfully load router loader .. 😊 ");
};
