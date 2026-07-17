import { useQuery } from '@tanstack/react-query'
import { getAboutContent } from '@/services/aboutService'

export function useAboutContent() {
  return useQuery({ queryKey: ['about-content'] as const, queryFn: getAboutContent })
}
