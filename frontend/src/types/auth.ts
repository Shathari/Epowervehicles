export type Role = 'ADMIN'

export interface AuthUser {
  id: string
  email: string
  role: Role
}

export interface LoginInput {
  email: string
  password: string
}

export interface LoginResponse {
  user: AuthUser
  accessToken: string
}
