import { Router } from "express";
import authRouter from "./auth.routes.js";
import urlRouter from "./url.routes.js";
import userRouter from "./user.routes.js";

const indexRouter = Router();

indexRouter.use(authRouter);
indexRouter.use(urlRouter);
indexRouter.use(userRouter);

export default indexRouter;
