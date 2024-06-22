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

## 😊 ch1. Query를 통해 데이터를 가져오기

### hello world를 해보자

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

😊 ch2. 간단하게 RestAPI 와 GraphQL 간의 비교

초기 챕터에서는 database를 사용하지않고 practice에 대해서 소개하려고 한다.

#### 🚩초기 시나리오 구성

프로필 정보, 게시물, 댓글을 프론트에서 요청이 필요로 할 때:

-   REST API : 프로필 정보, 게시물, 댓글에 대한 요청을 따로 구성한다.
-   GraphQL : Query 기반으로 한번에 요청으로 가능하게 할 수 있다.

#### 🏴REST API로 구성

`/api/profile`
`/api/board/:id`
`/api/comment`
로 구성할 것이다. 현재는 인증하는 것이 목적이 아니기 때문에, 인증부 없이 무조건적으로 1번user의 profile을 주도록 하겠다.

#### 🏳️GraphQL로 구성

```graphQL
query {
    userProfile(id: 1) {
        id
        name
        email
        age
        phone
    }
    getBoard(id:1){
        postId
        userId
        title
        content
        timestamp
    }
    getComment(boardId:1){
        commentId
        postId
        userId
        content
        timestamp
    }
}
```

해당 쿼리를 통해 한번에 접근 가능, 해당 부분에서도 설명에 불필요한 내용은 제외하여 진행했다.

#### ✅ 간단한 비교 분석

##### : 클라이언트가 원하는 응답을 준비할 수 있는 graphQL

`Rest API` 는 서버가 구성하고 있는 형태를 클라이언트에 필요에 따라 변경하려면 새로운 api 를 구성해야하는 번거러움이 존재할 수 있다.

하지만, `GraphQL`의 경우에는 그 때 그때 필요한 인자만을 받을 수 있기 때문에, 응답을 받는 것에 자유롭다.

##### : 과연 응답 속도가 정말 빠를까? 실제 실험을 해보자

`Rest API` 와 `GraphQL`에서 요청에 따른 속도 차이가 나타날 수도 있다고 했는데, 정말인지 확인하기 위해서 동일 서버 스펙에서 총 5번의 테스트를 진행해봤다.

`npm test perform`을 통해서 이를 확인할 수 있다!

<img src="./images/image.png" alt="nop" width="300" />

perform에 대한 test를 진행한 결과 1.3 ~ 1.7 배 더 빠른 것으로 측정되었다. 이렇게 한 번에 많은 요청량이 client가 필요로 한다고 생각하면 편할 것이다.

> 많은 클라이언트는 하나의 페이지 단위에 여러 데이터를 얻기 위한 서로 다른 api요청을 반복한다.
