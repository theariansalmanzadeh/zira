/** Types for the admin WMS API. */

export type ListStockParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    /** فقط یک انبار */
    warehouse_id?: string | null | null
    item_id?: string | null | null
    /** فقط ردیف‌های با موجودی مثبت */
    in_stock_only?: boolean | null
    /** فقط کالاهای کمتر از نقطه‌ی سفارش */
    below_threshold?: boolean | null
}

export type ExportStockParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    /** فقط یک انبار */
    warehouse_id?: string | null | null
    item_id?: string | null | null
    /** فقط ردیف‌های با موجودی مثبت */
    in_stock_only?: boolean | null
    /** فقط کالاهای کمتر از نقطه‌ی سفارش */
    below_threshold?: boolean | null
}

export type DashboardParams = {
    warehouse_id?: string | null | null
}

export type KardexParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    item_id: string
    warehouse_id?: string | null | null
    date_from?: string | null | null
    date_to?: string | null | null
}

export type ReservationsParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
    item_id?: string | null | null
    active_only?: boolean | null
}

export type PolicyParams = {
    item_id: string
    warehouse_id: string
}

export type PoliciesParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
}

export type LookupListParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    /** شناسه‌ی کالا؛ یا query = بارکد/کد کالا */
    item_id?: string | null | null
}

export type ReportSummaryParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    /** انبار، کالا، تأمین‌کننده، مشتری، اسناد */
    group_by?: "WAREHOUSE" | "ITEM" | "SUPPLIER" | "CUSTOMER" | "DOCUMENT" | null
    /** گزارش مبلغی (ریال) — مجوز wms.stock_reports.value.read */
    value?: boolean | null
    warehouse_id?: string | null | null
    item_id?: string | null | null
    date_from?: string | null | null
    date_to?: string | null | null
}

export type ReportLinesParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    value?: boolean | null
    warehouse_id?: string | null | null
    item_id?: string | null | null
    date_from?: string | null | null
    date_to?: string | null | null
}

export type ReportExportParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    /** انبار، کالا، تأمین‌کننده، مشتری، اسناد */
    group_by?: "WAREHOUSE" | "ITEM" | "SUPPLIER" | "CUSTOMER" | "DOCUMENT" | null
    /** گزارش مبلغی (ریال) — مجوز wms.stock_reports.value.read */
    value?: boolean | null
    warehouse_id?: string | null | null
    item_id?: string | null | null
    date_from?: string | null | null
    date_to?: string | null | null
}

export type ListZonesParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
}

export type ListBinsParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
    zone_id?: string | null | null
    is_active?: boolean | null | null
    /** true = آدرس‌های دارای کالا */
    occupied?: boolean | null | null
}

export type ItemLocationsParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
    item_id?: string | null | null
    bin_id?: string | null | null
}

export type RelocationsParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
}

export type ListOpeningsParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
    date_from?: string | null | null
    date_to?: string | null | null
}

export type ListReceiptsParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
    date_from?: string | null | null
    date_to?: string | null | null
    /** ARCHIVED = POSTED + RETURNED */
    status?: ReceiptStatusFilterEnum | null | null
}

export type ListTransfersParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
    date_from?: string | null | null
    date_to?: string | null | null
    status?: TransferStatusEnum | null | null
    /** نسبت به warehouse_id: SEND | RECEIVE */
    direction?: TransferDirectionEnum | null | null
    /** فقط انتقال‌های دریافت‌شده با کسری حمل */
    shortage_only?: boolean | null
}

export type ListScrapParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
    date_from?: string | null | null
    date_to?: string | null | null
    status?: ScrapStatusEnum | null | null
}

export type ListCountsParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
    date_from?: string | null | null
    date_to?: string | null | null
    /** OPEN = همه‌ی جاری‌ها */
    status?: CountStatusFilterEnum | null | null
}

export type CountLinesParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    /** ANY | POSITIVE | NEGATIVE */
    variance?: VarianceFilterEnum | null | null
}

export type ListBreaksParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
    date_from?: string | null | null
    date_to?: string | null | null
}

export type ListAssembliesParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
    date_from?: string | null | null
    date_to?: string | null | null
}

