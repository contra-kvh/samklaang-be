import { Router } from "express";
import {
  getUser,
  getProfile,
  updateProfile,
} from "../../api/handlers/users.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { validateRequestBody } from "../../middleware/bodyValidationMiddleware.js";

const usersRouter: Router = Router();

usersRouter.get("/users/:uuid", getUser);

usersRouter.get("/profile", authMiddleware, getProfile);

usersRouter.patch(
  "/profile",
  authMiddleware,
  validateRequestBody,
  updateProfile
);

export default usersRouter;
