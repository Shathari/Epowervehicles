import { Router } from 'express'
import * as salesPartnerController from '../controllers/salesPartnerController.ts'
import { authenticate } from '../middleware/authenticate.ts'
import { requireRole } from '../middleware/requireRole.ts'
import { validateBody } from '../middleware/validate.ts'
import {
  createSalesPartnerApplicationSchema,
  replaceSalesPartnerApplicationSchema,
  updateSalesPartnerApplicationSchema,
} from '../validators/salesPartnerValidators.ts'
import { submissionRateLimiter } from '../middleware/rateLimiter.ts'

export const salesPartnerRouter = Router()

salesPartnerRouter.get('/', authenticate, requireRole('ADMIN'), salesPartnerController.list)
salesPartnerRouter.post(
  '/',
  submissionRateLimiter,
  validateBody(createSalesPartnerApplicationSchema),
  salesPartnerController.create,
)
salesPartnerRouter.get('/:id', authenticate, requireRole('ADMIN'), salesPartnerController.getById)
salesPartnerRouter.put(
  '/:id',
  authenticate,
  requireRole('ADMIN'),
  validateBody(replaceSalesPartnerApplicationSchema),
  salesPartnerController.replace,
)
salesPartnerRouter.patch(
  '/:id',
  authenticate,
  requireRole('ADMIN'),
  validateBody(updateSalesPartnerApplicationSchema),
  salesPartnerController.updateStatus,
)
salesPartnerRouter.delete('/:id', authenticate, requireRole('ADMIN'), salesPartnerController.remove)
