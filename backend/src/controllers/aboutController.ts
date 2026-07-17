import type { Request, Response } from 'express'
import * as aboutService from '../services/aboutService.ts'
import { ok } from '../utils/respond.ts'
import type { UpdateAboutInput } from '../validators/aboutValidators.ts'

export async function get(_req: Request, res: Response) {
  const about = await aboutService.getAbout()
  ok(res, about)
}

export async function update(req: Request<unknown, unknown, UpdateAboutInput>, res: Response) {
  const about = await aboutService.updateAbout(req.body)
  ok(res, about)
}
