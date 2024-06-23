import { NextFunction, Request, Response, Router } from "express";
import ReviewService from "../../services/review";

const route = Router();
const reviewService = new ReviewService();
export default (router: Router) => {
    router.use("/review", route);
    /**this section is /api/review routing section */

    route.get("/:reviewId", async (req: Request, res: Response, next: NextFunction) => {
        const reviewId = parseInt(req.params.reviewId);
        return res.status(200).json(await reviewService.getDetailOfReviewByReviewId(reviewId));
    });
};
