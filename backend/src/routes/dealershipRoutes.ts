import { Router } from 'express'
import * as dealershipController from '../controllers/dealershipController.ts'
import { authenticate } from '../middleware/authenticate.ts'
import { requireRole } from '../middleware/requireRole.ts'
import { validateBody } from '../middleware/validate.ts'
import {
  createDealershipApplicationSchema,
  replaceDealershipApplicationSchema,
  updateDealershipApplicationSchema,
} from '../validators/dealershipValidators.ts'
import { submissionRateLimiter } from '../middleware/rateLimiter.ts'

export const dealershipRouter = Router()

dealershipRouter.get('/', authenticate, requireRole('ADMIN'), dealershipController.list)
dealershipRouter.post(
  '/',
  submissionRateLimiter,
  validateBody(createDealershipApplicationSchema),
  dealershipController.create,
)
dealershipRouter.get('/:id', authenticate, requireRole('ADMIN'), dealershipController.getById)
dealershipRouter.put(
  '/:id',
  authenticate,
  requireRole('ADMIN'),
  validateBody(replaceDealershipApplicationSchema),
  dealershipController.replace,
)
dealershipRouter.patch(
  '/:id',
  authenticate,
  requireRole('ADMIN'),
  validateBody(updateDealershipApplicationSchema),
  dealershipController.updateStatus,
)
dealershipRouter.delete('/:id', authenticate, requireRole('ADMIN'), dealershipController.remove)
