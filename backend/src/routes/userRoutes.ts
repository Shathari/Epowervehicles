import { Router } from 'express'
import * as userController from '../controllers/userController.ts'
import { authenticate } from '../middleware/authenticate.ts'
import { requireRole } from '../middleware/requireRole.ts'
import { validateBody } from '../middleware/validate.ts'
import {
  createUserSchema,
  replaceUserSchema,
  updateUserSchema,
} from '../validators/userValidators.ts'

export const userRouter = Router()

userRouter.use(authenticate, requireRole('ADMIN'))

userRouter.get('/', userController.list)
userRouter.post('/', validateBody(createUserSchema), userController.create)
userRouter.put('/:id', validateBody(replaceUserSchema), userController.replace)
userRouter.patch('/:id', validateBody(updateUserSchema), userController.update)
userRouter.delete('/:id', userController.remove)
