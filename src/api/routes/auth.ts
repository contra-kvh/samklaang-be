import { Router } from "express";
import { login, register } from '@/api/routes/handlers/auth'
import { validateRequestBody } from "@/middleware/validation";
import { LoginRequestSchema, RegisterRequestSchema } from "@/models/requests";

export const authRouter = Router()
authRouter.post("/register", validateRequestBody(RegisterRequestSchema), register);
authRouter.post("/login", validateRequestBody(LoginRequestSchema), login);

export default authRouter;
