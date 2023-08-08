import { Router } from "express";
import { getCurrentUser, getRanking } from "../controllers/users.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const userRouter = Router();

userRouter.get("/users/me", validateToken, getCurrentUser);
userRouter.get("/ranking", getRanking);

export default userRouter;
