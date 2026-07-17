import { apiRequest } from '@/services/apiClient'
import type { SiteStats, SiteStatsInput } from '@/types/stats'

export function getSiteStats(): Promise<SiteStats> {
  return apiRequest<SiteStats>('/stats')
}

export function updateSiteStats(input: SiteStatsInput): Promise<SiteStats> {
  return apiRequest<SiteStats>('/stats', { method: 'PATCH', body: input })
}
