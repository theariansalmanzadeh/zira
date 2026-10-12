import type { CmsPage } from './common'

export type ContentStatusEnum = "DRAFT" | "PUBLISHED" | "HIDDEN" | "ARCHIVED"

export type FaqCategoryIn = {
    name: string
    sort_order?: number
}

export type FaqCategoryOut = {
    id: string
    name: string
    sort_order: number
    is_active: boolean
    item_count?: number
}

export type FaqCategoryUpdateIn = {
    name?: string | null
    sort_order?: number | null
}

export type FaqItemIn = {
    category_id: string
    question: string
    answer: string
    sort_order?: number
    is_visible?: boolean
}

export type FaqItemOut = {
    id: string
    category_id: string
    category_name: string
    question: string
    answer: string
    sort_order: number
    is_visible: boolean
    /** وضعیت (PUBLISHED: فعال، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    created_at: string
    updated_at: string
}

export type FaqItemUpdateIn = {
    category_id?: string | null
    question?: string | null
    answer?: string | null
    sort_order?: number | null
    is_visible?: boolean | null
}

export type PaginationOut_FaqCategoryOut_ = CmsPage<FaqCategoryOut>

export type PaginationOut_FaqItemOut_ = CmsPage<FaqItemOut>

export type ListFaqCategoriesParams = {
    page?: number
    page_size?: number
    query?: string | null
    is_active?: boolean | null
}

export type ListFaqItemsParams = {
    page?: number
    page_size?: number
    query?: string | null
    category_id?: string | null
    is_visible?: boolean | null
    status?: ContentStatusEnum | null
}

export type ExportFaqParams = {
    page?: number
    page_size?: number
    query?: string | null
    category_id?: string | null
    is_visible?: boolean | null
    status?: ContentStatusEnum | null
}
