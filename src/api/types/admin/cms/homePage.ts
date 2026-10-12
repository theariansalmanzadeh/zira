import type { CmsPage } from './common'

export type BannerOut = {
    id: string
    name: string
    image_url: string | null
    alt_text: string
    item_id: string | null
    cta_label: string
    sort_order: number
    /** وضعیت (DRAFT: پیش‌نویس، PUBLISHED: منتشرشده، HIDDEN: مخفی، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    starts_at: string | null
    ends_at: string | null
    is_visible: boolean
    created_at: string
    updated_at: string
    /** جایگاه (RIGHT: ستون راست، LEFT_TOP: ستون چپ بالا، LEFT_BOTTOM: ستون چپ پایین) */
    position: BannerPositionEnum
    position_display: string
    target_url: string
}

export type BannerPositionEnum = "RIGHT" | "LEFT_TOP" | "LEFT_BOTTOM"

export type BannerUpdateIn = {
    name?: string | null
    position?: BannerPositionEnum | null
    alt_text?: string | null
    item_id?: string | null
    cta_label?: string | null
    target_url?: string | null
    sort_order?: number | null
    starts_at?: string | null
    ends_at?: string | null
}

export type BlockItemIn = {
    /** شناسه‌ی آیتم کاتالوگ (فعال) */
    item_id: string
    /** پایان نمایش؛ فقط و الزاماً برای فروش ویژه */
    display_expires_at?: string | null
}

export type BlockItemOut = {
    id: string
    item_id: string
    sort_order: number
    display_expires_at: string | null
    is_expired: boolean
    code: string
    display_name: string
    item_status: string
    show_in_public: boolean
    category_path: string
}

export type BlockItemsIn = {
    /** کل فهرست کالاهای بلوک به ترتیب (حداکثر ۵۰) */
    items: BlockItemIn[]
}

export type BrandHistoryIn = {
    /** سال چهاررقمی (ارقام فارسی پذیرفته می‌شود) */
    year: string
    title: string
    description?: string
}

export type BrandHistoryOut = {
    year: string
    title: string
    description: string
    sort_order: number
}

export type BrandIn = {
    name: string
    tagline?: string
    intro?: string
    /** برند اصلی؛ اولین برند خودکار اصلی می‌شود */
    is_main?: boolean
    /** پیوند اختیاری به برند کاتالوگ */
    catalog_brand_id?: string | null
    /** ترتیب نمایش */
    sort_order?: number
    history?: BrandHistoryIn[]
}

export type BrandOut = {
    id: string
    name: string
    logo_url: string | null
    tagline: string
    intro: string
    is_main: boolean
    catalog_brand_id: string | null
    sort_order: number
    /** وضعیت (DRAFT: پیش‌نویس، PUBLISHED: منتشرشده، HIDDEN: مخفی، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    history: BrandHistoryOut[]
    updated_at: string
}

export type BrandUpdateIn = {
    name?: string | null
    tagline?: string | null
    intro?: string | null
    /** true: این برند اصلی می‌شود؛ false روی برند اصلی رد می‌شود */
    is_main?: boolean | null
    catalog_brand_id?: string | null
    sort_order?: number | null
    /** در صورت ارسال، جایگزین کامل تاریخچه */
    history?: BrandHistoryIn[] | null
}

export type ContentStatusEnum = "DRAFT" | "PUBLISHED" | "HIDDEN" | "ARCHIVED"

export type CtaIn = {
    title: string
    button_label: string
    target_url?: string
    description?: string
    /** ترتیب نمایش */
    sort_order?: number
    /** مراحل (حداقل ۱، حداکثر ۲۰) */
    steps: CtaStepIn[]
}

export type CtaOut = {
    id: string
    title: string
    button_label: string
    target_url: string
    description: string
    sort_order: number
    /** وضعیت (DRAFT: پیش‌نویس، PUBLISHED: منتشرشده، HIDDEN: مخفی، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    steps: CtaStepOut[]
    updated_at: string
}

export type CtaStepIn = {
    title: string
    description?: string
}

export type CtaStepOut = {
    title: string
    description: string
    sort_order: number
}

export type CtaUpdateIn = {
    title?: string | null
    button_label?: string | null
    target_url?: string | null
    description?: string | null
    sort_order?: number | null
    /** در صورت ارسال، جایگزین کامل مراحل */
    steps?: CtaStepIn[] | null
}

export type DashboardOut = {
    home_blocks: Record<string, unknown>
    static_pages: Record<string, unknown>[]
    blog: Record<string, unknown>
    faq: Record<string, unknown>
    certificates: Record<string, unknown>
    contact_updated_at: string | null
}

export type HomeBlockOut = {
    id: string
    /** نوع بلوک (۹ نوع ثابت) */
    block_type: HomeBlockTypeEnum
    block_type_display: string
    title: string
    body_text: string
    cta_label: string
    cta_url: string
    sort_order: number
    /** وضعیت (DRAFT: پیش‌نویس، PUBLISHED: منتشرشده، HIDDEN: مخفی، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    published_at: string | null
    is_product_block: boolean
    item_count?: number
    updated_at: string
}

export type HomeBlockTypeEnum = "SLIDESHOW" | "MAIN_BANNER" | "NEW_ARRIVALS" | "BEST_SELLERS" | "BRAND_INTRO" | "CTA" | "COLLECTION_INTRO" | "SPECIAL_OFFERS" | "PROMO_MESSAGE"

export type HomeBlockUpdateIn = {
    /** عنوان بلوک */
    title?: string | null
    /** متن بلوک */
    body_text?: string | null
    /** عنوان دکمه */
    cta_label?: string | null
    /** مقصد دکمه: مسیر داخلی یا آدرس http(s) */
    cta_url?: string | null
}

