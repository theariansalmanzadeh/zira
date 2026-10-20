export type UnitOut = {
    id: string
    code: string
    name: string
    factor: number
    base_unit_id?: string | null
    base_unit_name?: string | null
    is_base: boolean
    is_active: boolean
}

export type UnitDetailOut = UnitOut & {
    created_at: string
    updated_at: string
}

export type UnitIn = {
    code: string
    name: string
    base_unit_id?: string | null
    factor?: number
}

export type UnitUpdateIn = {
    name?: string | null
    is_active?: boolean | null
}

export type ListUnitsParams = {
    page?: number
    page_size?: number
    query?: string | null
    search?: string | null
    is_active?: boolean | null
    is_base?: boolean | null
    base_unit_id?: string | null
}

export type ListUnitsResponse = {
    total: number
    page: number
    page_size: number
    results: UnitOut[]
}

export type CreateUnitRequest = UnitIn
export type CreateUnitResponse = UnitDetailOut
export type GetUnitResponse = UnitDetailOut
export type UpdateUnitRequest = UnitUpdateIn
export type UpdateUnitResponse = UnitDetailOut
export type DeleteUnitResponse = UnitDetailOut

export type SequenceOut = {
    id: string
    key: string
    fiscal_year_id: string | null
    prefix: string
    next_value: number
    padding: number
    preview: string
}

export type SequenceUpdateIn = {
    prefix?: string | null
    padding?: number | null
    next_value?: number | null
}

export type ListSequencesParams = {
    page?: number
    page_size?: number
    query?: string | null
}

export type ListSequencesResponse = {
    total: number
    page: number
    page_size: number
    results: SequenceOut[]
}

export type GetSequenceResponse = SequenceOut
export type UpdateSequenceRequest = SequenceUpdateIn
export type UpdateSequenceResponse = SequenceOut

export type CommercePolicyOut = {
    proforma_valid_days: number
    floating_phase_hours: number
    cheque_raas_cap_days: number
    credit_raas_cap_days: number
    raas_max_days: number
    bank_account_hold_minutes: number
    bounced_cheque_lock_count: number
    otp_resend_seconds: number
    cheque_reminder_days_1: number
    cheque_reminder_days_2: number
    cashback_coupon_valid_days: number
    cheque_benchmark_months: number
    default_cheque_max_due_months: number | null
    stock_lock_min_paid_pct: string
    preorder_deposit_pct: string
    presale_deposit_pct: string
    full_settlement_discount_pct: string
    cashback_pct: string
    early_settlement_discount_pct_per_month: string
    cheque_early_discount_pct_per_month: string
    cheque_late_surcharge_pct_per_month: string
    deposit_rounding_rial: string
    cheque_raas_cap_amount: string
    credit_raas_cap_amount: string
    bounced_cheque_lock_amount: string
    third_party_cheque_weight: string
    early_settlement_enabled: boolean
    online_default_branch_id: string | null
    updated_at: string
    default_payment_due_days: number | null
    max_item_price_drop_pct: string
}

export type CommercePolicyUpdateIn = {
    proforma_valid_days?: number | null
    floating_phase_hours?: number | null
    cheque_raas_cap_days?: number | null
    credit_raas_cap_days?: number | null
    raas_max_days?: number | null
    bank_account_hold_minutes?: number | null
    bounced_cheque_lock_count?: number | null
    otp_resend_seconds?: number | null
    cheque_reminder_days_1?: number | null
    cheque_reminder_days_2?: number | null
    cashback_coupon_valid_days?: number | null
    cheque_benchmark_months?: number | null
    default_cheque_max_due_months?: number | null
    stock_lock_min_paid_pct?: number | string | null
    preorder_deposit_pct?: number | string | null
    presale_deposit_pct?: number | string | null
    full_settlement_discount_pct?: number | string | null
    cashback_pct?: number | string | null
    early_settlement_discount_pct_per_month?: number | string | null
    cheque_early_discount_pct_per_month?: number | string | null
    cheque_late_surcharge_pct_per_month?: number | string | null
    max_item_price_drop_pct?: number | string | null
    deposit_rounding_rial?: number | string | null
    cheque_raas_cap_amount?: number | string | null
    credit_raas_cap_amount?: number | string | null
    bounced_cheque_lock_amount?: number | string | null
    third_party_cheque_weight?: number | string | null
    early_settlement_enabled?: boolean | null
    online_default_branch_id?: string | null
    default_payment_due_days?: number | null
}

