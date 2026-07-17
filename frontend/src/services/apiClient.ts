import { ApiError, type ApiResponse } from '@/types/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api'

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
}

// This app is public-only — it never authenticates (no admin UI here; an external dashboard
// calls the protected endpoints directly with its own JWT). Plain fetch wrapper, no token/refresh
// handling needed.
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const isJson = res.headers.get('content-type')?.includes('application/json')
  const payload = isJson ? ((await res.json()) as ApiResponse<T>) : null

  if (!res.ok || !payload || !payload.success) {
    const message = payload && !payload.success ? payload.message : res.statusText
    const errors = payload && !payload.success ? payload.errors : undefined
    throw new ApiError(message || 'Request failed', res.status, errors)
  }

  return payload.data
}
