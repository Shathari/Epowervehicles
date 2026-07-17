import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteContactMessage,
  listContactMessages,
  submitContactMessage,
  updateContactMessageStatus,
} from '@/services/contactService'
import type { ContactMessageInput, MessageStatus } from '@/types/contact'

const MESSAGES_KEY = ['contact-messages'] as const

export function useContactMessages() {
  return useQuery({ queryKey: MESSAGES_KEY, queryFn: listContactMessages })
}

export function useSubmitContactMessage() {
  return useMutation({
    mutationFn: (input: ContactMessageInput) => submitContactMessage(input),
  })
}

export function useUpdateContactMessageStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: MessageStatus }) =>
      updateContactMessageStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MESSAGES_KEY }),
  })
}

export function useDeleteContactMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteContactMessage(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MESSAGES_KEY }),
  })
}
