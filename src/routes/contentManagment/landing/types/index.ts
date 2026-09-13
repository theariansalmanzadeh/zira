export const LANDING_SECTION_TYPE = {
    BANNER: 'banner',
    PRODUCT_SLIDE: 'product-slide',
    BANNER_SLIDE: 'banner-slide',
    BRANDS: 'brands',
    FAQ: 'faq',
} as const

export type LandingSectionType =
    (typeof LANDING_SECTION_TYPE)[keyof typeof LANDING_SECTION_TYPE]

export const LANDING_SECTION_TYPES = Object.values(LANDING_SECTION_TYPE)

export type LandingSectionStatus = 'published' | 'draft' | 'hidden'

export type LandingSectionItem = {
    id: string
    title: string
    status: LandingSectionStatus
    type: LandingSectionType
    countLabel: string
    actionLabel: string
    updatedAt: string
}
