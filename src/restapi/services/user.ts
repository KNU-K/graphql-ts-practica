import dummydata2 from "../../data/dummydata2";

export default class UserService {
    getUserByUserId = async (userId: number) => {
        return dummydata2.userDummy.find((user) => user.id === userId);
    };
    getUserReviewByUserId = async (userId: number) => {
        return dummydata2.reviewDummy
            .map(({ score, ...rest }) => rest)
            .find((review) => review.userId === userId);
    };
}
