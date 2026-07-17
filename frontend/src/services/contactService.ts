import { apiRequest } from '@/services/apiClient'
import type { ContactMessage, ContactMessageInput, MessageStatus } from '@/types/contact'

export function submitContactMessage(input: ContactMessageInput): Promise<ContactMessage> {
  return apiRequest<ContactMessage>('/contact-messages', {
    method: 'POST',
    body: input,
    skipAuthRetry: true,
  })
}

export function listContactMessages(): Promise<ContactMessage[]> {
  return apiRequest<ContactMessage[]>('/contact-messages')
}

export function updateContactMessageStatus(
  id: string,
  status: MessageStatus,
): Promise<ContactMessage> {
  return apiRequest<ContactMessage>(`/contact-messages/${id}`, {
    method: 'PATCH',
    body: { status },
  })
}

export function deleteContactMessage(id: string): Promise<null> {
  return apiRequest<null>(`/contact-messages/${id}`, { method: 'DELETE' })
}