export type ListGradesParams = {
    /** Page number (1-indexed) */
    page?: number | null
    /** Number of items per page */
    page_size?: number | null
    /** Search keyword or text filter */
    query?: string | null | null
    warehouse_id?: string | null | null
    date_from?: string | null | null
    date_to?: string | null | null
    status?: GradeStatusEnum | null | null
}

export type AssignIn = {
    is_primary?: boolean
}

export type AssignWarehouseIn = {
    warehouse_id: string
    note?: string
}

export type BinBriefOut = {
    id: string
    full_code: string
}

export type BinDetailOut = {
    id: string
    warehouse_id: string
    zone_id: string
    zone_prefix: string
    rack: number
    shelf: number
    box: number
    full_code: string
    is_active: boolean
    item_count: number
    items: ItemLocationOut[]
}

export type BinOut = {
    id: string
    warehouse_id: string
    zone_id: string
    zone_prefix: string
    rack: number
    shelf: number
    box: number
    full_code: string
    is_active: boolean
    item_count: number
}

export type Count2ScopeEnum = "VARIANCES_ONLY" | "ALL"

export type Count2ScopeIn = {
    /** VARIANCES_ONLY | ALL */
    count2_scope: Count2ScopeEnum
}

export type CountLineIn = {
    line_id: string
    counted_quantity: number | string
    /** Σ تعدادها = تعداد شمارش‌شده */
    bins?: LineBinIn[]
}

export type CountLineOut = {
    id: string
    item: StockItemOut | null
    bin: BinBriefOut | null
    system_qty: string
    count_1: string | null
    count_1_recount: string | null
    count_2: string | null
    recount_qty: string | null
    /** آخرین شمارش − موجودی سیستم */
    current_variance?: string | null
    final_variance: string | null
    variance_sign: VarianceSignEnum | null
    /** فقط با مجوز ارزش */
    unit_cost?: string | null
}

export type CountOpenIn = {
    /** هر انبار یک انبارگردانی جدا */
    warehouse_ids: string[]
    count_date: string
    /** ALL | CATEGORIES */
    scope_type?: CountScopeEnum
    category_ids?: string[]
    responsible_id?: string | null
    description?: string
}

export type CountOut = {
    id: string
    count_no: string
    /** مرحله‌ی انبارگردانی */
    status: CountStatusEnum
    warehouse: WarehouseBriefOut | null
    /** ALL | CATEGORIES */
    scope_type: CountScopeEnum
    category_ids: string[]
    count_date: string
    responsible_id: string | null
    description: string
    snapshot_at: string | null
    variance_recount_requested: boolean
    count2_scope: Count2ScopeEnum | null
    final_recount_requested: boolean
    initially_approved_at: string | null
    finally_approved_at: string | null
    finalized_by_id: string | null
    has_minutes: boolean
    line_count: number
    created_at: string
}

export type CountPassEnum = "1" | "1R" | "2" | "FINAL"

export type CountRecordIn = {
    /** 1 | 1R (مغایرت) | 2 | FINAL (شمارش مجدد نهایی) */
    pass_no: CountPassEnum
    rows: CountRowIn[]
}

export type CountRowIn = {
    item_id: string
    counted: number | string
}

export type CountScopeEnum = "ALL" | "CATEGORIES"

export type CountStatusEnum = "DRAFT" | "COUNT_1" | "VARIANCE_1" | "COUNT_2" | "AWAITING_FINAL" | "COMPLETED" | "CANCELLED"

export type CountStatusFilterEnum = "OPEN" | "DRAFT" | "COUNT_1" | "VARIANCE_1" | "COUNT_2" | "AWAITING_FINAL" | "COMPLETED" | "CANCELLED"

export type GradeDecisionIn = {
    note?: string
}

export type GradeOut = {
    id: string
    request_no: string
    /** PENDING | APPROVED | REJECTED */
    status: GradeStatusEnum
    warehouse: WarehouseBriefOut | null
    from_item: StockItemOut | null
    from_grade: number
    to_grade: number
    to_item: StockItemOut | null
    quantity: string
    bin: BinBriefOut | null
    /** علت */
    reason: GradeReasonEnum
    note: string
    price_adjust_pct: string | null
    requested_by_id: string | null
    decided_by_id: string | null
    decided_at: string | null
    decision_note: string
    created_at: string
}

