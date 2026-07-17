import { apiRequest } from '@/services/apiClient'
import type {
  DealershipApplication,
  DealershipApplicationInput,
  LeadStatus,
} from '@/types/dealership'

export function submitDealershipApplication(
  input: DealershipApplicationInput,
): Promise<DealershipApplication> {
  return apiRequest<DealershipApplication>('/dealership-applications', {
    method: 'POST',
    body: input,
    skipAuthRetry: true,
  })
}

export function listDealershipApplications(): Promise<DealershipApplication[]> {
  return apiRequest<DealershipApplication[]>('/dealership-applications')
}

export function updateDealershipApplicationStatus(
  id: string,
  status: LeadStatus,
): Promise<DealershipApplication> {
  return apiRequest<DealershipApplication>(`/dealership-applications/${id}`, {
    method: 'PATCH',
    body: { status },
  })
}

export function deleteDealershipApplication(id: string): Promise<null> {
  return apiRequest<null>(`/dealership-applications/${id}`, { method: 'DELETE' })
}
