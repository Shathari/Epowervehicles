import { apiRequest } from '@/services/apiClient'
import type { SiteStats } from '@/types/stats'

export function getSiteStats(): Promise<SiteStats> {
  return apiRequest<SiteStats>('/stats')
}
