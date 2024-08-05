import { Router } from 'express'
import authRouter from './routers/auth.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import usersRouter from './routers/users.js'

export const apiRouter: Router = Router()


apiRouter.use('/auth', authRouter)
apiRouter.use('/users', authMiddleware, usersRouter)
