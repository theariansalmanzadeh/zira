/* Generated from the CMS Public tag.
 * https://api.bonksaz.ir/api/v1/public/docs/
 */

export type PublicCmsPageParams = {
    page?: number
    page_size?: number
    query?: string | null
}

export type ListPublicPromosParams = PublicCmsPageParams & {
    placement?: PromoPlacementEnum | null
}

export type ListPublicBlogPostsParams = PublicCmsPageParams & {
    kind?: BlogPostKindEnum | null
    category_slug?: string | null
    tag_slug?: string | null
}

export type ListPublicFaqItemsParams = PublicCmsPageParams & {
    category_id?: string | null
}

export type ListPublicCertificatesParams = PublicCmsPageParams & {
    category?: CertificateCategoryEnum | null
}

export type BannerPositionEnum = 'RIGHT' | 'LEFT_TOP' | 'LEFT_BOTTOM'
export type BlogPostKindEnum = 'ARTICLE' | 'NEWS'
export type CertificateCategoryEnum = 'CERTIFICATE' | 'LICENSE'
export type CertificateFileTypeEnum = 'PDF' | 'IMAGE'
export type HomeBlockTypeEnum =
    | 'SLIDESHOW'
    | 'MAIN_BANNER'
    | 'NEW_ARRIVALS'
    | 'BEST_SELLERS'
    | 'BRAND_INTRO'
    | 'CTA'
    | 'COLLECTION_INTRO'
    | 'SPECIAL_OFFERS'
    | 'PROMO_MESSAGE'
export type PromoPlacementEnum = 'TOP_BAR' | 'HOME_MIDDLE' | 'FOOTER'
export type SocialPlatformEnum =
    | 'INSTAGRAM'
    | 'TELEGRAM'
    | 'WHATSAPP'
    | 'WEBSITE'
    | 'EITAA'
    | 'BALE'
    | 'RUBIKA'
export type StaticPageCodeEnum = 'ABOUT' | 'COOPERATION' | 'B2B_TERMS'

export type LabeledValueOut = {
    label: string
    value: string
}

export type PaginationOut_PublicBlogCategoryOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<PublicBlogCategoryOut>
}

export type PaginationOut_PublicBlogPostCardOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<PublicBlogPostCardOut>
}

export type PaginationOut_PublicBlogTagOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<PublicBlogTagOut>
}

export type PaginationOut_PublicCertificateOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<PublicCertificateOut>
}

export type PaginationOut_PublicFaqCategoryOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<PublicFaqCategoryOut>
}

export type PaginationOut_PublicFaqItemOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<PublicFaqItemOut>
}

export type PaginationOut_PublicHomeBlockOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<PublicHomeBlockOut>
}

export type PaginationOut_PublicPromoOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<PublicPromoOut>
}

export type PublicBannerOut = {
    id: string
    name: string
    image_url?: string | null
    alt_text?: string
    position: BannerPositionEnum
    item_id?: string | null
    cta_label?: string
    target_url?: string
}

export type PublicBlockItemOut = {
    item_id: string
    code: string
    display_name: string
    display_expires_at?: string | null
}

export type PublicBlogCategoryOut = {
    name: string
    slug: string
    sort_order?: number
    post_count?: number
}

export type PublicBlogImageOut = {
    id: string
    url: string | null
    sort_order: number
}

export type PublicBlogPostCardOut = {
    title: string
    slug: string
    summary: string
    kind: BlogPostKindEnum
    kind_display: string
    subject: string
    cover_url: string | null
    author_name: string
    published_at: string | null
    category: PublicBlogCategoryOut | null
    tags: Array<PublicBlogTagOut>
    images: Array<PublicBlogImageOut>
}

export type PublicBlogPostDetailOut = {
    title: string
    slug: string
    summary: string
    kind: BlogPostKindEnum
    kind_display: string
    subject: string
    cover_url: string | null
    author_name: string
    published_at: string | null
    category: PublicBlogCategoryOut | null
    tags: Array<PublicBlogTagOut>
    content: string
    source: string
    meta_title: string
    meta_description: string
    absolute_url: string
    images: Array<PublicBlogImageOut>
    view_count: number
}

export type PublicBlogTagOut = {
    name: string
    slug: string
    post_count?: number
}

export type PublicBrandHistoryOut = {
    year: string
    title: string
    description?: string
}

export type PublicBrandShowcaseOut = {
    id: string
    name: string
    latin_name?: string
    logo_url?: string | null
    tagline?: string
    intro?: string
    is_main?: boolean
    catalog_brand_id?: string | null
    history?: Array<PublicBrandHistoryOut>
}

export type PublicCertificateOut = {
    id: string
    category: CertificateCategoryEnum
    title: string
    issuer: string
    document_no: string
    issued_on: string
    expires_on?: string | null
    is_expired: boolean
    description: string
    file_type: CertificateFileTypeEnum
    file_url?: string | null
}

export type PublicContactInfoOut = {
    phone_numbers?: Array<LabeledValueOut>
    mobile_numbers?: Array<LabeledValueOut>
    working_hours?: string
    address?: string
    email?: string
    latitude?: string | null
    longitude?: string | null
    social_links?: Array<PublicSocialLinkOut>
}

export type PublicCooperationPageOut = {
    page: StaticPageCodeEnum
    slug: string
    title: string
    content: string
    published_at?: string | null
    sections?: Array<PublicPageSectionOut>
    guide?: PublicPageGuideOut | null
}

export type PublicCtaOut = {
    id: string
    title: string
    button_label: string
    target_url?: string
    description?: string
    steps?: Array<PublicCtaStepOut>
}

export type PublicCtaStepOut = {
    title: string
    description?: string
}

export type PublicFaqCategoryOut = {
    id: string
    name: string
    sort_order: number
    item_count?: number
}

export type PublicFaqItemOut = {
    id: string
    category_id: string
    category_name: string
    question: string
    answer: string
    sort_order: number
}

export type PublicHomeBlockOut = {
    id: string
    block_type: HomeBlockTypeEnum
    title?: string
    body_text?: string
    cta_label?: string
    cta_url?: string
    sort_order?: number
    slides?: Array<PublicSlideOut>
    banners?: Array<PublicBannerOut>
    items?: Array<PublicBlockItemOut>
    ctas?: Array<PublicCtaOut>
    brands?: Array<PublicBrandShowcaseOut>
    promos?: Array<PublicPromoOut>
}

export type PublicPageGuideOut = {
    caption?: string
    url: string
}

export type PublicPageSectionOut = {
    id: string
    title: string
    body: string
}

export type PublicPromoOut = {
    id: string
    title: string
    text: string
    placement: PromoPlacementEnum
    cta_label?: string
    cta_url?: string
    starts_at?: string | null
    ends_at?: string | null
}

export type PublicSlideOut = {
    id: string
    name: string
    image_url?: string | null
    alt_text?: string
    body_text?: string
    item_id?: string | null
    cta_label?: string
    cta_url?: string
}

export type PublicSocialLinkOut = {
    platform: SocialPlatformEnum
    platform_display: string
    url: string
    sort_order: number
}

export type PublicStaticPageOut = {
    page: StaticPageCodeEnum
    slug: string
    title: string
    content: string
    published_at?: string | null
    sections?: Array<PublicPageSectionOut>
}
