import { apiRequest } from '@/services/apiClient'
import type { DealershipApplication, DealershipApplicationInput } from '@/types/dealership'

export function submitDealershipApplication(
  input: DealershipApplicationInput,
): Promise<DealershipApplication> {
  return apiRequest<DealershipApplication>('/dealership-applications', {
    method: 'POST',
    body: input,
  })
}
