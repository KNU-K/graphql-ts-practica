import dummydata2 from "../../data/dummydata2";
export default class ReviewService {
    getDetailOfReviewByReviewId = async (reviewId: number) => {
        return dummydata2.reviewDummy.find((review) => review.reviewId === reviewId);
    };
}
