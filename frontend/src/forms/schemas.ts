import { z } from 'zod'

const namePattern = /^[a-zA-Z\s'-]+$/
const phonePattern = /^[+]?[0-9\s-]{7,15}$/

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(100)
    .regex(namePattern, 'Name can only contain letters, spaces, and hyphens'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().regex(phonePattern, 'Please enter a valid phone number'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const dealershipFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(100)
    .regex(namePattern, 'Name can only contain letters, spaces, and hyphens'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().regex(phonePattern, 'Please enter a valid phone number'),
  city: z.string().trim().min(2, 'Please enter your city').max(100),
  message: z.string().trim().min(10, 'Please tell us a bit more (min. 10 characters)').max(2000),
})

export type DealershipFormValues = z.infer<typeof dealershipFormSchema>

export const SALES_EXPERIENCE_OPTIONS = [
  'Fresher (0-1 years)',
  '1-3 years',
  '3-5 years',
  '5+ years',
] as const

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
] as const

export const salesPartnerFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(100)
    .regex(namePattern, 'Name can only contain letters, spaces, and hyphens'),
  whatsappNumber: z.string().trim().regex(phonePattern, 'Please enter a valid WhatsApp number'),
  email: z
    .union([z.string().trim().email('Please enter a valid email address'), z.literal('')])
    .optional(),
  city: z.string().trim().min(2, 'Please enter your city').max(100),
  state: z.enum(INDIAN_STATES),
  experience: z.enum(SALES_EXPERIENCE_OPTIONS),
  previousCompany: z.string().trim().max(150).optional(),
  aboutYourself: z.string().trim().max(1000).optional(),
})

export type SalesPartnerFormValues = z.infer<typeof salesPartnerFormSchema>
