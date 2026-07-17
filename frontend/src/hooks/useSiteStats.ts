import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSiteStats, updateSiteStats } from '@/services/statsService'
import type { SiteStatsInput } from '@/types/stats'

const STATS_KEY = ['site-stats'] as const

export function useSiteStats() {
  return useQuery({ queryKey: STATS_KEY, queryFn: getSiteStats })
}

export function useUpdateSiteStats() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: SiteStatsInput) => updateSiteStats(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: STATS_KEY }),
  })
}
