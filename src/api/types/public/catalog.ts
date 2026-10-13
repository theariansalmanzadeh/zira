/* Generated from the Catalog Public tag.
 * https://api.bonksaz.ir/api/v1/public/docs/
 */

export type BasicCategory = {
    slug: string
    name: string
}

export type BasicColor = {
    code: string
    name: string
    hex_code: string
}

export type BasicSize = {
    code: string
    name: string
}

export type NamedEntity = {
    id: string
    name: string
}

export type CurrencyEnum = 'IRR'

export type MoneyOut = {
    amount: string
    currency?: CurrencyEnum
}

export type SaleModeEnum = 'AVAILABLE' | 'PRESALE' | 'PREORDER'

export type RibbonToneEnum = 'info' | 'warning' | 'success' | 'danger'

export type SupplyStatusEnum = 'UNKNOWN' | 'KNOWN' | 'UNAVAILABLE'

export type ItemImageKind = 'DIGIKALA' | 'MANNEQUIN' | 'HUMAN'

export type ItemVariationPattern =
    | 'FIXED_COLOR'
    | 'FIXED_SIZE'
    | 'FREE'
    | 'STANDARD'
    | 'SIZE_ONLY'
    | 'COLOR_ONLY'

export type FacetKindEnum = 'brand' | 'material' | 'size' | 'color' | 'label'

export type StorefrontSortEnum =
    | 'newest'
    | 'name'
    | 'name-asc'
    | 'price-asc'
    | 'price-desc'
    | 'popular'
    | 'bestselling'

export type ItemRelationKind = 'RELATED' | 'SIMILAR'

export type PriceSummaryOut = {
    original_price?: MoneyOut | null
    final_price?: MoneyOut | null
    is_inquiry?: boolean
    discount_percent?: string | null
    discount_note?: string | null
}

export type SupplyOut = {
    status?: SupplyStatusEnum
    sale_mode?: SaleModeEnum | null
    can_order?: boolean
    reason_code?: string | null
}

export type CommercialUnitOut = {
    id: string
    code: string
    name: string
    factor: string
    base_unit_id?: string | null
}

export type ImageOut = {
    id?: string | null
    url?: string | null
    kind?: ItemImageKind
    is_primary?: boolean
    sort_order?: number
}

export type PackComponentOut = {
    component_item_id: string
    size_code: string
    size_name: string
    color_code: string
    color_name: string
    quantity: string
    unit?: CommercialUnitOut | null
}

export type StorefrontItemOut = {
    id: string
    code: string
    sku: string
    base_code: string
    display_name: string
    size?: BasicSize | null
    color?: BasicColor | null
    grade: number
    unit?: CommercialUnitOut | null
    allow_preorder?: boolean
    is_pack: boolean
    pack_size?: number | string
    variation_pattern?: ItemVariationPattern | null
    components?: PackComponentOut[]
    min_order_qty?: number | string
    max_order_qty?: number | string | null
    max_preorder_qty?: number | string | null
    price_summary?: PriceSummaryOut | null
    supply?: SupplyOut
    sale_mode?: SaleModeEnum | null
    description?: string
    images?: ImageOut[]
    specs?: Record<string, unknown>[]
    attributes?: Record<string, unknown>[]
    labels?: string[]
    seasons?: string[]
}

export type CardOut = {
    id: string
    slug: string
    code: string
    name: string
    base_code: string
    brand: NamedEntity | null
    category: BasicCategory | null
    material: NamedEntity | null
    cover_url?: string | null
    colors?: BasicColor[]
    sizes?: string[]
    labels?: string[]
    has_packs?: boolean
    sale_mode?: SaleModeEnum | null
    price_summary?: PriceSummaryOut
    supply?: SupplyOut
    capacity_percentage?: number | null
    ribbon?: string | null
    ribbon_tone?: RibbonToneEnum | null
    created_at: string
}

export type PDPOut = CardOut & {
    category_path?: BasicCategory[]
    model_line?: NamedEntity | null
    attributes?: Record<string, unknown>[]
    items?: StorefrontItemOut[]
}

export type StorefrontCategoryOut = {
    slug: string
    name: string
    parent_slug?: string | null
    product_count: number
    sort_order?: number
}

export type FacetItemOut = {
    id?: string | null
    code?: string | null
    name: string
    hex_code?: string | null
}

export type PaginationOut<T> = {
    total: number
    page: number
    page_size: number
    results: T[]
}

export type PaginationOut_StorefrontCategoryOut_ = PaginationOut<StorefrontCategoryOut>
export type PaginationOut_FacetItemOut_ = PaginationOut<FacetItemOut>
export type PaginationOut_CardOut_ = PaginationOut<CardOut>

export type StorefrontCategoryDetailOut = {
    slug: string
    name: string
    description?: string
    breadcrumb: BasicCategory[]
    children: PaginationOut_StorefrontCategoryOut_
}

export type ListPublicCategoriesParams = {
    /** Page number (1-indexed) */
    page?: number
    /** Number of items per page */
    page_size?: number
    query?: string | null
    parent_slug?: string | null
}

export type GetPublicCategoryParams = ListPublicCategoriesParams

export type ListPublicFacetsParams = {
    page?: number
    page_size?: number
    query?: string | null
    /** Facet kind: brand, material, size, color, label */
    kind?: FacetKindEnum
    category?: string | null
    category_slugs?: string[] | null
    sale_modes?: SaleModeEnum[] | SaleModeEnum | null
    brand_ids?: string[] | null
    material_ids?: string[] | null
    label_ids?: string[] | null
    season_ids?: string[] | null
    sizes?: string[] | null
    colors?: string[] | null
}

export type ListPublicProductsParams = {
    page?: number
    page_size?: number
    query?: string | null
    q?: string | null
    search_query?: string | null
    category?: string | null
    category_slugs?: string[] | null
    sale_modes?: SaleModeEnum[] | SaleModeEnum | null
    brand_ids?: string[] | null
    material_ids?: string[] | null
    label_ids?: string[] | null
    season_ids?: string[] | null
    sizes?: string[] | null
    colors?: string[] | null
    sort?: StorefrontSortEnum
}

export type ListPublicRelatedProductsParams = {
    page?: number
    page_size?: number
    query?: string | null
    /** Relation kind: SIMILAR or RELATED */
    kind?: ItemRelationKind
}
