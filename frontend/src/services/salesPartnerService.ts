import { apiRequest } from '@/services/apiClient'
import type { SalesPartnerApplication, SalesPartnerApplicationInput } from '@/types/salesPartner'

export function submitSalesPartnerApplication(
  input: SalesPartnerApplicationInput,
): Promise<SalesPartnerApplication> {
  return apiRequest<SalesPartnerApplication>('/sales-partner-applications', {
    method: 'POST',
    body: input,
  })
}
