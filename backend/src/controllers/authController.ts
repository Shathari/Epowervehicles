import type { Request, Response } from 'express'
import { getUserById, verifyCredentials } from '../services/authService.ts'
import {
  REFRESH_TOKEN_COOKIE,
  refreshCookieMaxAgeMs,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.ts'
import { AppError } from '../utils/AppError.ts'
import { ok } from '../utils/respond.ts'
import { isProduction } from '../config/env.ts'
import type { LoginInput } from '../validators/authValidators.ts'

function setRefreshCookie(res: Response, token: string) {
  res.cookie(REFRESH_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: refreshCookieMaxAgeMs(),
    path: '/api/auth',
  })
}

export async function login(req: Request<unknown, unknown, LoginInput>, res: Response) {
  const { email, password } = req.body

  const user = await verifyCredentials(email, password)
  if (!user) {
    throw AppError.unauthorized('Invalid email or password.')
  }

  const tokenPayload = { sub: user.id, email: user.email, role: user.role }
  const accessToken = signAccessToken(tokenPayload)
  const refreshToken = signRefreshToken(tokenPayload)

  setRefreshCookie(res, refreshToken)
  ok(res, { user, accessToken })
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.[REFRESH_TOKEN_COOKIE]
  if (!token) {
    throw AppError.unauthorized('No refresh token provided.')
  }

  let payload
  try {
    payload = verifyRefreshToken(token)
  } catch {
    throw AppError.unauthorized('Invalid or expired refresh token.')
  }

  const user = await getUserById(payload.sub)
  if (!user) {
    throw AppError.unauthorized('User no longer exists.')
  }

  const tokenPayload = { sub: user.id, email: user.email, role: user.role }
  const accessToken = signAccessToken(tokenPayload)
  const newRefreshToken = signRefreshToken(tokenPayload)

  setRefreshCookie(res, newRefreshToken)
  ok(res, { user, accessToken })
}

export function logout(_req: Request, res: Response) {
  res.clearCookie(REFRESH_TOKEN_COOKIE, { path: '/api/auth' })
  ok(res, null)
}
