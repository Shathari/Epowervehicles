import { useMutation } from '@tanstack/react-query'
import { submitSalesPartnerApplication } from '@/services/salesPartnerService'
import type { SalesPartnerApplicationInput } from '@/types/salesPartner'

export function useSubmitSalesPartnerApplication() {
  return useMutation({
    mutationFn: (input: SalesPartnerApplicationInput) => submitSalesPartnerApplication(input),
  })
}
