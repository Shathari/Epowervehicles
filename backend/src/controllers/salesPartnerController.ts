import type { Request, Response } from 'express'
import * as salesPartnerService from '../services/salesPartnerService.ts'
import { notifyNewSubmission } from '../services/mailService.ts'
import { ok } from '../utils/respond.ts'
import type {
  CreateSalesPartnerApplicationInput,
  ReplaceSalesPartnerApplicationInput,
} from '../validators/salesPartnerValidators.ts'
import type { LeadStatus } from '../types.ts'

export async function list(req: Request, res: Response) {
  const { items, meta } = await salesPartnerService.listSalesPartnerApplications(req.query)
  ok(res, { items, ...meta })
}

export async function getById(req: Request<{ id: string }>, res: Response) {
  const application = await salesPartnerService.getSalesPartnerApplicationById(req.params.id)
  ok(res, application)
}

export async function create(
  req: Request<unknown, unknown, CreateSalesPartnerApplicationInput>,
  res: Response,
) {
  const application = await salesPartnerService.createSalesPartnerApplication(req.body)

  void notifyNewSubmission('New Sales Partner Application — EPOWER Vehicles', [
    `Name: ${application.fullName}`,
    `WhatsApp: ${application.whatsappNumber}`,
    application.email ? `Email: ${application.email}` : '',
    `City: ${application.city}`,
    `State: ${application.state}`,
    `Experience: ${application.experience}`,
  ])

  ok(res, application, 201)
}

export async function replace(
  req: Request<{ id: string }, unknown, ReplaceSalesPartnerApplicationInput>,
  res: Response,
) {
  const application = await salesPartnerService.replaceSalesPartnerApplication(
    req.params.id,
    req.body,
  )
  ok(res, application)
}

export async function updateStatus(
  req: Request<{ id: string }, unknown, { status: LeadStatus }>,
  res: Response,
) {
  const application = await salesPartnerService.updateSalesPartnerApplicationStatus(
    req.params.id,
    req.body.status,
  )
  ok(res, application)
}

export async function remove(req: Request<{ id: string }>, res: Response) {
  await salesPartnerService.deleteSalesPartnerApplication(req.params.id)
  ok(res, null)
}
