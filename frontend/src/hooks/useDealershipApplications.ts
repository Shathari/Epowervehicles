import { useMutation } from '@tanstack/react-query'
import { submitDealershipApplication } from '@/services/dealershipService'
import type { DealershipApplicationInput } from '@/types/dealership'

export function useSubmitDealershipApplication() {
  return useMutation({
    mutationFn: (input: DealershipApplicationInput) => submitDealershipApplication(input),
  })
}
