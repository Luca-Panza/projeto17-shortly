import { Router } from "express";
import { postUrl, getUrl, redirectUrl, deleteUrl } from "../controllers/urls.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { urlSchema } from "../schemas/url.schema.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateToken, validateSchema(urlSchema), postUrl);
urlRouter.get("/urls/:id", getUrl);
urlRouter.get("/urls/open/:shortUrl", redirectUrl);
urlRouter.delete("/urls/:id", validateToken, deleteUrl);

export default urlRouter;