export type GetCommercePolicyResponse = CommercePolicyOut
export type UpdateCommercePolicyRequest = CommercePolicyUpdateIn
export type UpdateCommercePolicyResponse = CommercePolicyOut

export type CatalogDisplayPolicyOut = {
    show_prices: boolean
    show_stock: boolean
    updated_at: string
}

export type CatalogDisplayUpdateIn = {
    show_prices?: boolean | null
    show_stock?: boolean | null
}

export type GetCatalogDisplayResponse = CatalogDisplayPolicyOut
export type UpdateCatalogDisplayRequest = CatalogDisplayUpdateIn
export type UpdateCatalogDisplayResponse = CatalogDisplayPolicyOut

export type CatalogConfigOut = {
    barcode_prefix: string
    min_order_qty: string
    max_order_qty: string | null
    max_preorder_qty: string | null
    max_stock_cap: string | null
    reorder_threshold: string | null
    sales_target: string | null
    updated_at: string
}

export type CatalogConfigUpdateIn = {
    barcode_prefix?: string | null
    min_order_qty?: number | string | null
    max_order_qty?: number | string | null
    max_preorder_qty?: number | string | null
    max_stock_cap?: number | string | null
    reorder_threshold?: number | string | null
    sales_target?: number | string | null
}

export type GetCatalogConfigResponse = CatalogConfigOut
export type UpdateCatalogConfigRequest = CatalogConfigUpdateIn
export type UpdateCatalogConfigResponse = CatalogConfigOut

export type GoodPayerFactorCode = string

export type ScoreFactorOut = {
    code: GoodPayerFactorCode
    code_display: string
    title: string
    weight: string
    is_active: boolean
    sort_order: number
}

export type ScoreFactorUpdateIn = {
    code: GoodPayerFactorCode
    weight?: number | string | null
    is_active?: boolean | null
    sort_order?: number | null
}

export type ScoreFormulaUpdateIn = {
    rows: ScoreFactorUpdateIn[]
}

export type ListScoreFormulaParams = {
    page?: number
    page_size?: number
    query?: string | null
}

export type ListScoreFormulaResponse = {
    total: number
    page: number
    page_size: number
    results: ScoreFactorOut[]
}

export type UpdateScoreFormulaRequest = ScoreFormulaUpdateIn
export type UpdateScoreFormulaResponse = ScoreFactorOut[]

export type NamingRuleTarget = 'ITEM'
export type NamingPartKind = string

export type NamingPartOut = {
    position: number
    part: NamingPartKind
    part_display: string
    label: string
    is_active: boolean
}

export type NamingPartIn = {
    part: NamingPartKind
    label?: string | null
    is_active?: boolean | null
}

export type NamingRuleIn = {
    parts: NamingPartIn[]
}

export type ListNamingRuleParams = {
    page?: number
    page_size?: number
    query?: string | null
}

export type ListNamingRuleResponse = {
    total: number
    page: number
    page_size: number
    results: NamingPartOut[]
}

export type SetNamingRuleRequest = NamingRuleIn
export type SetNamingRuleResponse = NamingPartOut[]

export type GradePricePolicyOut = {
    grade: number
    default_discount_pct: string
    updated_at: string
}

export type GradePolicyUpdateIn = {
    default_discount_pct: number | string
}

export type ListGradePoliciesParams = {
    page?: number
    page_size?: number
    query?: string | null
}

export type ListGradePoliciesResponse = {
    total: number
    page: number
    page_size: number
    results: GradePricePolicyOut[]
}

export type SetGradePolicyRequest = GradePolicyUpdateIn
export type SetGradePolicyResponse = GradePricePolicyOut
