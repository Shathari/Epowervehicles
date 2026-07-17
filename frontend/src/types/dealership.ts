export type LeadStatus = 'pending' | 'contacted' | 'approved' | 'rejected'

export interface DealershipApplication {
  id: string
  name: string
  email: string
  phone: string
  city: string
  message: string
  status: LeadStatus
  createdAt: string
  updatedAt: string
}

export interface DealershipApplicationInput {
  name: string
  email: string
  phone: string
  city: string
  message: string
}
