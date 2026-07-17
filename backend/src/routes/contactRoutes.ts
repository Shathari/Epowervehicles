import { Router } from 'express'
import * as contactController from '../controllers/contactController.ts'
import { authenticate } from '../middleware/authenticate.ts'
import { requireRole } from '../middleware/requireRole.ts'
import { validateBody } from '../middleware/validate.ts'
import {
  createContactMessageSchema,
  replaceContactMessageSchema,
  updateContactMessageSchema,
} from '../validators/contactValidators.ts'
import { submissionRateLimiter } from '../middleware/rateLimiter.ts'

export const contactRouter = Router()

contactRouter.get('/', authenticate, requireRole('ADMIN'), contactController.list)
contactRouter.post(
  '/',
  submissionRateLimiter,
  validateBody(createContactMessageSchema),
  contactController.create,
)
contactRouter.get('/:id', authenticate, requireRole('ADMIN'), contactController.getById)
contactRouter.put(
  '/:id',
  authenticate,
  requireRole('ADMIN'),
  validateBody(replaceContactMessageSchema),
  contactController.replace,
)
contactRouter.patch(
  '/:id',
  authenticate,
  requireRole('ADMIN'),
  validateBody(updateContactMessageSchema),
  contactController.updateStatus,
)
contactRouter.delete('/:id', authenticate, requireRole('ADMIN'), contactController.remove)
