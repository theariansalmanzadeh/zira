/* Generated from the Pricing - Admin tag. */

export type ListPricesParams = {
    /** Page number (1-indexed) */
    page?: number
    /** Number of items per page */
    page_size?: number
    /** Search keyword or text filter */
    query?: string | null
    /** فیلتر بر اساس نوع کالا (تکی یا پک) */
    is_pack?: boolean | null
}

export type ExportPricesParams = {
    /** Page number (1-indexed) */
    page?: number
    /** Number of items per page */
    page_size?: number
    /** Search keyword or text filter */
    query?: string | null
    /** فیلتر بر اساس نوع کالا (تکی یا پک) */
    is_pack?: boolean | null
}

export type PreviewItemPriceParams = {
    /** درصد تعدیل مورد نظر برای پیش‌نمایش قیمت پک */
    adjustment_pct: number | string
}

export type ListBundlePricesParams = {
    /** Page number (1-indexed) */
    page?: number
    /** Number of items per page */
    page_size?: number
    /** Search keyword or text filter */
    query?: string | null
}

export type ListPriceListsParams = {
    /** Page number (1-indexed) */
    page?: number
    /** Number of items per page */
    page_size?: number
    /** Search keyword or text filter */
    query?: string | null
    /** DRAFT | SCHEDULED | PUBLISHED | CANCELLED */
    status?: PriceListStatusEnum | null
    /** MANUAL | CONTRACT | IMPORT */
    source?: PriceListSourceEnum | null
}

export type ListPriceListLinesParams = {
    /** Page number (1-indexed) */
    page?: number
    /** Number of items per page */
    page_size?: number
    /** Search keyword or text filter */
    query?: string | null
}

export type ImportPriceListRequest = {
    file: Blob
}

export type ListContractsParams = {
    /** Page number (1-indexed) */
    page?: number
    /** Number of items per page */
    page_size?: number
    /** Search keyword or text filter */
    query?: string | null
    /** DRAFT | APPLIED | CANCELLED */
    status?: ContractStatusEnum | null
    /** INCREASE (افزایشی) | DECREASE (تخفیفی) */
    direction?: ContractDirectionEnum | null
    /** true = فقط منقضی‌ها، false = فقط معتبرها */
    expired?: boolean | null
}

export type ListDiscountsParams = {
    /** Page number (1-indexed) */
    page?: number
    /** Number of items per page */
    page_size?: number
    /** Search keyword or text filter */
    query?: string | null
    /** نوع تخفیف */
    kind?: DiscountKindEnum | null
    /** DRAFT | ACTIVE | INACTIVE | ARCHIVED */
    status?: DiscountStatusEnum | null
    /** AUTO | COUPON */
    trigger?: DiscountTriggerEnum | null
    /** SCHEDULED | RUNNING | EXPIRED (منقضی) */
    validity?: ValidityEnum | null
    branch_id?: string | null
}

export type ListCouponsParams = {
    /** Page number (1-indexed) */
    page?: number
    /** Number of items per page */
    page_size?: number
    /** Search keyword or text filter */
    query?: string | null
    /** ACTIVE | DISABLED */
    status?: CouponStatusEnum | null
    /** MANUAL | CAMPAIGN | CASHBACK */
    source?: CouponSourceEnum | null
    discount_id?: string | null
    customer_id?: string | null
    expired?: boolean | null
}

export type ExportCouponsParams = {
    /** Page number (1-indexed) */
    page?: number
    /** Number of items per page */
    page_size?: number
    /** Search keyword or text filter */
    query?: string | null
    /** ACTIVE | DISABLED */
    status?: CouponStatusEnum | null
    /** MANUAL | CAMPAIGN | CASHBACK */
    source?: CouponSourceEnum | null
    discount_id?: string | null
    customer_id?: string | null
    expired?: boolean | null
}

