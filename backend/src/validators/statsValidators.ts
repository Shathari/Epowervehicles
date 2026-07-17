import { z } from 'zod'

export const updateStatsSchema = z.object({
  vehiclesSold: z.number().int().min(0).optional(),
  dealersCount: z.number().int().min(0).optional(),
  statesCovered: z.number().int().min(0).optional(),
})

export type UpdateStatsInput = z.infer<typeof updateStatsSchema>
