export interface SiteStats {
  id: string
  vehiclesSold: number
  dealersCount: number
  statesCovered: number
  updatedAt: string
}

export interface SiteStatsInput {
  vehiclesSold?: number
  dealersCount?: number
  statesCovered?: number
}
