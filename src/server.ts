import http from "http";
import createApp from "./graphql/app";

/**This Server is based GraphQL  */
(async function startServer() {
    const app = await createApp();
    const httpServer = http.createServer(app);
    const PORT = 4000;
    httpServer.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}/graphql`);
    });
})();
