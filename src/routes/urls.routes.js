import { Router } from "express";
import { postUrl, getUrl, redirectUrl, deleteUrl } from "../controllers/urls.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { urlSchema } from "../schemas/url.schema.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateToken, validateSchema(urlSchema), postUrl);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", redirectUrl);
urlsRouter.delete("/urls/:id", validateToken, deleteUrl);

export default urlsRouter;
