import type { CmsPage } from './common'

export type ContentStatusEnum = "DRAFT" | "PUBLISHED" | "HIDDEN" | "ARCHIVED"

export type OrderIn = {
    /** شناسه‌ها به ترتیب جدید (همه‌ی موارد، هر کدام یک بار) */
    ids: string[]
}

export type PageAssetOut = {
    id: string
    asset_type: PageAssetTypeEnum
    caption: string
    url: string | null
    updated_at: string
}

export type PageAssetTypeEnum = "GUIDE_PDF"

export type PageSectionIn = {
    title: string
    /** متن بخش (HTML پاک‌سازی می‌شود) */
    body?: string
    is_visible?: boolean
}

export type PageSectionOut = {
    id: string
    title: string
    body: string
    sort_order: number
    is_visible: boolean
    /** وضعیت (DRAFT: پیش‌نویس، PUBLISHED: منتشرشده، HIDDEN: مخفی، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    updated_at: string
}

export type PageSectionUpdateIn = {
    title?: string | null
    body?: string | null
    is_visible?: boolean | null
}

export type PaginationOut_StaticPageOut_ = CmsPage<StaticPageOut>

export type StaticPageCodeEnum = "ABOUT" | "COOPERATION" | "B2B_TERMS"

export type StaticPageDetailOut = {
    id: string
    /** صفحه (ABOUT: درباره ما، COOPERATION: همکاری با ما، B2B_TERMS: شرایط همکاری عمده) */
    page: StaticPageCodeEnum
    page_display: string
    slug: string
    title: string
    /** وضعیت (DRAFT: پیش‌نویس، PUBLISHED: منتشرشده، HIDDEN: مخفی، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    published_at: string | null
    section_count?: number
    absolute_url: string
    updated_at: string
    content: string
    sections: PageSectionOut[]
    assets: PageAssetOut[]
}

export type StaticPageOut = {
    id: string
    /** صفحه (ABOUT: درباره ما، COOPERATION: همکاری با ما، B2B_TERMS: شرایط همکاری عمده) */
    page: StaticPageCodeEnum
    page_display: string
    slug: string
    title: string
    /** وضعیت (DRAFT: پیش‌نویس، PUBLISHED: منتشرشده، HIDDEN: مخفی، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    published_at: string | null
    section_count?: number
    absolute_url: string
    updated_at: string
}

export type StaticPageUpdateIn = {
    title?: string | null
    /** متن مقدمه (HTML پاک‌سازی می‌شود) */
    content?: string | null
}

export type ListStaticPagesParams = {
    page?: number
    page_size?: number
    query?: string | null
    status?: ContentStatusEnum | null
}

export type ReplaceGuideRequest = {
    file: Blob
    caption: string
}
