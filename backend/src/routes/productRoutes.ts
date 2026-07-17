import { Router } from 'express'
import * as productController from '../controllers/productController.ts'
import { authenticate } from '../middleware/authenticate.ts'
import { optionalAuthenticate } from '../middleware/optionalAuthenticate.ts'
import { requireRole } from '../middleware/requireRole.ts'
import { validateBody } from '../middleware/validate.ts'
import { createProductSchema, updateProductSchema } from '../validators/productValidators.ts'

export const productRouter = Router()

productRouter.get('/', optionalAuthenticate, productController.list)
productRouter.post(
  '/',
  authenticate,
  requireRole('ADMIN'),
  validateBody(createProductSchema),
  productController.create,
)
productRouter.patch(
  '/:id',
  authenticate,
  requireRole('ADMIN'),
  validateBody(updateProductSchema),
  productController.update,
)
productRouter.delete('/:id', authenticate, requireRole('ADMIN'), productController.remove)
