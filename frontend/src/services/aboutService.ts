import { apiRequest } from '@/services/apiClient'
import type { AboutContent } from '@/types/about'

export function getAboutContent(): Promise<AboutContent> {
  return apiRequest<AboutContent>('/about')
}
