import type { Request, Response } from 'express'
import * as contactService from '../services/contactService.ts'
import { notifyNewSubmission } from '../services/mailService.ts'
import { ok } from '../utils/respond.ts'
import type {
  CreateContactMessageInput,
  ReplaceContactMessageInput,
} from '../validators/contactValidators.ts'
import type { MessageStatus } from '../types.ts'

export async function list(req: Request, res: Response) {
  const { items, meta } = await contactService.listContactMessages(req.query)
  ok(res, { items, ...meta })
}

export async function getById(req: Request<{ id: string }>, res: Response) {
  const message = await contactService.getContactMessageById(req.params.id)
  ok(res, message)
}

export async function create(
  req: Request<unknown, unknown, CreateContactMessageInput>,
  res: Response,
) {
  const message = await contactService.createContactMessage(req.body)

  void notifyNewSubmission('New Contact Message — EPOWER Vehicles', [
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    `Phone: ${message.phone}`,
    `Message: ${message.message}`,
  ])

  ok(res, message, 201)
}

export async function replace(
  req: Request<{ id: string }, unknown, ReplaceContactMessageInput>,
  res: Response,
) {
  const message = await contactService.replaceContactMessage(req.params.id, req.body)
  ok(res, message)
}

export async function updateStatus(
  req: Request<{ id: string }, unknown, { status: MessageStatus }>,
  res: Response,
) {
  const message = await contactService.updateContactMessageStatus(req.params.id, req.body.status)
  ok(res, message)
}

export async function remove(req: Request<{ id: string }>, res: Response) {
  await contactService.deleteContactMessage(req.params.id)
  ok(res, null)
}
