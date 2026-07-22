import { Router } from 'express'
import multer from 'multer'
import * as uploadController from '../controllers/uploadController.ts'
import { authenticate } from '../middleware/authenticate.ts'
import { requireRole } from '../middleware/requireRole.ts'
import { uploadPublicImage } from '../middleware/upload.ts'
import { AppError } from '../utils/AppError.ts'

export const publicAdminUploadRouter = Router()

publicAdminUploadRouter.post(
  '/uploads',
  authenticate,
  requireRole('ADMIN'),
  (req, res, next) => {
    uploadPublicImage.single('image')(req, res, (err: unknown) => {
      if (!err) {
        next()
        return
      }
      if (err instanceof AppError) {
        next(err)
        return
      }
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        next(AppError.badRequest('Image exceeds the 10 MB size limit.'))
        return
      }
      next(err instanceof Error ? AppError.badRequest(err.message) : err)
    })
  },
  uploadController.uploadPublicAdminImage,
)
