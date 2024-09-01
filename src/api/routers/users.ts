import { Router } from "express";
import { getUser, getProfile, updateProfile, } from "../../api/handlers/users.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { validateRequestBody } from "../../middleware/bodyValidationMiddleware.js";
import { PatchUserRequestSchema } from "../models/requests.js";

const usersRouter: Router = Router();
usersRouter.use(authMiddleware);

usersRouter.get("/me", getProfile);
usersRouter.patch( "/me", validateRequestBody(PatchUserRequestSchema), updateProfile);
usersRouter.get("/:uuid", getUser);

export default usersRouter;
