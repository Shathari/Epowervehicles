import { z } from 'zod'

const contentItemSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(1000),
})

export const updateAboutSchema = z.object({
  heroTitle: z.string().trim().max(200).optional(),
  heroSubtitle: z.string().trim().max(200).optional(),
  companyIntro: z.string().trim().max(4000).optional(),
  missionText: z.string().trim().max(2000).optional(),
  visionText: z.string().trim().max(2000).optional(),
  coreValues: z.array(contentItemSchema).max(20).optional(),
  servicesIntro: z.string().trim().max(500).optional(),
  services: z.array(contentItemSchema).max(20).optional(),
  environmentalImpact: z.string().trim().max(4000).optional(),
})

export type ContentItem = z.infer<typeof contentItemSchema>
export type UpdateAboutInput = z.infer<typeof updateAboutSchema>
