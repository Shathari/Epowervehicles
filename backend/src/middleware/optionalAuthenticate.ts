import type { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../utils/jwt.ts'

export function optionalAuthenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : null

  if (token) {
    try {
      req.user = verifyAccessToken(token)
    } catch {
      // Ignore invalid/expired tokens on optionally-authenticated routes.
    }
  }

  next()
}
