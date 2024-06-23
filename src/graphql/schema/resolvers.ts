import dummydata2 from "../../data/dummydata2";

export default {
    Query: {
        user: (_: any, { id }: { id: number }) =>
            dummydata2.userDummy.find((user) => user.id === id),
        userReviews: (_: any, { userId }: { userId: number }) =>
            dummydata2.reviewDummy.filter((review) => review.userId === userId),
        review: (_: any, { id }: { id: number }) =>
            dummydata2.reviewDummy.find((review) => review.reviewId === id),
    },
    Review: {
        author: (review: any) => dummydata2.userDummy.find((user) => user.id === review.userId),
    },
    User: {
        reviews: (user: any) =>
            dummydata2.reviewDummy.filter((review) => review.userId === user.id),
    },
};
