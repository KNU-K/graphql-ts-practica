import express, {
    Application,
    NextFunction,
    Request,
    Response,
    Router,
    json,
    urlencoded,
} from "express";
import dummyData from "../data/dummydata";

class Controller {
    getProfile = async (req: Request, res: Response, next: NextFunction) => {
        const userId = 1;
        const user = dummyData.userDummy.find((user) => user.id === userId);

        return res.status(200).json(user);
    };
    getBoard = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id) || 1;
        const board = dummyData.boardDummy.find((board) => board.postId === id);
        return res.status(200).json(board);
    };
    getComment = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.query.board_id as string);
        const comment = dummyData.commentDummy.find((comment) => comment.commentId === id);
        return res.status(200).json(comment);
    };
}
function createRoutes(): Router {
    const route = Router();
    const controller = new Controller();

    /**configuration */
    route.get("/profile", controller.getProfile);
    route.get("/board/:id", controller.getBoard);
    route.get("/comment", controller.getComment);
    return route;
}
async function loaderConfig(app: Application) {
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use("/api", createRoutes());
    console.log("성공적으로 Controller 구성");
}
export default async function createApp(): Promise<Application> {
    const app = express();
    await loaderConfig(app);
    return app;
}
