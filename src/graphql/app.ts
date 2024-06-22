import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import dummydata from "../data/dummydata";

const typeDefs = `#graphql
    type User {
      id: Int
      name: String
      email: String
      age: Int
      phone: String
    }

    type Board {
      postId: Int
      userId: Int
      title: String
      content: String
      timestamp: String
    }
    
    type Comment {
      commentId: Int
      postId: Int
      userId: Int
      content: String
      timestamp: String
    }
    type Query {
      userProfile(id: Int): User
      getBoard(id:Int):Board
      getComment(boardId:Int):Comment
    }
`;
const resolvers = {
    Query: {
        userProfile: (_: any, { id }: { id: number }): any => {
            const user = dummydata.userDummy.find((user) => user.id === id);
            return user;
        },
        getBoard: (_: any, { id }: { id: number }): any => {
            const board = dummydata.boardDummy.find((board) => board.postId === id);
            return board;
        },
        getComment: (_: any, { boardId }: { boardId: number }): any => {
            const comment = dummydata.commentDummy.find((comment) => comment.postId === boardId);
            return comment;
        },
    },
};

export default async function createApp(): Promise<Application> {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    app.use("/graphql", express.json(), expressMiddleware(server));

    return app;
}
