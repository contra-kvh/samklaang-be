import {Router} from 'express'
import { validateRequestBody, } from '../../middleware/bodyValidationMiddleware.js'
import { login, register } from '../handlers/auth.js'
import { LoginRequestSchema, RegisterRequestSchema } from '../models/requests.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'

const authRouter: Router = Router()
authRouter.post('/login', validateRequestBody(LoginRequestSchema), login)
authRouter.post('/register', validateRequestBody(RegisterRequestSchema), register)
// TODO: remove from production
authRouter.get('/test', authMiddleware, (req, res) => {
  res.status(200).json(res.locals.user)
})

export default authRouter
