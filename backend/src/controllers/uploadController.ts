import type { Request, Response } from 'express'
import { AppError } from '../utils/AppError.ts'

export function uploadPublicAdminImage(req: Request, res: Response) {
  if (!req.file) {
    throw AppError.badRequest('No image file was uploaded.')
  }

  const file = req.file as Express.Multer.File & {
    path: string
    filename: string
  }

  res.status(200).json({
    ok: true,
    url: file.path, // Cloudinary URL
    publicId: file.filename, // Cloudinary public_id
  })
}
