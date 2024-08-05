import { Router } from 'express'
import { login, register } from './handlers/auth.js'
import { validateRequestBody } from '../middleware/bodyValidationMiddleware.js'
import { LoginRequestSchema, RegisterRequestSchema } from './models/requests.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

export const apiRouter: Router = Router()


const authRouter = Router()
authRouter.post('/login', validateRequestBody(LoginRequestSchema), login)
authRouter.post('/register', validateRequestBody(RegisterRequestSchema), register)
// TODO: remove from production
authRouter.get('/test', authMiddleware, (req, res) => {
  res.status(200).json(res.locals.user)
})

apiRouter.use('/auth', authRouter)
