# graphql-ts-practica

## 🗒️ 왜 해당 주제에 대한 예제를 제작하는가?

-   graphql이 Rest API 의 Over-fetching / Under-fetching에 얼마나 잘 대응하는지를 보여주기 위해서.

### Over-fetching이란

가져온 정보에서 필요한 정보는 한정적일 수도 있다. 하지만 Rest API로 호출을 하게되면, 불필요한 정보까지 가지고 오는 경우가 있다 이를 `Over-fetching` 이라고 한다.

> 서버의 자원이 낭비가 됨.

### Under-fetching이란?

프론트엔드의 하나의 페이지를 구성하기 위해서 프로필 정보, 게시물 정보, 댓글 정보등 많은 정보를 가지고 와야하지만, Rest api에서는 이러한 것을 각 부분에 따라 요청해야한다. 필요한 정보를 한번에 가져오지 못하는 것을 `Under-fetching` 이라고 한다.

> 서버에 요청량이 증가하게 됨.

### GraphQL의 등장

이러한 문제를 해결하기 위해서, 데이터를 가져오는 것에 필요한 것을 최적화하여 한번의 요청에 필요한 데이터를 가지고 오는 것을 주 목표로 하여 만들어졌다.

`GraphQL`과 `SQL`은 같은 Query Language이다. 간단히 말해서 질의형으로 요청하여 필요에 따른 응답을 받을 수 있는 것이다.

## 😊 ch1. Query를 통해 데이터를 가져오기 (Hello world)

```tsx
import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query: {
        hello: () => "world",
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
```

위와 같이 코드를 구성하였다.

기본적으로 express를 사용하지않고 graphQL를 제작할 수 있지만, express와 함께 유연하게 동작하는 graphQL을 사용하도록 하는 것을 목표로 한다.

express의 미들웨어를 통해서 resolver에 접근하여 Query를 확인 후 답을 줄 수 있는 것이다.

현재 챕터에서 `npm test`를 통해서 테스트를 진행해보자.

```json
query : "query { hello }"
```

라는 형식의 쿼리를 json 형식으로 보내게 되면, 일반 Rest API와 같은 JSON형태로 응답을 받을 수 있게 된다. 해당 테스트는 이에 대한 부분을 직관적으로 확인할 수 있도록 구성했다..
