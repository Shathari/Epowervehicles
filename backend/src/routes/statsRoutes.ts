import { Router } from 'express'
import * as statsController from '../controllers/statsController.ts'
import { authenticate } from '../middleware/authenticate.ts'
import { requireRole } from '../middleware/requireRole.ts'
import { validateBody } from '../middleware/validate.ts'
import { updateStatsSchema } from '../validators/statsValidators.ts'

export const statsRouter = Router()

statsRouter.get('/', statsController.get)
statsRouter.post(
  '/',
  authenticate,
  requireRole('ADMIN'),
  validateBody(updateStatsSchema),
  statsController.update,
)
statsRouter.patch(
  '/',
  authenticate,
  requireRole('ADMIN'),
  validateBody(updateStatsSchema),
  statsController.update,
)