export type ListCampaignsParams = {
    /** Page number (1-indexed) */
    page?: number
    /** Number of items per page */
    page_size?: number
    /** Search keyword or text filter */
    query?: string | null
    /** DRAFT | PUBLISHED | DISABLED | ARCHIVED */
    status?: CampaignStatusEnum | null
    /** ماهیت */
    nature?: CampaignNatureEnum | null
    /** کانال */
    channel?: ChannelEnum | null
    /** SCHEDULED | RUNNING | ENDED */
    phase?: CampaignPhaseEnum | null
    branch_id?: string | null
}

export type UpdateCampaignBannerRequest = {
    banner: Blob
}

export type ListTaxRulesParams = {
    /** Page number (1-indexed) */
    page?: number
    /** Number of items per page */
    page_size?: number
    /** Search keyword or text filter */
    query?: string | null
}

export type GetQuoteParams = {
    item_id?: string | null
    bundle_id?: string | null
    quantity?: number | string
    customer_id?: string | null
    group_ids?: Array<string>
    /** BRONZE | SILVER | GOLD */
    cooperation_level?: CooperationLevelEnum | null
    is_first_order?: boolean
    discounts_allowed?: boolean
    branch_id?: string | null
    /** ALL | ONLINE | APP | IN_STORE */
    channel?: "ALL" | "ONLINE" | "APP" | "IN_STORE"
    /** CASH | CREDIT (خالی = نامعلوم) */
    settlement_type?: SettlementTypeEnum | null
    coupon_codes?: Array<string>
}

export type PaginationOut_PriceRowOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<PriceRowOut>
}

export type PriceRowOut = {
    item_id: string
    item_code: string
    item_name: string
    is_pack: boolean
    item_status?: string | null
    sale_price?: string | null
    adjustment_pct?: string | null
    purchase_price?: string | null
    updated_at?: string | null
}

export type PriceBulkIn = {
    /** لیست قیمت‌های کالاهای تکی (حداقل ۱ و حداکثر ۲۰۰ ردیف) */
    rows: Array<PriceBulkRowIn>
}

export type PriceBulkRowIn = {
    /** شناسه کالای تکی */
    item_id: string
    /** قیمت فروش (ریال) */
    sale_price: number | string
}

export type PriceBulkOut = {
    count: number
    results: Array<PriceRowOut>
}

export type PriceDetailOut = {
    item_id: string
    item_code: string
    item_name: string
    is_pack: boolean
    item_status?: string | null
    sale_price?: string | null
    adjustment_pct?: string | null
    purchase_price?: string | null
    updated_at?: string | null
    components?: Array<PackComponentOut> | null
    base_price?: string | null
    unpriced_component_codes?: Array<string> | null
}

export type PackComponentOut = {
    item_id: string
    code: string
    display_name: string
    quantity: string
    sale_price?: string | null
    line_total?: string | null
}

export type PriceSetIn = {
    /** قیمت فروش (ریال، فقط برای کالای تکی) */
    sale_price?: number | string | null
    /** درصد تعدیل (فقط برای پک) */
    adjustment_pct?: number | string | null
}

export type PricePreviewOut = {
    item_id: string
    base_price: string
    adjustment_pct: string
    sale_price: string
    components: Array<PackComponentOut>
    current_price?: string | null
    min_allowed_price?: string | null
    drop_limit_exceeded?: boolean
}

export type PaginationOut_BundlePriceOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<BundlePriceOut>
}

export type BundlePriceOut = {
    bundle_id: string
    bundle_code: string
    bundle_name: string
    bundle_is_active: boolean
    final_price_override?: string | null
    items_total?: string | null
    computed_price?: string | null
    effective_price?: string | null
    override_below_items_total: boolean
    line_discounts_ignored: boolean
    unpriced_item_codes: Array<string>
    lines: Array<BundleLinePriceOut>
    updated_at?: string | null
}

export type BundleLinePriceOut = {
    item_id: string
    code: string
    display_name: string
    quantity: string
    unit_price?: string | null
    line_total?: string | null
    /** PERCENT | AMOUNT */
    discount_type?: BundleDiscountTypeEnum | null
    discount_value?: string | null
    discount_amount?: string | null
    net_total?: string | null
}

export type BundleDiscountTypeEnum = "PERCENT" | "AMOUNT"

