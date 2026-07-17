import type { Request, Response } from 'express'
import * as productService from '../services/productService.ts'
import { ok } from '../utils/respond.ts'
import { AppError } from '../utils/AppError.ts'
import type {
  CreateProductInput,
  ReplaceProductInput,
  UpdateProductInput,
} from '../validators/productValidators.ts'

export async function list(req: Request, res: Response) {
  const includeInactive = req.user?.role === 'ADMIN'
  const { items, meta } = await productService.listProducts(req.query, includeInactive)
  ok(res, { items, ...meta })
}

export async function getById(req: Request<{ id: string }>, res: Response) {
  const product = await productService.getProductById(req.params.id)
  ok(res, product)
}

export async function featured(_req: Request, res: Response) {
  const product = await productService.getFeaturedProduct()
  ok(res, product)
}

export async function create(req: Request<unknown, unknown, CreateProductInput>, res: Response) {
  const product = await productService.createProduct(req.body)
  ok(res, product, 201)
}

export async function update(
  req: Request<{ id: string }, unknown, UpdateProductInput>,
  res: Response,
) {
  const product = await productService.updateProduct(req.params.id, req.body)
  ok(res, product)
}

export async function replace(
  req: Request<{ id: string }, unknown, ReplaceProductInput>,
  res: Response,
) {
  const product = await productService.replaceProduct(req.params.id, req.body)
  ok(res, product)
}

export async function remove(req: Request<{ id: string }>, res: Response) {
  await productService.deleteProduct(req.params.id)
  ok(res, null)
}

export function uploadImage(req: Request, res: Response) {
  if (!req.file) {
    throw AppError.badRequest('No image file was uploaded.')
  }
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  ok(res, { url }, 201)
}
