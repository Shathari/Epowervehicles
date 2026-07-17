import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  fetchCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
} from '@/services/authService'
import type { AuthUser } from '@/types/auth'
import { AuthContext, type AuthContextValue } from '@/context/authContextInstance'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchCurrentUser().then((restoredUser) => {
      if (!cancelled) {
        setUser(restoredUser)
        setIsLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      login: async (input) => {
        const loggedInUser = await loginRequest(input)
        setUser(loggedInUser)
      },
      logout: async () => {
        await logoutRequest()
        setUser(null)
      },
    }),
    [user, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