export type GradeReasonEnum = "STORAGE_DAMAGE" | "TRANSPORT" | "MANUFACTURING_DEFECT" | "OTHER"

export type GradeRequestIn = {
    warehouse_id: string
    item_id: string
    to_grade: number
    quantity: number | string
    /** STORAGE_DAMAGE | TRANSPORT | MANUFACTURING_DEFECT | OTHER */
    reason: GradeReasonEnum
    note?: string
    /** خالی = پیش‌فرض تنظیمات گرید */
    price_adjust_pct?: number | string | null
    bin_location_id?: string | null
}

export type GradeStatusEnum = "PENDING" | "APPROVED" | "REJECTED"

export type InsuranceStatusEnum = "VALID" | "PENDING" | "NONE"

export type ItemLocationOut = {
    id: string
    item: StockItemOut | null
    warehouse_id: string
    bin: BinBriefOut
    is_primary: boolean
    assigned_at: string
    /** موجودی کل کالا در این انبار (آدرس فقط محل است) */
    quantity?: string | null
}

export type ItemOpIn = {
    warehouse_id: string
    item_id: string
    /** عدد صحیح */
    quantity: number | string
    bin_location_id?: string | null
    note?: string
}

export type ItemOpOut = {
    id: string
    number: string
    warehouse: WarehouseBriefOut | null
    item: StockItemOut | null
    quantity: string
    bin: BinBriefOut | null
    note: string
    created_by_id: string | null
    occurred_at: string
}

export type KardexPageOut = {
    total: number
    page: number
    page_size: number
    /** مانده‌ی پیش از date_from */
    opening_balance: string
    results: MovementOut[]
}

export type KpiOut = {
    items_in_stock: number
    total_quantity: string
    reserved_quantity: string
    /** فقط با مجوز wms.stock_reports.value.read */
    stock_value?: string | null
    below_threshold: number
    receipts_open: number
    transfers_open: number
    scrap_pending: number
    counts_open: number
}

export type LayoutIn = {
    racks: RackIn[]
}

export type LayoutOut = {
    created: number
    codes: string[]
}

export type LineBinIn = {
    bin_location_id: string
    quantity: number | string
}

export type LineBinOut = {
    bin: BinBriefOut
    quantity: string
}

export type LookupOut = {
    item: StockItemOut | null
    total_available: string
    warehouses: LookupRowOut[]
}

export type LookupRowOut = {
    warehouse: WarehouseBriefOut | null
    quantity: string
    reserved_quantity: string
    available: string
    primary_bin: string | null
}

export type MovementOut = {
    id: string
    item: StockItemOut | null
    warehouse: WarehouseBriefOut | null
    /** نوع حرکت دفتر موجودی */
    movement_type: MovementTypeEnum
    quantity_in: string
    quantity_out: string
    /** فقط با مجوز wms.stock_reports.value.read */
    unit_price?: string | null
    /** مانده‌ی کالا در همان انبار پس از این حرکت (تعدادی یا ریالی) */
    balance?: string | null
    /** نوع سند مبنا */
    source_doc_type: SourceDocEnum
    source_doc_id: string
    source_doc_no: string
    /** نوع طرف حساب */
    party_type: PartyTypeEnum
    party_id: string | null
    party_name: string
    bin: BinBriefOut | null
    occurred_at: string
    created_by_id: string | null
}

export type MovementTypeEnum = "OPENING" | "RECEIPT" | "ISSUE" | "TRANSFER_OUT" | "TRANSFER_IN" | "CUSTOMER_RETURN" | "RETURN_OUT" | "SCRAP" | "COUNT_ADJUSTMENT" | "ITEM_BREAK_OUT" | "ITEM_BREAK_IN" | "ITEM_ASSEMBLE_OUT" | "ITEM_ASSEMBLE_IN" | "GRADE_OUT" | "GRADE_IN"

export type OpeningIn = {
    warehouse_id: string
    note?: string
    lines: OpeningLineIn[]
}

export type OpeningLineIn = {
    item_id: string
    quantity: number | string
    /** قیمت واحد (ریال) */
    unit_price?: number | string | null
    bin_location_id?: string | null
}

export type OpeningLineOut = {
    id: string
    item: StockItemOut | null
    quantity: string
    unit_price: string | null
    bin: BinBriefOut | null
}

