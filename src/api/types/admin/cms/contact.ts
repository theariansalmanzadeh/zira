import type { CmsPage } from './common'

export type ContactInfoIn = {
    phone_numbers?: LabeledValueIn[]
    mobile_numbers?: LabeledValueIn[]
    working_hours?: string
    address?: string
    email?: string
    latitude?: number | string | null
    longitude?: number | string | null
    social_links?: SocialLinkIn[]
}

export type ContactInfoOut = {
    phone_numbers: LabeledValueOut[]
    mobile_numbers: LabeledValueOut[]
    working_hours: string
    address: string
    email: string
    latitude: string | null
    longitude: string | null
    social_links: SocialLinkOut[]
    updated_at: string
}

export type LabeledValueIn = {
    label: string
    value: string
}

export type LabeledValueOut = {
    label: string
    value: string
}

export type SocialLinkIn = {
    /** شبکه (INSTAGRAM، TELEGRAM، WHATSAPP، WEBSITE، EITAA، BALE، RUBIKA) */
    platform: SocialPlatformEnum
    url: string
}

export type SocialLinkOut = {
    /** شبکه (INSTAGRAM، TELEGRAM، WHATSAPP، WEBSITE، EITAA، BALE، RUBIKA) */
    platform: SocialPlatformEnum
    platform_display: string
    url: string
    sort_order: number
}

export type SocialPlatformEnum = "INSTAGRAM" | "TELEGRAM" | "WHATSAPP" | "WEBSITE" | "EITAA" | "BALE" | "RUBIKA"
