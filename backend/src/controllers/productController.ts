import type { Request, Response } from 'express'
import * as productService from '../services/productService.ts'
import { ok } from '../utils/respond.ts'
import type { CreateProductInput, UpdateProductInput } from '../validators/productValidators.ts'

export async function list(req: Request, res: Response) {
  const includeInactive = req.user?.role === 'ADMIN'
  const products = await productService.listProducts(includeInactive)
  ok(res, products)
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

export async function remove(req: Request<{ id: string }>, res: Response) {
  await productService.deleteProduct(req.params.id)
  ok(res, null)
}
