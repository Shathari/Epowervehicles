import { useQuery } from '@tanstack/react-query'
import { getSiteStats } from '@/services/statsService'

export function useSiteStats() {
  return useQuery({ queryKey: ['site-stats'] as const, queryFn: getSiteStats })
}
