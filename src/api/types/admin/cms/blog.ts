import type { CmsPage } from './common'

export type BlogCategoryIn = {
    name: string
    sort_order?: number
}

export type BlogCategoryOut = {
    id: string
    name: string
    slug: string
    sort_order: number
    is_active: boolean
    post_count?: number
}

export type BlogCategoryUpdateIn = {
    name?: string | null
    sort_order?: number | null
}

export type BlogImageOut = {
    id: string
    url: string | null
    sort_order: number
}

export type BlogPostDetailOut = {
    id: string
    article_code: string
    kind: BlogPostKindEnum
    kind_display: string
    title: string
    slug: string
    subject: string
    category_id: string | null
    category_name: string | null
    tags: string[]
    author_name: string
    source: string
    view_count: number
    /** وضعیت (DRAFT: پیش‌نویس، PUBLISHED: منتشرشده، HIDDEN: مخفی، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    published_at: string | null
    cover_url: string | null
    image_count?: number
    created_at: string
    updated_at: string
    summary: string
    content: string
    meta_title: string
    meta_description: string
    author_id: string | null
    absolute_url: string
    images: BlogImageOut[]
}

export type BlogPostIn = {
    /** نوع (ARTICLE: مقاله، NEWS: خبر) */
    kind?: BlogPostKindEnum
    title: string
    /** خالی: از روی عنوان ساخته می‌شود */
    slug?: string | null
    subject?: string
    summary?: string
    /** متن قالب‌دار (HTML پاک‌سازی می‌شود) */
    content?: string
    category_id?: string | null
    /** نام برچسب‌ها (حداکثر ۲۰، هر کدام تا ۵۰ نویسه) */
    tags?: string[]
    author_name?: string
    source?: string
    meta_title?: string
    meta_description?: string
}

export type BlogPostKindEnum = "ARTICLE" | "NEWS"

export type BlogPostListOut = {
    id: string
    article_code: string
    kind: BlogPostKindEnum
    kind_display: string
    title: string
    slug: string
    subject: string
    category_id: string | null
    category_name: string | null
    tags: string[]
    author_name: string
    source: string
    view_count: number
    /** وضعیت (DRAFT: پیش‌نویس، PUBLISHED: منتشرشده، HIDDEN: مخفی، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    published_at: string | null
    cover_url: string | null
    image_count?: number
    created_at: string
    updated_at: string
}

export type BlogPostUpdateIn = {
    kind?: BlogPostKindEnum | null
    title?: string | null
    /** خالی یا null: از روی عنوان دوباره ساخته می‌شود */
    slug?: string | null
    subject?: string | null
    summary?: string | null
    content?: string | null
    category_id?: string | null
    tags?: string[] | null
    author_name?: string | null
    source?: string | null
    meta_title?: string | null
    meta_description?: string | null
}

export type BlogTagOut = {
    id: string
    name: string
    slug: string
    post_count?: number
}

export type ContentStatusEnum = "DRAFT" | "PUBLISHED" | "HIDDEN" | "ARCHIVED"

export type PaginationOut_BlogCategoryOut_ = CmsPage<BlogCategoryOut>

export type PaginationOut_BlogPostListOut_ = CmsPage<BlogPostListOut>

export type PaginationOut_BlogTagOut_ = CmsPage<BlogTagOut>

export type ListBlogCategoriesParams = {
    page?: number
    page_size?: number
    query?: string | null
    is_active?: boolean | null
}

export type ListBlogTagsParams = {
    page?: number
    page_size?: number
    query?: string | null
}

export type ListPostsParams = {
    page?: number
    page_size?: number
    query?: string | null
    status?: ContentStatusEnum | null
    kind?: BlogPostKindEnum | null
    category_id?: string | null
    tag_id?: string | null
}

export type ExportPostsParams = {
    page?: number
    page_size?: number
    query?: string | null
    status?: ContentStatusEnum | null
    kind?: BlogPostKindEnum | null
    category_id?: string | null
    tag_id?: string | null
}

export type SetPostCoverRequest = {
    image: Blob
}

export type SetPostImagesRequest = {
    rows: string
    files: Blob[]
}
