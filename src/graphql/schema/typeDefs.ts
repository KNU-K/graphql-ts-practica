export default `#graphql
type User {
    id: Int!
    name: String!
    email: String!
    reviews: [Review]
}

type Review {
    reviewId: Int!
    content: String!
    score: Int!
    timestamp: String!
    author: User
}

type Query {
    user(id: Int!): User
    userReviews(userId: Int!): [Review]
    review(id: Int!): Review
}
`;
