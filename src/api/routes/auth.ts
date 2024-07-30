import { Router } from "express";
import { login, register } from './handlers/auth.ts'
import { validateRequestBody } from "../../middleware/validation.ts";
import { LoginRequestSchema, RegisterRequestSchema } from "../../models/requests.ts";

export const authRouter = Router()
authRouter.post("/register", validateRequestBody(RegisterRequestSchema), register);
authRouter.post("/login", validateRequestBody(LoginRequestSchema), login);

export default authRouter;
