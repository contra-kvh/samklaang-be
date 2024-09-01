import {Router} from 'express'
import { validateRequestBody, } from '../../middleware/bodyValidationMiddleware.js'
import { login, register } from '../handlers/auth.js'
import { LoginRequestSchema, RegisterRequestSchema } from '../models/requests.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'

const authRouter: Router = Router()
authRouter.post('/login', validateRequestBody(LoginRequestSchema), login)
authRouter.post('/register', validateRequestBody(RegisterRequestSchema), register)

export default authRouter
