import type { LeadStatus } from '@/types/dealership'

export interface SalesPartnerApplication {
  id: string
  fullName: string
  whatsappNumber: string
  email?: string | null
  city: string
  state: string
  experience: string
  previousCompany?: string | null
  aboutYourself?: string | null
  status: LeadStatus
  createdAt: string
  updatedAt: string
}

export interface SalesPartnerApplicationInput {
  fullName: string
  whatsappNumber: string
  email?: string
  city: string
  state: string
  experience: string
  previousCompany?: string
  aboutYourself?: string
}
