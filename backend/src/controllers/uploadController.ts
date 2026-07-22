import type { Request, Response } from 'express'
import { AppError } from '../utils/AppError.ts'

export function uploadPublicAdminImage(req: Request, res: Response) {
  if (!req.file) {
    throw AppError.badRequest('No image file was uploaded.')
  }
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  res.status(200).json({ ok: true, url })
}
