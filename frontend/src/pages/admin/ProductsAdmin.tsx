import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from '@/hooks/useProducts'
import { productFormSchema, type ProductFormValues } from '@/forms/schemas'
import { ApiError } from '@/types/api'
import type { Product } from '@/types/product'

const categories = ['rickshaw', 'loader', 'dumper', 'scooty', 'cart', 'auto', 'custom'] as const

const emptyValues: ProductFormValues = {
  name: '',
  category: 'rickshaw',
  description: '',
  imageUrl: '/product-placeholder.svg',
  specLine: '',
  order: 0,
  isActive: true,
}

export function ProductsAdmin() {
  const { data: products, isPending, isError, refetch } = useProducts()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const deleteProduct = useDeleteProduct()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: emptyValues,
  })

  useEffect(() => {
    reset(
      editingProduct
        ? {
            name: editingProduct.name,
            category: editingProduct.category,
            description: editingProduct.description,
            imageUrl: editingProduct.imageUrl,
            specLine: editingProduct.specLine ?? '',
            order: editingProduct.order,
            isActive: editingProduct.isActive,
          }
        : emptyValues,
    )
  }, [editingProduct, reset])

  const onSubmit = async (values: ProductFormValues) => {
    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({ id: editingProduct.id, input: values })
        toast.success('Product updated')
      } else {
        await createProduct.mutateAsync(values)
        toast.success('Product created')
      }
      setEditingProduct(null)
      reset(emptyValues)
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Failed to save product.')
    }
  }

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    try {
      await deleteProduct.mutateAsync(product.id)
      toast.success('Product deleted')
      if (editingProduct?.id === product.id) setEditingProduct(null)
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Failed to delete product.')
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="mb-4 text-2xl font-bold text-brand-teal-700">Products</h1>
        {isPending && <Spinner label="Loading products…" />}
        {isError && <ErrorState message="Couldn't load products." onRetry={() => refetch()} />}
        {!isPending && !isError && products && products.length === 0 && (
          <EmptyState
            title="No products yet"
            description="Create your first product using the form."
          />
        )}
        {!isPending && !isError && products && products.length > 0 && (
          <div className="overflow-x-auto rounded-xl bg-white shadow-md shadow-slate-900/5">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 font-semibold text-slate-700">{product.name}</td>
                    <td className="px-4 py-3 capitalize text-slate-600">{product.category}</td>
                    <td className="px-4 py-3">{product.isActive ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(product)}
                        className="mr-3 font-semibold text-brand-teal-700 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product)}
                        className="font-semibold text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Card>
        <h2 className="mb-4 text-lg font-bold text-brand-teal-700">
          {editingProduct ? `Edit "${editingProduct.name}"` : 'Add a product'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <Input label="Name" {...register('name')} error={errors.name?.message} />
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="category" className="text-sm font-semibold text-slate-700">
              Category
            </label>
            <select
              id="category"
              {...register('category')}
              className="rounded-lg border border-slate-300 px-4 py-2.5 focus:border-brand-teal-600 focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <Textarea
            label="Description"
            {...register('description')}
            error={errors.description?.message}
          />
          <Input label="Image URL" {...register('imageUrl')} error={errors.imageUrl?.message} />
          <Input
            label="Spec line (optional)"
            placeholder="e.g. 80 km range · 4 passengers · 4–5 hr charge"
            {...register('specLine')}
            error={errors.specLine?.message}
          />
          <Input
            label="Display order"
            type="number"
            {...register('order', { valueAsNumber: true })}
            error={errors.order?.message}
          />
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input type="checkbox" {...register('isActive')} /> Active (visible on the public site)
          </label>
          <div className="flex gap-3">
            <Button type="submit" isLoading={isSubmitting}>
              {editingProduct ? 'Save changes' : 'Create product'}
            </Button>
            {editingProduct && (
              <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
