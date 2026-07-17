import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/AppError.ts'
import type { Role } from '../types.ts'

export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw AppError.forbidden('You do not have permission to perform this action.')
    }
    next()
  }
}