export type BundlePriceIn = {
    /** قیمت نهایی دستی (خالی = محاسبه از اقلام) */
    final_price_override?: number | string | null
    lines?: Array<BundleLineDiscountIn>
}

export type BundleLineDiscountIn = {
    item_id: string
    /** PERCENT: درصد از جمع سطر، AMOUNT: مبلغ روی جمع سطر */
    discount_type: BundleDiscountTypeEnum
    /** درصد (۰ تا ۱۰۰) یا مبلغ ریال */
    discount_value: number | string
}

export type PaginationOut_PriceListOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<PriceListOut>
}

export type PriceListOut = {
    id: string
    code: string
    name: string
    /** MANUAL | CONTRACT | IMPORT */
    source: PriceListSourceEnum
    /** DRAFT | SCHEDULED | PUBLISHED | CANCELLED */
    status: PriceListStatusEnum
    effective_from: string
    contract_id?: string | null
    contract_code?: string | null
    line_count: number
    published_at?: string | null
    created_at: string
    updated_at: string
}

export type PriceListSourceEnum = "MANUAL" | "CONTRACT" | "IMPORT"

export type PriceListStatusEnum = "DRAFT" | "SCHEDULED" | "PUBLISHED" | "CANCELLED"

export type PriceListCreateIn = {
    name: string
    /** تاریخ اثر (خالی = امروز) */
    effective_from?: string | null
    lines?: Array<PriceListLineIn>
}

export type PriceListLineIn = {
    item_id: string
    /** قیمت جدید (ریال) */
    new_price: number | string
}

export type PriceListUpdateIn = {
    name?: string | null
    effective_from?: string | null
    /** ارسال = جایگزینی کامل ردیف‌ها */
    lines?: Array<PriceListLineIn> | null
}

export type PaginationOut_PriceListLineOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<PriceListLineOut>
}

export type PriceListLineOut = {
    id: string
    item_id: string
    code: string
    display_name: string
    item_status?: string | null
    current_price?: string | null
    new_price: string
    difference?: string | null
}

export type PaginationOut_ContractOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<ContractOut>
}

export type ContractOut = {
    id: string
    code: string
    name: string
    adjustment_pct: string
    /** INCREASE | DECREASE */
    direction: ContractDirectionEnum
    /** NONE | R1000 | R10000 | R100000 */
    rounding: ContractRoundingEnum
    /** DRAFT | APPLIED | CANCELLED */
    status: ContractStatusEnum
    is_expired: boolean
    valid_from: string
    valid_to: string
    supplier_id?: string | null
    description: string
    scope_count: number
    applied_at?: string | null
    created_at: string
    updated_at: string
}

export type ContractDirectionEnum = "INCREASE" | "DECREASE"

export type ContractRoundingEnum = "NONE" | "R1000" | "R10000" | "R100000"

export type ContractStatusEnum = "DRAFT" | "APPLIED" | "ACTIVE" | "CANCELLED"

export type ContractCreateIn = {
    name: string
    /** درصد تعدیل (مثبت = افزایش، منفی = کاهش؛ صفر مجاز نیست) */
    adjustment_pct: number | string
    /** NONE | R1000 | R10000 | R100000 */
    rounding?: ContractRoundingEnum
    /** تاریخ اثر */
    valid_from: string
    /** تاریخ انقضا */
    valid_to: string
    supplier_id?: string | null
    description?: string
}

export type ContractDetailOut = {
    id: string
    code: string
    name: string
    adjustment_pct: string
    /** INCREASE | DECREASE */
    direction: ContractDirectionEnum
    /** NONE | R1000 | R10000 | R100000 */
    rounding: ContractRoundingEnum
    /** DRAFT | APPLIED | CANCELLED */
    status: ContractStatusEnum
    is_expired: boolean
    valid_from: string
    valid_to: string
    supplier_id?: string | null
    description: string
    scope_count: number
    applied_at?: string | null
    created_at: string
    updated_at: string
    scopes: Array<ContractScopeOut>
    price_lists: Array<PriceListOut>
}

export type ContractScopeOut = {
    id: string
    brand_id?: string | null
    brand_name: string
    category_id?: string | null
    category_name: string
    item_id?: string | null
    item_code: string
}

