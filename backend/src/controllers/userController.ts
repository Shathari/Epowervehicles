import type { Request, Response } from 'express'
import * as userService from '../services/userService.ts'
import { ok } from '../utils/respond.ts'
import { AppError } from '../utils/AppError.ts'
import type {
  CreateUserInput,
  ReplaceUserInput,
  UpdateUserInput,
} from '../validators/userValidators.ts'

export async function list(_req: Request, res: Response) {
  const users = await userService.listUsers()
  ok(res, users)
}

export async function create(req: Request<unknown, unknown, CreateUserInput>, res: Response) {
  const user = await userService.createUser(req.body)
  ok(res, user, 201)
}

export async function replace(
  req: Request<{ id: string }, unknown, ReplaceUserInput>,
  res: Response,
) {
  const user = await userService.replaceUser(req.params.id, req.body)
  ok(res, user)
}

export async function update(
  req: Request<{ id: string }, unknown, UpdateUserInput>,
  res: Response,
) {
  const user = await userService.updateUser(req.params.id, req.body)
  ok(res, user)
}

export async function remove(req: Request<{ id: string }>, res: Response) {
  if (!req.user) throw AppError.unauthorized()
  await userService.deleteUser(req.params.id, req.user.sub)
  ok(res, null)
}
