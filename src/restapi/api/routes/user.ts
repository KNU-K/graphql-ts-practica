import { NextFunction, Request, Response, Router } from "express";
import UserService from "../../services/user";

const route = Router();
const userService = new UserService();
export default (router: Router) => {
    router.use("/user", route);
    /**this section is /api/user routing section */

    route.get("/:userId", async (req: Request, res: Response, next: NextFunction) => {
        const userId = parseInt(req.params.userId);
        return res.status(200).json(await userService.getUserByUserId(userId));
    });
    route.get("/:userId/review", async (req: Request, res: Response, next: NextFunction) => {
        const userId = parseInt(req.params.userId);
        return res.status(200).json(await userService.getUserReviewByUserId(userId));
    });
};