export type ContractUpdateIn = {
    name?: string | null
    adjustment_pct?: number | string | null
    /** NONE | R1000 | R10000 | R100000 */
    rounding?: ContractRoundingEnum | null
    valid_from?: string | null
    valid_to?: string | null
    supplier_id?: string | null
    description?: string | null
}

export type ContractPreviewOut = {
    contract_id: string
    matched: number
    priced: number
    unpriced_count: number
    unpriced_codes: Array<string>
    zero_price_codes: Array<string>
    truncated: boolean
    rows: Array<ContractPreviewRowOut>
}

export type ContractPreviewRowOut = {
    item_id: string
    code: string
    display_name: string
    current_price: string
    new_price: string
    difference: string
}

export type PaginationOut_DiscountOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<DiscountOut>
}

export type DiscountOut = {
    id: string
    title: string
    /** نوع تخفیف */
    kind: DiscountKindEnum
    kind_display: string
    /** PERCENT | AMOUNT | FREE_SHIPPING */
    value_type: DiscountValueTypeEnum
    value_display: string
    /** AUTO | COUPON */
    trigger: DiscountTriggerEnum
    /** ALL | CASH | CREDIT */
    payment_scope: PaymentScopeEnum
    percent?: string | null
    fixed_amount?: string | null
    /** DRAFT | ACTIVE | INACTIVE | ARCHIVED */
    status: DiscountStatusEnum
    /** SCHEDULED | RUNNING | EXPIRED */
    validity: ValidityEnum
    branch_id?: string | null
    start_at?: string | null
    end_at?: string | null
    min_qty?: string | null
    min_amount?: string | null
    max_cap?: string | null
    usage_limit?: number | null
    used_count: number
    first_order_only: boolean
    stack_with_discount: boolean
    stack_with_coupon: boolean
    created_at: string
    updated_at: string
}

export type DiscountKindEnum = "ITEM" | "ITEM_CUSTOMER" | "ITEM_TIME" | "CUSTOMER_TIME" | "ALL_THREE" | "CASH" | "CART" | "BUNDLE" | "TIERED"

export type DiscountValueTypeEnum = "PERCENT" | "AMOUNT" | "FREE_SHIPPING"

export type DiscountTriggerEnum = "AUTO" | "COUPON"

export type PaymentScopeEnum = "ALL" | "CASH" | "CREDIT"

export type DiscountStatusEnum = "DRAFT" | "ACTIVE" | "INACTIVE" | "ARCHIVED"

export type ValidityEnum = "SCHEDULED" | "RUNNING" | "EXPIRED"

export type DiscountCreateIn = {
    /** خالی = عنوان خودکار */
    title?: string | null
    /** PERCENT | AMOUNT | FREE_SHIPPING (فقط سبد) */
    value_type?: DiscountValueTypeEnum | null
    percent?: number | string | null
    /** مبلغ (کالایی: برای هر واحد؛ سبدی: کل) */
    fixed_amount?: number | string | null
    /** ALL | CASH | CREDIT */
    payment_scope?: PaymentScopeEnum | null
    first_order_only?: boolean | null
    /** خالی = همه‌ی شعب */
    branch_id?: string | null
    start_at?: string | null
    /** خالی = دائمی (برای انواع زمان‌دار الزامی) */
    end_at?: string | null
    min_qty?: number | string | null
    min_amount?: number | string | null
    /** سقف مبلغ تخفیف در هر سفارش */
    max_cap?: number | string | null
    stack_with_discount?: boolean | null
    stack_with_coupon?: boolean | null
    usage_limit?: number | null
    targets?: Array<TargetIn> | null
    audiences?: Array<AudienceIn> | null
    bundle_rule?: BundleRuleIn | null
    tiers?: Array<TierIn> | null
    /** ITEM | ITEM_CUSTOMER | ITEM_TIME | CUSTOMER_TIME | ALL_THREE | CASH | CART | BUNDLE | TIERED */
    kind: DiscountKindEnum
    /** AUTO (خودکار) | COUPON (با کد) */
    trigger?: DiscountTriggerEnum
}

