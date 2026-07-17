import { createContext } from 'react'
import type { AuthUser, LoginInput } from '@/types/auth'

export interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  login: (input: LoginInput) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
