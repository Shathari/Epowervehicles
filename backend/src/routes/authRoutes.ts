import { Router } from 'express'
import * as authController from '../controllers/authController.ts'
import { validateBody } from '../middleware/validate.ts'
import { loginSchema } from '../validators/authValidators.ts'
import { authRateLimiter } from '../middleware/rateLimiter.ts'

export const authRouter = Router()

authRouter.post('/login', authRateLimiter, validateBody(loginSchema), authController.login)
authRouter.post('/refresh', authController.refresh)
authRouter.post('/logout', authController.logout)