export type TargetIn = {
    /** ITEM | BUNDLE | CATEGORY (دسته با زیردرخت) */
    target_type: TargetTypeEnum
    target_id: string
}

export type TargetTypeEnum = "ITEM" | "BUNDLE" | "CATEGORY"

export type AudienceIn = {
    /** CUSTOMER | GROUP | COOPERATION_LEVEL */
    audience_type: AudienceTypeEnum
    customer_id?: string | null
    customer_group_id?: string | null
    /** BRONZE | SILVER | GOLD */
    cooperation_level?: CooperationLevelEnum | null
}

export type AudienceTypeEnum = "CUSTOMER" | "GROUP" | "COOPERATION_LEVEL"

export type CooperationLevelEnum = "BRONZE" | "SILVER" | "GOLD"

export type BundleRuleIn = {
    /** تعداد خرید */
    buy_qty: number
    /** تعداد رایگان («X بخر Y رایگان») */
    free_qty?: number | null
    /** قیمت بسته («X عدد به قیمت») */
    bundle_price?: number | string | null
}

export type TierIn = {
    from_amount: number | string
    /** خالی = بدون سقف */
    to_amount?: number | string | null
    percent: number | string
}

export type DiscountDetailOut = {
    id: string
    title: string
    /** نوع تخفیف */
    kind: DiscountKindEnum
    kind_display: string
    /** PERCENT | AMOUNT | FREE_SHIPPING */
    value_type: DiscountValueTypeEnum
    value_display: string
    /** AUTO | COUPON */
    trigger: DiscountTriggerEnum
    /** ALL | CASH | CREDIT */
    payment_scope: PaymentScopeEnum
    percent?: string | null
    fixed_amount?: string | null
    /** DRAFT | ACTIVE | INACTIVE | ARCHIVED */
    status: DiscountStatusEnum
    /** SCHEDULED | RUNNING | EXPIRED */
    validity: ValidityEnum
    branch_id?: string | null
    start_at?: string | null
    end_at?: string | null
    min_qty?: string | null
    min_amount?: string | null
    max_cap?: string | null
    usage_limit?: number | null
    used_count: number
    first_order_only: boolean
    stack_with_discount: boolean
    stack_with_coupon: boolean
    created_at: string
    updated_at: string
    targets: Array<TargetOut>
    audiences: Array<AudienceOut>
    bundle_rule?: BundleRuleOut | null
    tiers: Array<TierOut>
    coupon_count: number
}

export type TargetOut = {
    /** ITEM | BUNDLE | CATEGORY */
    target_type: TargetTypeEnum
    target_id: string
    label: string
}

export type AudienceOut = {
    /** CUSTOMER | GROUP | COOPERATION_LEVEL */
    audience_type: AudienceTypeEnum
    customer_id?: string | null
    customer_group_id?: string | null
    /** BRONZE | SILVER | GOLD */
    cooperation_level?: CooperationLevelEnum | null
}

export type BundleRuleOut = {
    buy_qty: number
    free_qty?: number | null
    bundle_price?: string | null
}

export type TierOut = {
    from_amount: string
    to_amount?: string | null
    percent: string
}

export type DiscountUpdateIn = {
    /** خالی = عنوان خودکار */
    title?: string | null
    /** PERCENT | AMOUNT | FREE_SHIPPING (فقط سبد) */
    value_type?: DiscountValueTypeEnum | null
    percent?: number | string | null
    /** مبلغ (کالایی: برای هر واحد؛ سبدی: کل) */
    fixed_amount?: number | string | null
    /** ALL | CASH | CREDIT */
    payment_scope?: PaymentScopeEnum | null
    first_order_only?: boolean | null
    /** خالی = همه‌ی شعب */
    branch_id?: string | null
    start_at?: string | null
    /** خالی = دائمی (برای انواع زمان‌دار الزامی) */
    end_at?: string | null
    min_qty?: number | string | null
    min_amount?: number | string | null
    /** سقف مبلغ تخفیف در هر سفارش */
    max_cap?: number | string | null
    stack_with_discount?: boolean | null
    stack_with_coupon?: boolean | null
    usage_limit?: number | null
    targets?: Array<TargetIn> | null
    audiences?: Array<AudienceIn> | null
    bundle_rule?: BundleRuleIn | null
    tiers?: Array<TierIn> | null
    /** نوع تخفیف */
    kind?: DiscountKindEnum | null
    /** AUTO | COUPON */
    trigger?: DiscountTriggerEnum | null
}

