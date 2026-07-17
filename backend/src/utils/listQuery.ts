const DEFAULT_PAGE_SIZE = 100
const MAX_PAGE_SIZE = 100

export interface ListQueryOptions {
  defaultSortBy: string
  allowedSortBy: readonly string[]
  searchableFields?: readonly string[]
}

export interface ParsedListQuery {
  page: number
  pageSize: number
  skip: number
  take: number
  orderBy: Record<string, 'asc' | 'desc'>
  searchWhere?: { OR: Record<string, { contains: string }>[] }
}

function toPositiveInt(value: unknown, fallback: number): number {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

// Parses page/pageSize/sortBy/sortOrder/search query params the same way across every
// list endpoint. Resource-specific filters (category, status, etc.) are handled by the caller
// and merged with `searchWhere` into the final Prisma `where`.
export function parseListQuery(
  query: Record<string, unknown>,
  options: ListQueryOptions,
): ParsedListQuery {
  const page = toPositiveInt(query.page, 1)
  const pageSize = Math.min(toPositiveInt(query.pageSize, DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE)

  const sortByRaw = typeof query.sortBy === 'string' ? query.sortBy : options.defaultSortBy
  const sortBy = options.allowedSortBy.includes(sortByRaw) ? sortByRaw : options.defaultSortBy
  const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc'

  const result: ParsedListQuery = {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { [sortBy]: sortOrder },
  }

  const search = typeof query.search === 'string' ? query.search.trim() : ''
  if (search && options.searchableFields?.length) {
    result.searchWhere = {
      OR: options.searchableFields.map((field) => ({ [field]: { contains: search } })),
    }
  }

  return result
}

export function buildMeta(total: number, page: number, pageSize: number) {
  return { total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) }
}
