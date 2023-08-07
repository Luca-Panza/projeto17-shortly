import { Router } from "express";
import { getRanking, getUserMe } from "../controllers/users.controller.js";
import { validateToken } from "../middlewares/validateToken.js";

const usersRouter = Router();

usersRouter.get("/ranking", getRanking);
usersRouter.get("/users/me", validateToken, getUserMe);

export default usersRouter;