export type OpeningOut = {
    id: string
    opening_no: string
    warehouse: WarehouseBriefOut | null
    posted_at: string
    created_by_id: string | null
    note: string
    line_count: number
    lines?: OpeningLineOut[] | null
}

export type PaginationOut_BinOut_ = {
    total: number
    page: number
    page_size: number
    results: BinOut[]
}

export type PaginationOut_CountLineOut_ = {
    total: number
    page: number
    page_size: number
    results: CountLineOut[]
}

export type PaginationOut_CountOut_ = {
    total: number
    page: number
    page_size: number
    results: CountOut[]
}

export type PaginationOut_GradeOut_ = {
    total: number
    page: number
    page_size: number
    results: GradeOut[]
}

export type PaginationOut_ItemLocationOut_ = {
    total: number
    page: number
    page_size: number
    results: ItemLocationOut[]
}

export type PaginationOut_ItemOpOut_ = {
    total: number
    page: number
    page_size: number
    results: ItemOpOut[]
}

export type PaginationOut_MovementOut_ = {
    total: number
    page: number
    page_size: number
    results: MovementOut[]
}

export type PaginationOut_OpeningOut_ = {
    total: number
    page: number
    page_size: number
    results: OpeningOut[]
}

export type PaginationOut_PolicyRowOut_ = {
    total: number
    page: number
    page_size: number
    results: PolicyRowOut[]
}

export type PaginationOut_ReceiptOut_ = {
    total: number
    page: number
    page_size: number
    results: ReceiptOut[]
}

export type PaginationOut_RelocationOut_ = {
    total: number
    page: number
    page_size: number
    results: RelocationOut[]
}

export type PaginationOut_ReservationOut_ = {
    total: number
    page: number
    page_size: number
    results: ReservationOut[]
}

export type PaginationOut_ScrapOut_ = {
    total: number
    page: number
    page_size: number
    results: ScrapOut[]
}

export type PaginationOut_StockOut_ = {
    total: number
    page: number
    page_size: number
    results: StockOut[]
}

export type PaginationOut_SummaryRowOut_ = {
    total: number
    page: number
    page_size: number
    results: SummaryRowOut[]
}

export type PaginationOut_TransferOut_ = {
    total: number
    page: number
    page_size: number
    results: TransferOut[]
}

export type PaginationOut_ZoneOut_ = {
    total: number
    page: number
    page_size: number
    results: ZoneOut[]
}

export type PartyTypeEnum = "SUPPLIER" | "CUSTOMER" | "WAREHOUSE" | "NONE"

export type PolicyIn = {
    item_id: string
    warehouse_id: string
    /** سقف موجودی؛ null = بی‌سقف */
    max_stock_cap?: number | string | null
    /** نقطه‌ی سفارش؛ null = بدون حد */
    reorder_threshold?: number | string | null
}

export type PolicyOut = {
    item_id: string
    warehouse_id: string
    max_stock_cap: string | null
    reorder_threshold: string | null
    /** WAREHOUSE = override این انبار، CATALOG = پیش‌فرض کالا */
    source: PolicySourceEnum
}

export type PolicyRowOut = {
    id: string
    item: StockItemOut | null
    warehouse: WarehouseBriefOut | null
    max_stock_cap: string | null
    reorder_threshold: string | null
    updated_at: string
}

export type PolicySourceEnum = "WAREHOUSE" | "CATALOG"

export type RackIn = {
    /** شماره‌ی قفسه */
    rack: number
    /** تعداد طبقه */
    shelves: number
    /** تعداد جعبه در هر طبقه */
    boxes: number
}

export type ReasonIn = {
    reason: string
}

export type ReceiptCountIn = {
    note?: string
    lines: CountLineIn[]
}

export type ReceiptCreateIn = {
    /** خالی = منتظر تعیین انبار توسط مدیر */
    warehouse_id?: string | null
    supplier_name?: string
    invoice_number?: string
    notes?: string
    lines: ReceiptLineIn[]
}

export type ReceiptLineIn = {
    item_id: string
    /** تعداد سفارش */
    quantity: number | string
    /** قیمت خرید واحد (ریال) */
    unit_price?: number | string | null
}

