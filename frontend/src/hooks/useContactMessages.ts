import { useMutation } from '@tanstack/react-query'
import { submitContactMessage } from '@/services/contactService'
import type { ContactMessageInput } from '@/types/contact'

export function useSubmitContactMessage() {
  return useMutation({
    mutationFn: (input: ContactMessageInput) => submitContactMessage(input),
  })
}
