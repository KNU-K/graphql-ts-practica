import { Router } from "express";
import user from "./routes/user";
import review from "./routes/review";

export default () => {
    const router = Router();
    user(router);
    review(router);
    return router;
};