export type ReceiptLineOut = {
    id: string
    item: StockItemOut | null
    /** تعداد سفارش — فقط با مجوز approve */
    quantity?: string | null
    counted_quantity: string | null
    /** شمارش − سفارش — فقط با مجوز approve */
    variance?: string | null
    /** فقط با مجوز approve */
    unit_price?: string | null
    bins: LineBinOut[]
}

export type ReceiptOriginEnum = "MANUAL" | "PROCUREMENT"

export type ReceiptOut = {
    id: string
    receipt_no: string
    /** مرحله‌ی رسید */
    status: ReceiptStatusEnum
    /** MANUAL (موقت) | PROCUREMENT */
    origin: ReceiptOriginEnum
    warehouse: WarehouseBriefOut | null
    supplier_id: string | null
    supplier_name: string
    advice_id: string | null
    invoice_number: string
    notes: string
    manager_note: string
    keeper_note: string
    keeper_id: string | null
    received_at: string | null
    decided_by_id: string | null
    decided_at: string | null
    return_reason: string
    has_image: boolean
    line_count: number
    created_by_id: string | null
    created_at: string
    lines?: ReceiptLineOut[] | null
}

export type ReceiptStatusEnum = "AWAITING_MANAGER" | "AWAITING_RECEIPT" | "AWAITING_FINAL" | "POSTED" | "RETURNED"

export type ReceiptStatusFilterEnum = "AWAITING_MANAGER" | "AWAITING_RECEIPT" | "AWAITING_FINAL" | "POSTED" | "RETURNED" | "ARCHIVED"

export type ReceiveLineIn = {
    line_id: string
    /** خالی = همه‌ی مقدار ارسالی */
    received_quantity?: number | string | null
    destination_bin_id?: string | null
}

export type RelocationIn = {
    warehouse_id: string
    item_id: string
    old_bin_id: string
    new_bin_id: string
    quantity: number | string
    /** همه‌ی کالا جابه‌جا شد: آدرس قدیم از کالا برداشته می‌شود */
    move_all?: boolean
    note?: string
}

export type RelocationOut = {
    id: string
    relocation_no: string
    warehouse: WarehouseBriefOut | null
    item: StockItemOut | null
    quantity: string
    old_bin: BinBriefOut
    new_bin: BinBriefOut
    note: string
    occurred_at: string
    created_by_id: string | null
}

export type ReservationOut = {
    id: string
    item: StockItemOut | null
    warehouse: WarehouseBriefOut | null
    quantity: string
    /** سند رزروکننده */
    source_doc_type: SourceDocEnum
    source_doc_id: string
    /** ACTIVE | RELEASED | CONSUMED */
    status: ReservationStatusEnum
    created_at: string
}

export type ReservationStatusEnum = "ACTIVE" | "RELEASED" | "CONSUMED"

export type ScrapApproveIn = {
    admin_comment?: string
}

export type ScrapCreateIn = {
    warehouse_id: string
    keeper_comment?: string
    lines: ScrapLineIn[]
}

export type ScrapLineIn = {
    item_id: string
    quantity: number | string
    bin_location_id?: string | null
    reason?: string
}

export type ScrapLineOut = {
    id: string
    item: StockItemOut | null
    quantity: string
    /** فقط با مجوز wms.stock_reports.value.read */
    unit_cost?: string | null
    /** مبلغ کل زیان — فقط با مجوز ارزش */
    loss_value?: string | null
    bin: BinBriefOut | null
    reason: string
    has_image: boolean
}

export type ScrapOut = {
    id: string
    scrap_no: string
    /** PENDING | APPROVED | REJECTED */
    status: ScrapStatusEnum
    warehouse: WarehouseBriefOut | null
    occurred_at: string
    keeper_id: string | null
    keeper_comment: string
    admin_comment: string
    approver_id: string | null
    decided_at: string | null
    reject_reason: string
    line_count: number
    lines?: ScrapLineOut[] | null
}

export type ScrapStatusEnum = "PENDING" | "APPROVED" | "REJECTED"

export type SourceDocEnum = "OPENING" | "GOODS_RECEIPT" | "GOODS_ISSUE" | "TRANSFER" | "SCRAP" | "STOCK_COUNT" | "ITEM_BREAK" | "ITEM_ASSEMBLY" | "GRADE_CHANGE" | "CUSTOMER_RETURN"