export type CouponIssueIn = {
    /** خالی = تولید خودکار (حروف بزرگ و رقم) */
    code_text?: string | null
    /** تعداد کد (برای بیش از یکی، کد خالی بماند) */
    count?: number
    usage_limit?: number | null
    per_customer_limit?: number | null
    /** پر = کد شخصی */
    customer_id?: string | null
    expires_at?: string | null
}

export type CouponIssueOut = {
    count: number
    results: Array<CouponOut>
}

export type CouponOut = {
    id: string
    code_text: string
    discount_id: string
    discount_title: string
    /** نوع تخفیف */
    discount_kind: DiscountKindEnum
    discount_kind_display: string
    /** وضعیت تخفیف */
    discount_status: DiscountStatusEnum
    value_display: string
    min_amount?: string | null
    min_qty?: string | null
    /** ACTIVE | DISABLED */
    status: CouponStatusEnum
    status_display: string
    is_expired: boolean
    expires_at?: string | null
    used_count: number
    usage_limit?: number | null
    per_customer_limit?: number | null
    customer_id?: string | null
    /** MANUAL | CAMPAIGN | CASHBACK */
    source: CouponSourceEnum
    source_display: string
    created_at: string
}

export type CouponStatusEnum = "ACTIVE" | "DISABLED"

export type CouponSourceEnum = "MANUAL" | "CAMPAIGN" | "CASHBACK"

export type PaginationOut_CouponOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<CouponOut>
}

export type CouponCreateIn = {
    discount: DiscountCreateIn
    coupon?: CouponIssueIn
}

export type CouponUpdateIn = {
    usage_limit?: number | null
    per_customer_limit?: number | null
    customer_id?: string | null
    expires_at?: string | null
}

export type PaginationOut_CampaignOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<CampaignOut>
}

export type CampaignOut = {
    id: string
    name: string
    /** ماهیت */
    nature: CampaignNatureEnum
    nature_display: string
    /** کانال */
    channel: ChannelEnum
    /** DRAFT | PUBLISHED | DISABLED | ARCHIVED */
    status: CampaignStatusEnum
    /** SCHEDULED | RUNNING | ENDED */
    phase: CampaignPhaseEnum
    branch_id?: string | null
    starts_at: string
    ends_at: string
    budget?: string | null
    budget_used: string
    execution_cost: string
    discount_count: number
    banner_url: string
    created_at: string
    updated_at: string
}

export type CampaignNatureEnum = "DISCOUNT" | "BUNDLE" | "SALES_BOOSTER" | "OCCASION" | "GIFT" | "FIRST_PURCHASE" | "PRODUCT_LAUNCH"

export type ChannelEnum = "ALL" | "ONLINE" | "APP" | "IN_STORE"

export type CampaignStatusEnum = "DRAFT" | "PUBLISHED" | "DISABLED" | "ARCHIVED"

export type CampaignPhaseEnum = "SCHEDULED" | "RUNNING" | "ENDED"

export type CampaignCreateIn = {
    branch_id?: string | null
    goal?: string | null
    /** ALL | ONLINE | APP | IN_STORE */
    channel?: ChannelEnum | null
    budget?: number | string | null
    execution_cost?: number | string | null
    min_cart_amount?: number | string | null
    min_qty?: number | string | null
    max_discount_cap?: number | string | null
    usage_limit?: number | null
    stack_with_discount?: boolean | null
    stack_with_coupon?: boolean | null
    description?: string | null
    targets?: Array<CampaignTargetIn> | null
    audiences?: Array<AudienceIn> | null
    discount_ids?: Array<string> | null
    name: string
    /** DISCOUNT | BUNDLE | SALES_BOOSTER | OCCASION | GIFT | FIRST_PURCHASE | PRODUCT_LAUNCH */
    nature: CampaignNatureEnum
    starts_at: string
    ends_at: string
}

