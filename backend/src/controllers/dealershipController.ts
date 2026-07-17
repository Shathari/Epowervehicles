import type { Request, Response } from 'express'
import * as dealershipService from '../services/dealershipService.ts'
import { notifyNewSubmission } from '../services/mailService.ts'
import { ok } from '../utils/respond.ts'
import type {
  CreateDealershipApplicationInput,
  ReplaceDealershipApplicationInput,
} from '../validators/dealershipValidators.ts'
import type { LeadStatus } from '../types.ts'

export async function list(req: Request, res: Response) {
  const { items, meta } = await dealershipService.listDealershipApplications(req.query)
  ok(res, { items, ...meta })
}

export async function getById(req: Request<{ id: string }>, res: Response) {
  const application = await dealershipService.getDealershipApplicationById(req.params.id)
  ok(res, application)
}

export async function create(
  req: Request<unknown, unknown, CreateDealershipApplicationInput>,
  res: Response,
) {
  const application = await dealershipService.createDealershipApplication(req.body)

  void notifyNewSubmission('New Dealership Application — EPOWER Vehicles', [
    `Name: ${application.name}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone}`,
    `City: ${application.city}`,
    `Message: ${application.message}`,
  ])

  ok(res, application, 201)
}

export async function replace(
  req: Request<{ id: string }, unknown, ReplaceDealershipApplicationInput>,
  res: Response,
) {
  const application = await dealershipService.replaceDealershipApplication(req.params.id, req.body)
  ok(res, application)
}

export async function updateStatus(
  req: Request<{ id: string }, unknown, { status: LeadStatus }>,
  res: Response,
) {
  const application = await dealershipService.updateDealershipApplicationStatus(
    req.params.id,
    req.body.status,
  )
  ok(res, application)
}

export async function remove(req: Request<{ id: string }>, res: Response) {
  await dealershipService.deleteDealershipApplication(req.params.id)
  ok(res, null)
}
