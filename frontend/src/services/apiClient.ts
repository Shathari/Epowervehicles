import { ApiError, type ApiResponse } from '@/types/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api'

let accessToken: string | null = null
let refreshPromise: Promise<string | null> | null = null

export function setAccessToken(token: string | null) {
  accessToken = token
}

export function getAccessToken() {
  return accessToken
}

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) return null
        const body = (await res.json()) as ApiResponse<{ accessToken: string }>
        if (!body.success) return null
        accessToken = body.data.accessToken
        return accessToken
      })
      .catch(() => null)
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
  skipAuthRetry?: boolean
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, skipAuthRetry, headers, ...rest } = options

  const doFetch = async () =>
    fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })

  let res = await doFetch()

  if (res.status === 401 && !skipAuthRetry) {
    const newToken = await refreshAccessToken()
    if (newToken) {
      res = await doFetch()
    }
  }

  const isJson = res.headers.get('content-type')?.includes('application/json')
  const payload = isJson ? ((await res.json()) as ApiResponse<T>) : null

  if (!res.ok || !payload || !payload.success) {
    const message = payload && !payload.success ? payload.message : res.statusText
    const errors = payload && !payload.success ? payload.errors : undefined
    throw new ApiError(message || 'Request failed', res.status, errors)
  }

  return payload.data
}
