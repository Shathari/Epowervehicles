import { apiRequest, setAccessToken } from '@/services/apiClient'
import type { AuthUser, LoginInput, LoginResponse } from '@/types/auth'

export async function login(input: LoginInput): Promise<AuthUser> {
  const data = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: input,
    skipAuthRetry: true,
  })
  setAccessToken(data.accessToken)
  return data.user
}

export async function logout(): Promise<void> {
  await apiRequest<null>('/auth/logout', { method: 'POST', skipAuthRetry: true })
  setAccessToken(null)
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const data = await apiRequest<{ accessToken: string; user: AuthUser }>('/auth/refresh', {
      method: 'POST',
      skipAuthRetry: true,
    })
    setAccessToken(data.accessToken)
    return data.user
  } catch {
    return null
  }
}
