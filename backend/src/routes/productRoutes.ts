import { Router } from 'express'
import * as productController from '../controllers/productController.ts'
import { authenticate } from '../middleware/authenticate.ts'
import { optionalAuthenticate } from '../middleware/optionalAuthenticate.ts'
import { requireRole } from '../middleware/requireRole.ts'
import { validateBody } from '../middleware/validate.ts'
import {
  createProductSchema,
  replaceProductSchema,
  updateProductSchema,
} from '../validators/productValidators.ts'
import { uploadImage } from '../middleware/upload.ts'

export const productRouter = Router()

productRouter.get('/', optionalAuthenticate, productController.list)
productRouter.get('/featured', productController.featured)
productRouter.post(
  '/',
  authenticate,
  requireRole('ADMIN'),
  validateBody(createProductSchema),
  productController.create,
)
productRouter.post(
  '/upload',
  authenticate,
  requireRole('ADMIN'),
  uploadImage.single('image'),
  productController.uploadImage,
)
productRouter.get('/:id', optionalAuthenticate, productController.getById)
productRouter.put(
  '/:id',
  authenticate,
  requireRole('ADMIN'),
  validateBody(replaceProductSchema),
  productController.replace,
)
productRouter.patch(
  '/:id',
  authenticate,
  requireRole('ADMIN'),
  validateBody(updateProductSchema),
  productController.update,
)
productRouter.delete('/:id', authenticate, requireRole('ADMIN'), productController.remove)
