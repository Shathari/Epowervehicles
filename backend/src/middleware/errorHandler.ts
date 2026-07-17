import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/AppError.ts'
import { logger } from '../utils/logger.ts'
import { isProduction } from '../config/env.ts'

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` })
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors ? { errors: err.errors } : {}),
    })
    return
  }

  logger.error({ err }, 'Unhandled error')
  res.status(500).json({
    success: false,
    message: isProduction ? 'Something went wrong. Please try again later.' : String(err),
  })
}