export type CampaignTargetIn = {
    /** ITEM | BUNDLE | CATEGORY */
    target_type: TargetTypeEnum
    target_id: string
    /** قیمت ویژه (فقط کالا) */
    special_price?: number | string | null
}

export type CampaignDetailOut = {
    id: string
    name: string
    /** ماهیت */
    nature: CampaignNatureEnum
    nature_display: string
    /** کانال */
    channel: ChannelEnum
    /** DRAFT | PUBLISHED | DISABLED | ARCHIVED */
    status: CampaignStatusEnum
    /** SCHEDULED | RUNNING | ENDED */
    phase: CampaignPhaseEnum
    branch_id?: string | null
    starts_at: string
    ends_at: string
    budget?: string | null
    budget_used: string
    execution_cost: string
    discount_count: number
    banner_url: string
    created_at: string
    updated_at: string
    goal: string
    description: string
    min_cart_amount?: string | null
    min_qty?: string | null
    max_discount_cap?: string | null
    usage_limit?: number | null
    stack_with_discount: boolean
    stack_with_coupon: boolean
    published_at?: string | null
    targets: Array<CampaignTargetOut>
    audiences: Array<AudienceOut>
    discounts: Array<DiscountOut>
}

export type CampaignTargetOut = {
    /** ITEM | BUNDLE | CATEGORY */
    target_type: TargetTypeEnum
    target_id: string
    label: string
    special_price?: string | null
}

export type CampaignUpdateIn = {
    branch_id?: string | null
    goal?: string | null
    /** ALL | ONLINE | APP | IN_STORE */
    channel?: ChannelEnum | null
    budget?: number | string | null
    execution_cost?: number | string | null
    min_cart_amount?: number | string | null
    min_qty?: number | string | null
    max_discount_cap?: number | string | null
    usage_limit?: number | null
    stack_with_discount?: boolean | null
    stack_with_coupon?: boolean | null
    description?: string | null
    targets?: Array<CampaignTargetIn> | null
    audiences?: Array<AudienceIn> | null
    discount_ids?: Array<string> | null
    name?: string | null
    /** ماهیت کمپین */
    nature?: CampaignNatureEnum | null
    starts_at?: string | null
    ends_at?: string | null
}

export type PaginationOut_TaxRuleOut_ = {
    total: number
    page: number
    page_size: number
    results: Array<TaxRuleOut>
}

export type TaxRuleOut = {
    id: string
    name: string
    vat_percent: string
    duty_percent: string
    valid_from: string
    is_exempt: boolean
    updated_at: string
}

export type TaxRuleUpdateIn = {
    name?: string | null
    vat_percent?: number | string | null
    duty_percent?: number | string | null
    valid_from?: string | null
    is_exempt?: boolean | null
}

export type QuoteOut = {
    lines: Array<QuoteLineOut>
    cart_discounts: Array<QuoteCartDiscountOut>
    coupons: Array<QuoteCouponOut>
    gross_total: string
    line_discount_total: string
    cart_discount_total: string
    discount_total: string
    net_total: string
    tax: string
    payable: string
    free_shipping: boolean
    has_unpriced: boolean
    discounts_allowed: boolean
}

export type QuoteLineOut = {
    index: number
    item_id?: string | null
    bundle_id?: string | null
    code?: string
    quantity: string
    base_unit_price?: string | null
    unit_price?: string | null
    campaign_id?: string | null
    gross: string
    net: string
    unpriced: boolean
    discounts: Array<QuoteDiscountOut>
}

export type QuoteDiscountOut = {
    discount_id: string
    title: string
    amount: string
    coupon?: string | null
}

export type QuoteCartDiscountOut = {
    discount_id: string
    title: string
    amount: string
    coupon?: string | null
    free_shipping?: boolean
}

export type QuoteCouponOut = {
    code: string
    accepted: boolean
    reason: string
    amount: string
}

export type SettlementTypeEnum = "CASH" | "CREDIT"
