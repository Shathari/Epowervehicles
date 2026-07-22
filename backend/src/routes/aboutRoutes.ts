import { Router } from 'express'
import * as aboutController from '../controllers/aboutController.ts'
import { authenticate } from '../middleware/authenticate.ts'
import { requireRole } from '../middleware/requireRole.ts'
import { validateBody } from '../middleware/validate.ts'
import { updateAboutSchema } from '../validators/aboutValidators.ts'

export const aboutRouter = Router()

aboutRouter.get('/', aboutController.get)
aboutRouter.post(
  '/',
  authenticate,
  requireRole('ADMIN'),
  validateBody(updateAboutSchema),
  aboutController.update,
)
aboutRouter.patch(
  '/',
  authenticate,
  requireRole('ADMIN'),
  validateBody(updateAboutSchema),
  aboutController.update,
)
