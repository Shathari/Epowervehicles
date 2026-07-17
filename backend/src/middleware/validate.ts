import type { NextFunction, Request, Response } from 'express'
import type { ZodType } from 'zod'
import { AppError } from '../utils/AppError.ts'

export function validateBody(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      throw AppError.badRequest(
        'Validation failed.',
        result.error.flatten().fieldErrors as Record<string, string[]>,
      )
    }
    req.body = result.data
    next()
  }
}
