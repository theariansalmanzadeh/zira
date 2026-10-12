export type CreditType = 'CHEQUE' | 'GOLDEN'

export type CreditAccountStatus = 'ACTIVE' | 'SUSPENDED' | 'FROZEN' | 'CLOSED'

export type CreditChangeDirection = 'INCREASE' | 'DECREASE'

export type CreditChangeStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export type GuaranteeType = 'PERSONAL_CHEQUE' | 'PROMISSORY_NOTE'

export type GuaranteeStatus = 'PENDING_APPROVAL' | 'ACTIVE' | 'RELEASED'

export type CreditLockReason =
    | 'SELF_CHEQUE_BOUNCED'
    | 'BOUNCED_TOTAL_THRESHOLD'
    | 'GOLDEN_DEADLINE'
    | 'OVERDUE_DEBT'
    | 'MANUAL'

export type CreditLockStatus = 'ACTIVE' | 'SUSPENDED' | 'RELEASED'

export type CustomerDetailsPage<T> = {
    total: number
    page: number
    page_size: number
    results: T[]
}

export type PendingChangeRequestSummary = {
    id: string
    direction: CreditChangeDirection
    amount: string
    limit_before: string
    limit_after: string
}

export type CreditAccountSummary = {
    id: string
    credit_type: CreditType
    credit_limit: string
    term_months: number
    status: CreditAccountStatus
    stepwise_increase: boolean
    pending_change_request?: PendingChangeRequestSummary | null
}

export type EffectiveCreditLockSummary = {
    id: string
    reason: CreditLockReason
    status: CreditLockStatus
    locked_at?: string | null
    suspended_until?: string | null
}

export type CreditSummary = {
    customer_id: string
    credit_accounts: CreditAccountSummary[]
    effective_credit_locks: EffectiveCreditLockSummary[]
}

export type CreditAccount = {
    id: string
    customer_id: string
    credit_type: CreditType
    credit_limit: string
    term_months: number
    status: CreditAccountStatus
    stepwise_increase: boolean
    created_at: string
    updated_at: string
}

export type CreditAccountStatusIn = {
    status: CreditAccountStatus
    reason: string
}

export type CreditAccountTermIn = {
    term_months: number
}

export type StepwiseActionIn = {
    reason: string
}

export type ChangeRequestCreateIn = {
    direction: CreditChangeDirection
    amount: number | string
    note?: string | null
    guarantee_ids?: string[]
}

export type ChangeRequest = {
    id: string
    credit_account_id: string
    direction: CreditChangeDirection
    amount: string
    limit_before: string
    limit_after: string
    status: CreditChangeStatus
    note: string
    reject_reason: string
    requested_by_id?: string | null
    decided_by_id?: string | null
    decided_at?: string | null
    created_at: string
    updated_at: string
}

export type ChangeRequestQueueItem = {
    id: string
    credit_account_id: string
    customer_id: string
    customer_code: string
    store_name: string
    direction: CreditChangeDirection
    amount: string
    limit_before: string
    limit_after: string
    status: CreditChangeStatus
    note: string
    reject_reason: string
    requested_by_id?: string | null
    requested_by_name?: string | null
    decided_by_id?: string | null
    decided_by_name?: string | null
    decided_at?: string | null
    created_at: string
}

export type ChangeRequestRejectIn = {
    reason: string
}

export type Guarantee = {
    id: string
    customer_id: string
    credit_account_id: string
    guarantee_type: GuaranteeType
    amount: string
    document_no: string
    bank_id?: string | null
    bank_branch_name: string
    owner_name: string
    guarantor_name: string
    guarantor_national_id: string
    issue_place: string
    due_date?: string | null
    status: GuaranteeStatus
    credit_change_request_id?: string | null
    has_file: boolean
    created_by_id?: string | null
    released_by_id?: string | null
    released_at?: string | null
    release_note: string
    created_at: string
    updated_at: string
}

export type CreateCustomerGuaranteeRequest = {
    credit_account_id: string
    guarantee_type: GuaranteeType | string
    amount: number | string
    document_no: string
    bank_id?: string | null
    bank_branch_name?: string | null
    owner_name?: string | null
    guarantor_name?: string | null
    guarantor_national_id?: string | null
    issue_place?: string | null
    due_date?: string | null
    file: Blob
}

export type GuaranteeUpdateIn = {
    amount?: number | string | null
    document_no?: string | null
    bank_id?: string | null
    bank_branch_name?: string | null
    owner_name?: string | null
    guarantor_name?: string | null
    guarantor_national_id?: string | null
    issue_place?: string | null
    due_date?: string | null
}

export type ReplaceGuaranteeFileRequest = {
    file: Blob
}

export type GuaranteeReleaseIn = {
    confirm_no_open_balance: boolean
    note: string
}

export type CreditLock = {
    id: string
    customer_id: string
    reason: CreditLockReason
    status: CreditLockStatus
    source_doc_id?: string | null
    locked_at: string
    suspended_until?: string | null
    note: string
    locked_by_id?: string | null
    locked_by_name?: string | null
    override_personnel_code: string
    override_note: string
    overridden_by_id?: string | null
    overridden_by_name?: string | null
    released_at?: string | null
    released_by_id?: string | null
    released_by_name?: string | null
    release_note: string
    is_effective: boolean
}

export type CreditLockManualIn = {
    note: string
}

export type CreditLockSuspendIn = {
    until: string
    personnel_code: string
    note: string
}

export type CreditLockReleaseIn = {
    note: string
}

export type ListAccountChangeRequestsParams = {
    page?: number
    page_size?: number
    query?: string | null
}

export type ListCreditChangeRequestsParams = {
    page?: number
    page_size?: number
    query?: string | null
    status?: CreditChangeStatus | null
    customer_id?: string | null
    credit_account_id?: string | null
}

export type ListCustomerGuaranteesParams = {
    page?: number
    page_size?: number
    query?: string | null
    status?: GuaranteeStatus | null
    credit_account_id?: string | null
}

export type ListCustomerLocksParams = {
    page?: number
    page_size?: number
    query?: string | null
}

export type ListAccountChangeRequestsResponse = CustomerDetailsPage<ChangeRequest>
export type ListCreditChangeRequestsResponse =
    CustomerDetailsPage<ChangeRequestQueueItem>
export type ListCustomerGuaranteesResponse = CustomerDetailsPage<Guarantee>
export type ListCustomerLocksResponse = CustomerDetailsPage<CreditLock>