export type StockItemOut = {
    id: string
    code?: string
    display_name?: string
    kind?: string
    size_name?: string
    color_name?: string
    category_path?: string
    unit_id?: string | null
}

export type StockOut = {
    id: string
    item: StockItemOut | null
    warehouse: WarehouseBriefOut | null
    quantity: string
    reserved_quantity: string
    available: string
    /** فقط با مجوز wms.stock_reports.value.read */
    last_purchase_price?: string | null
    /** فقط با مجوز wms.stock_reports.value.read */
    stock_value?: string | null
    reorder_threshold: string | null
    max_stock_cap: string | null
    below_threshold: boolean
    primary_bin: string | null
    updated_at: string
}

export type SummaryRowOut = {
    warehouse?: WarehouseBriefOut | null
    item?: StockItemOut | null
    party_id?: string | null
    party_name?: string | null
    source_doc_type?: SourceDocEnum | null
    source_doc_id?: string | null
    source_doc_no?: string | null
    opening: string
    incoming: string
    outgoing: string
    closing: string
    last_at: string | null
}

export type TransferCreateIn = {
    source_warehouse_id: string
    destination_warehouse_id: string
    /** VALID | PENDING | NONE */
    insurance_status?: InsuranceStatusEnum
    /** شماره فاکتور مرتبط (اختیاری) */
    source_doc_no?: string
    note?: string
    lines: TransferLineIn[]
}

export type TransferDirectionEnum = "SEND" | "RECEIVE"

export type TransferLineIn = {
    item_id: string
    quantity: number | string
    source_bin_id?: string | null
}

export type TransferLineOut = {
    id: string
    item: StockItemOut | null
    quantity: string
    received_quantity: string | null
    /** کسری حمل = ارسالی − دریافتی (پس از دریافت؛ از مبدأ کسر شده و به مقصد نرسیده) */
    shortage?: string | null
    source_bin: BinBriefOut | null
    destination_bin: BinBriefOut | null
}

export type TransferOriginEnum = "SYSTEM" | "MANUAL"

export type TransferOut = {
    id: string
    transfer_no: string
    /** وضعیت انتقال */
    status: TransferStatusEnum
    /** SYSTEM | MANUAL */
    origin: TransferOriginEnum
    /** وضعیت بیمه */
    insurance_status: InsuranceStatusEnum
    source_warehouse: WarehouseBriefOut | null
    destination_warehouse: WarehouseBriefOut | null
    source_doc_no: string
    note: string
    requester_id: string | null
    approver_id: string | null
    received_by_id: string | null
    requested_at: string
    approved_at: string | null
    dispatched_at: string | null
    received_at: string | null
    rejected_at: string | null
    reject_reason: string
    cancelled_at: string | null
    has_receipt_image: boolean
    /** حداقل یک ردیف کسری حمل دارد */
    has_shortage?: boolean
    line_count: number
    lines?: TransferLineOut[] | null
}

export type TransferReceiveIn = {
    lines?: ReceiveLineIn[]
}

export type TransferStatusEnum = "PENDING" | "APPROVED" | "IN_TRANSIT" | "RECEIVED" | "REJECTED" | "CANCELLED"

export type VarianceFilterEnum = "ANY" | "POSITIVE" | "NEGATIVE"

export type VarianceSignEnum = "POSITIVE" | "NEGATIVE" | "NONE"

export type WarehouseBriefOut = {
    id: string
    code?: string
    name?: string
}

export type ZoneIn = {
    warehouse_id: string
    /** ۱ یا ۲ حرف لاتین (A، B، …) */
    prefix: string
    name: string
    /** STORAGE | PICKING | QUARANTINE | BULKY */
    usage?: ZoneUsageEnum
}

export type ZoneOut = {
    id: string
    warehouse: WarehouseBriefOut | null
    prefix: string
    name: string
    /** کاربری ناحیه */
    usage: ZoneUsageEnum
    is_active: boolean
    bin_count: number
}

export type ZoneUpdateIn = {
    name?: string | null
    /** STORAGE | PICKING | QUARANTINE | BULKY */
    usage?: ZoneUsageEnum | null
    is_active?: boolean | null
}

export type ZoneUsageEnum = "STORAGE" | "PICKING" | "QUARANTINE" | "BULKY"

