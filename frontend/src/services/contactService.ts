import { apiRequest } from '@/services/apiClient'
import type { ContactMessage, ContactMessageInput } from '@/types/contact'

export function submitContactMessage(input: ContactMessageInput): Promise<ContactMessage> {
  return apiRequest<ContactMessage>('/contact-messages', {
    method: 'POST',
    body: input,
  })
}