export type HomePreviewOut = {
    id: string
    block_type: HomeBlockTypeEnum
    title: string
    body_text: string
    cta_label: string
    cta_url: string
    sort_order: number
    status: ContentStatusEnum
    slides: Record<string, unknown>[]
    banners: Record<string, unknown>[]
    items: Record<string, unknown>[]
    ctas: Record<string, unknown>[]
    brands: Record<string, unknown>[]
    promos: Record<string, unknown>[]
}

export type OrderIn = {
    /** شناسه‌ها به ترتیب جدید (همه‌ی موارد، هر کدام یک بار) */
    ids: string[]
}

export type PaginationOut_BannerOut_ = CmsPage<BannerOut>

export type PaginationOut_BlockItemOut_ = CmsPage<BlockItemOut>

export type PaginationOut_BrandOut_ = CmsPage<BrandOut>

export type PaginationOut_CtaOut_ = CmsPage<CtaOut>

export type PaginationOut_HomeBlockOut_ = CmsPage<HomeBlockOut>

export type PaginationOut_PromoOut_ = CmsPage<PromoOut>

export type PaginationOut_SlideOut_ = CmsPage<SlideOut>

export type PromoIn = {
    title: string
    text: string
    /** جایگاه (TOP_BAR: نوار بالا، HOME_MIDDLE: میان صفحه، FOOTER: فوتر) */
    placement: PromoPlacementEnum
    cta_label?: string
    cta_url?: string
    starts_at?: string | null
    ends_at?: string | null
}

export type PromoOut = {
    id: string
    title: string
    text: string
    placement: PromoPlacementEnum
    placement_display: string
    cta_label: string
    cta_url: string
    starts_at: string | null
    ends_at: string | null
    /** وضعیت (DRAFT: پیش‌نویس، PUBLISHED: منتشرشده، HIDDEN: مخفی، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    is_visible: boolean
    updated_at: string
}

export type PromoPlacementEnum = "TOP_BAR" | "HOME_MIDDLE" | "FOOTER"

export type PromoUpdateIn = {
    title?: string | null
    text?: string | null
    placement?: PromoPlacementEnum | null
    cta_label?: string | null
    cta_url?: string | null
    starts_at?: string | null
    ends_at?: string | null
}

export type PublishAllOut = {
    /** تعداد ردیف‌های منتشرشده به تفکیک نوع */
    counts: Record<string, number>
}

export type SlideOut = {
    id: string
    name: string
    image_url: string | null
    alt_text: string
    item_id: string | null
    cta_label: string
    sort_order: number
    /** وضعیت (DRAFT: پیش‌نویس، PUBLISHED: منتشرشده، HIDDEN: مخفی، ARCHIVED: آرشیو) */
    status: ContentStatusEnum
    status_display: string
    starts_at: string | null
    ends_at: string | null
    is_visible: boolean
    created_at: string
    updated_at: string
    body_text: string
    cta_url: string
}

export type SlideUpdateIn = {
    name?: string | null
    alt_text?: string | null
    body_text?: string | null
    item_id?: string | null
    cta_label?: string | null
    cta_url?: string | null
    sort_order?: number | null
    starts_at?: string | null
    ends_at?: string | null
}

export type ListHomeBlocksParams = {
    page?: number
    page_size?: number
    query?: string | null
    status?: ContentStatusEnum | null
}

export type BlockItemsParams = {
    page?: number
    page_size?: number
    query?: string | null
}

export type ListPromosParams = {
    page?: number
    page_size?: number
    query?: string | null
    status?: ContentStatusEnum | null
    placement?: PromoPlacementEnum | null
}

export type ListCtasParams = {
    page?: number
    page_size?: number
    query?: string | null
    status?: ContentStatusEnum | null
}

export type ListBrandsParams = {
    page?: number
    page_size?: number
    query?: string | null
    status?: ContentStatusEnum | null
}

export type ListSlidesParams = {
    page?: number
    page_size?: number
    query?: string | null
    status?: ContentStatusEnum | null
}

export type ListBannersParams = {
    page?: number
    page_size?: number
    query?: string | null
    status?: ContentStatusEnum | null
}

export type SetBrandLogoRequest = {
    logo: Blob
}

export type CreateSlideRequest = {
    name: string
    alt_text: string
    body_text: string
    item_id: string | null
    cta_label: string
    cta_url: string
    sort_order: number
    starts_at: string | null
    ends_at: string | null
    image: Blob
}

export type SetSlideImageRequest = {
    image: Blob
}

export type CreateBannerRequest = {
    name: string
    position: "RIGHT" | "LEFT_TOP" | "LEFT_BOTTOM"
    alt_text: string
    item_id: string | null
    cta_label: string
    target_url: string
    sort_order: number
    starts_at: string | null
    ends_at: string | null
    image: Blob
}

export type SetBannerImageRequest = {
    image: Blob
}
