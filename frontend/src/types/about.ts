export interface ContentItem {
  title: string
  description: string
}

export interface AboutContent {
  id: string
  heroTitle: string
  heroSubtitle: string
  companyIntro: string
  missionText: string
  visionText: string
  coreValues: ContentItem[]
  servicesIntro: string
  services: ContentItem[]
  environmentalImpact: string
  updatedAt: string
}
