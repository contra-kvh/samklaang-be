import { Router } from 'express'
import { login, register } from './handlers/auth.js'
import { validateRequestBody } from '../middleware/bodyValidationMiddleware.js'
import { LoginRequestSchema, RegisterRequestSchema } from './models/requests.js'

export const apiRouter: Router = Router()


const authRouter = Router()
authRouter.post('/login', validateRequestBody(LoginRequestSchema), login)
authRouter.post('/register', validateRequestBody(RegisterRequestSchema), register)

apiRouter.use('/auth', authRouter)
