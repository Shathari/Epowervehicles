import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteDealershipApplication,
  listDealershipApplications,
  submitDealershipApplication,
  updateDealershipApplicationStatus,
} from '@/services/dealershipService'
import type { DealershipApplicationInput, LeadStatus } from '@/types/dealership'

const LEADS_KEY = ['dealership-applications'] as const

export function useDealershipApplications() {
  return useQuery({ queryKey: LEADS_KEY, queryFn: listDealershipApplications })
}

export function useSubmitDealershipApplication() {
  return useMutation({
    mutationFn: (input: DealershipApplicationInput) => submitDealershipApplication(input),
  })
}

export function useUpdateDealershipApplicationStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeadStatus }) =>
      updateDealershipApplicationStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: LEADS_KEY }),
  })
}

export function useDeleteDealershipApplication() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteDealershipApplication(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: LEADS_KEY }),
  })
}
