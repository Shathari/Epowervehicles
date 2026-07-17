export type MessageStatus = 'unread' | 'read' | 'responded'

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  message: string
  status: MessageStatus
  createdAt: string
  updatedAt: string
}

export interface ContactMessageInput {
  name: string
  email: string
  phone: string
  message: string
}
