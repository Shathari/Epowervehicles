import type { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../utils/jwt.ts'
import { AppError } from '../utils/AppError.ts'

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : null

  if (!token) {
    throw AppError.unauthorized('Missing or invalid authorization header.')
  }

  try {
    req.user = verifyAccessToken(token)
    next()
  } catch {
    throw AppError.unauthorized('Invalid or expired access token.')
  }
}
