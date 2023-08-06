import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpSchema, signInSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/signUp", validateSchema(signUpSchema, "body"), signUp);
authRouter.post("/signIn", validateSchema(signInSchema, "body"), signIn);

export default authRouter;
