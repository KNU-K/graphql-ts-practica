import dummydata2 from "../../data/dummydata2";

export default class UserService {
    getUsers = async () => {
        return dummydata2.userDummy;
    };
    getUserByUserId = async (userId: number) => {
        return dummydata2.userDummy.find((user) => user.id === userId);
    };
    getUserReviewByUserId = async (userId: number) => {
        return dummydata2.reviewDummy
            .map(({ score, ...rest }) => rest)
            .filter((review) => review.userId === userId);
    };
}
