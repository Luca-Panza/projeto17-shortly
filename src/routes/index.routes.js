import { Router } from "express";
import authRouter from "./auth.routes.js";
import urlsRouter from "./urls.routes.js";
import usersRouter from "./users.routes.js";

const indexRouter = Router();

indexRouter.use(authRouter);
indexRouter.use(urlsRouter);
indexRouter.use(usersRouter);

export default indexRouter;
