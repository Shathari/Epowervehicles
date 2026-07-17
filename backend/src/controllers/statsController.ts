import type { Request, Response } from 'express'
import * as statsService from '../services/statsService.ts'
import { ok } from '../utils/respond.ts'
import type { UpdateStatsInput } from '../validators/statsValidators.ts'

export async function get(_req: Request, res: Response) {
  const stats = await statsService.getStats()
  ok(res, stats)
}

export async function update(req: Request<unknown, unknown, UpdateStatsInput>, res: Response) {
  const stats = await statsService.updateStats(req.body)
  ok(res, stats)
}
