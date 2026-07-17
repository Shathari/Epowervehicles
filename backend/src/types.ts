export const ROLES = ['ADMIN'] as const
export type Role = (typeof ROLES)[number]

export const PRODUCT_CATEGORIES = [
  'rickshaw',
  'loader',
  'dumper',
  'scooty',
  'cart',
  'auto',
  'custom',
] as const
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export const LEAD_STATUSES = ['pending', 'contacted', 'approved', 'rejected'] as const
export type LeadStatus = (typeof LEAD_STATUSES)[number]

export const MESSAGE_STATUSES = ['unread', 'read', 'responded'] as const
export type MessageStatus = (typeof MESSAGE_STATUSES)[number]
