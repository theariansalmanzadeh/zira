import type { PaginatedResponse } from './common'
export type { PaginatedResponse } from './common'

export type CustomerStatus = 'ACTIVE' | 'SUSPENDED' | 'RELEASED'
export type CustomerLifecycleStatus = 'ACTIVE' | 'INACTIVE'
export type CooperationLevel = 'BRONZE' | 'SILVER' | 'GOLD'
export type ImageAccessLevel = 'NORMAL' | 'PROFESSIONAL' | 'SPECIAL'
export type CustomerType =
    | 'WHOLESALE'
    | 'RETAIL'
    | 'ORGANIZATIONAL'
    | 'OTHER'
export type LicenseInquiryStatus = 'NOT_CHECKED' | 'VALID' | 'INVALID'
export type RegistrationRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type RegistrationRequestSource = 'SELF' | 'ADMIN'
export type CustomerDocumentType =
    | 'NATIONAL_CARD'
    | 'BIRTH_CERTIFICATE'
    | 'BUSINESS_LICENSE'
    | 'POSTAL_CODE_CERT'
    | 'EDUCATION_CERT'
    | 'PREMISES_LEASE_OR_DEED'
    | 'TAX_DOCUMENT'
    | 'BANK_CREDIT_RATING'
    | 'ECONOMIC_CODE_CERT'
    | 'OTHER'
export type DocumentReviewStatus = 'PENDING' | 'VERIFIED' | 'REJECTED'

export type CustomerIdentity = {
    first_name?: string | null
    last_name?: string | null
    national_id?: string | null
    mobile?: string | null
    gender?: string | null
}

export type CustomerProfileListItem = {
    id: string
    code: string
    full_name: string
    national_id?: string | null
    mobile?: string | null
    store_name: string
    status: string
    status_display: string
    cooperation_level: string
    cooperation_level_display: string
    verification_level: number
    customer_type: string
    is_blacklisted: boolean
    is_locked: boolean
    created_at: string
}

export type CustomerProfile = {
    id: string
    customer_id: string
    code: string
    store_name: string
    manager_name: string
    phone: string
    mobile_2: string
    economic_code: string
    guild: string
    business_license_no: string
    referrer_name: string
    identity: {
        first_name: string
        last_name: string
        national_id: string
        mobile: string
        gender: string
    }
    status: string
    status_display: string
    is_blacklisted: boolean
    blacklist_reason: string
    cooperation_level: string
    cooperation_level_display: string
    verification_level: number
    customer_type: string
    license_inquiry_status: string
    license_inquired_at: string
    payment_due_days: number
    group_names: string[]
    effective_marketer: Record<string, unknown>
    is_locked: boolean
    approved_at: string
    created_at: string
    version: number
    tier: string
    open_account_eligible: boolean
    cheque_eligible: boolean
    effective_payment_due_days: number
    effective_golden_credit_amount: string
    effective_max_cheque_maturity_months: number
}

export type CreateCustomerProfileRequest = {
    user_id: string
    tier?: string
    image_access_level?: string
    payment_due_days?: number
    golden_credit_amount?: number
    max_cheque_maturity_months?: number
    store_name?: string
}

export type CreateCustomerProfileResponse = {
    id: string
    customer_id: string
    user_id: string
    tier: string
    image_access_level: string
    cheque_eligible: boolean
    open_account_eligible: boolean
    effective_payment_due_days?: number | null
    effective_golden_credit_amount: string
    effective_max_cheque_maturity_months?: number | null
    version: number
}

export type ListCustomerProfilesParams = {
    page?: number
    page_size?: number
    q?: string
    mobile?: string
    status?: CustomerStatus
    cooperation_level?: CooperationLevel
    image_access_level?: ImageAccessLevel
    customer_type?: CustomerType
    is_blacklisted?: boolean
    is_locked?: boolean
    group_id?: string
    marketer_id?: string
}

export type UpdateCustomerProfileRequest = {
    store_name?: string
    manager_name?: string
    economic_code?: string
    guild?: string
    business_license_no?: string
    license_inquiry_status?: LicenseInquiryStatus
    phone?: string
    mobile_2?: string
    referrer_name?: string
    customer_type?: CustomerType
    expected_version: number
}

export type UpdateCustomerStatusRequest = {
    status: CustomerLifecycleStatus
    reason: string
    expected_version: number
}

export type ArchiveCustomerRequest = {
    reason: string
    expected_version: number
}

export type UpdateCustomerBlacklistRequest = {
    flag: boolean
    reason: string
    expected_version: number
}

export type CustomerTier = {
    cooperation_level: string
    verification_level: number
    allowed_payment_methods: string[]
}

export type UpdateCustomerTierRequest = {
    level?: CooperationLevel
    tier?: CooperationLevel
    reason: string
    expected_version: number
}

export type CustomerImageAccess = {
    image_access_level: string
}

export type UpdateCustomerImageAccessRequest = {
    level: ImageAccessLevel
    reason: string
    expected_version: number
}

export type CustomerCreditPolicy = {
    customer_id: string
    version: number
    cheque_account_id: string
    cheque_credit_limit: string
    cheque_term_months: number
    cheque_term_display: string
    cheque_status: string
    golden_account_id: string
    golden_credit_limit: string
    golden_term_months: number
    golden_term_display: string
    golden_status: string
    stepwise_increase: boolean
    payment_due_days_raw: number
    payment_due_days_effective: number
    account_terms: Record<string, number>
}

export type UpdateCustomerCreditPolicyRequest = {
    cheque_term_months?: number
    max_cheque_maturity_months?: number
    cheque_credit_limit?: number
    golden_credit_amount?: number
    golden_credit_limit?: number
    golden_term_months?: number
    stepwise_increase?: boolean
    payment_due_days?: number
    expected_version?: number
    reason?: string
}

export type UpdateCustomerCreditPolicyPutRequest =
    UpdateCustomerCreditPolicyRequest

export type UpdateCustomerCreditPolicyPatchRequest =
    UpdateCustomerCreditPolicyRequest

export type CustomerGroupMembership = {
    membership_id: string
    group_id: string
    group_code: string
    group_name: string
    is_active: boolean
    joined_at: string
}

export type SetCustomerPrimaryGroupRequest = {
    group_id?: string | null
    expected_version?: number
}

export type SetCustomerPrimaryGroupResponse = {
    id: string
    customer_id: string
    group_id?: string | null
    group_name?: string | null
    effective_payment_due_days?: number | null
    effective_golden_credit_amount: string
    effective_max_cheque_maturity_months?: number | null
    version: number
}

export type MarketerAssignment = {
    marketer_id: string
    marketer_name?: string | null
    percent: string
    assigned_at: string
    is_active: boolean
}

export type CustomerMarketer = {
    effective?: Record<string, unknown> | null
    active_assignment?: MarketerAssignment | null
    history?: MarketerAssignment[]
}

export type AssignCustomerMarketerRequest = {
    marketer_id: string
    percent: number
}

export type EndCustomerMarketerRequest = {
    reason: string
}

export type RegistrationRequestCounts = {
    PENDING?: number
    APPROVED?: number
    REJECTED?: number
}

export type RegistrationRequestListItem = {
    id: string
    request_no: string
    status: RegistrationRequestStatus
    status_display: string
    source: RegistrationRequestSource
    source_display: string
    customer_id?: string | null
    customer_code?: string | null
    customer_store_name?: string | null
    full_name?: string | null
    mobile?: string | null
    reviewed_by_id?: string | null
    reviewed_by_name?: string | null
    reviewed_at?: string | null
    rejection_reason?: string | null
    created_at: string
    updated_at: string
}

export type RegistrationRequest = RegistrationRequestListItem & {
    submitted_data: Record<string, unknown>
}

export type ListRegistrationRequestsParams = {
    page?: number
    page_size?: number
    status?: RegistrationRequestStatus
    source?: RegistrationRequestSource
    q?: string
    date_from?: string
    date_to?: string
}

export type RegistrationGuarantee = {
    type: string
    credit: string
    amount: number
    cheque_no: string
    chequeNo: string
    serial: string
    bank: string
    branch: string
    owner: string
    guarantor: string
    guarantor_nid: string
    guarantorNid: string
    due: string
    status: string
    image_url: string
    file: string
}

export type CreateRegistrationRequest = {
    first_name: string
    last_name: string
    gender?: string
    national_id: string
    business_license_no?: string
    license_file?: string
    license_image?: string
    mobile_1: string
    mobile_2?: string
    phone?: string
    referrer_name?: string
    referrer_phone?: string
    address?: string
    province?: string
    city?: string
    postal_code?: string
    store_name?: string
    manager_name?: string
    economic_code?: string
    guild?: string
    description?: string
    marketer_id?: string
    marketer_name?: string
    marketer?: string
    marketer_percent?: number
    cheque_credit?: number
    cheque_credit_limit?: number
    cheque_credit_level?: string
    cheque_max_due_months?: number
    golden_credit?: number
    golden_credit_limit?: number
    stepwise_increase?: boolean
    stepwise_golden_credit?: string
    guarantees?: RegistrationGuarantee[]
    username?: string
    password?: string
    customer_type?: CustomerType
    cooperation_level?: CooperationLevel
    tier?: CooperationLevel
    image_access_level?: ImageAccessLevel
    user_level?: string
    status?: RegistrationRequestStatus
}

export type UpdateRegistrationRequest = {
    store_name?: string
    manager_name?: string
    economic_code?: string
    guild?: string
    business_license_no?: string
    license_inquiry_status?: LicenseInquiryStatus
    phone?: string
    mobile_2?: string
    referrer_name?: string
    customer_type?: CustomerType
    description?: string
    expected_version: number
}

export type RejectRegistrationRequest = {
    reason: string
}

export type CustomerDocument = {
    id: string
    doc_type: CustomerDocumentType
    doc_type_display: string
    file_size: number
    review_status: DocumentReviewStatus
    rejection_reason?: string | null
    verified_by_id?: string | null
    verified_at?: string | null
    version?: number
    created_at: string
    download_url: string
}

export type UploadCustomerDocumentRequest = {
    doc_type: CustomerDocumentType
    file: Blob
}

export type ReviewCustomerDocumentRequest = {
    approved: boolean
    reason?: string
}

export type CustomerGroupListItem = {
    id: string
    code: string
    name: string
    marketer_id?: string | null
    marketer_name?: string | null
    marketer_percent: string
    member_count?: number | null
    is_active: boolean
}

export type CustomerGroup = CustomerGroupListItem & {
    version: number
    created_at: string
    updated_at: string
}

export type ListCustomerGroupsParams = {
    page?: number
    page_size?: number
    q?: string
    is_active?: boolean
    marketer_id?: string
}

export type CreateCustomerGroupRequest = {
    name: string
    description?: string
    default_tier?: string
    default_payment_due_days?: number
    default_golden_credit_amount?: number
    default_max_cheque_maturity_months?: number
    marketer_id?: string | null
    marketer_percent?: number
}

export type UpdateCustomerGroupRequest = {
    name: string
    expected_version: number
}

export type VersionedCustomerGroupRequest = {
    expected_version: number
}

export type SetCustomerGroupMarketerRequest = {
    marketer_id?: string | null
    percent?: number
    expected_version: number
}

export type CustomerGroupMember = {
    membership_id: string
    customer_id: string
    customer_code: string
    store_name: string
    full_name?: string | null
    joined_at: string
    added_by_id?: string | null
}

export type ListCustomerGroupMembersParams = {
    page?: number
    page_size?: number
}

export type AddCustomerGroupMembersRequest = {
    customer_ids: string[]
}

export type AddCustomerGroupMembersResponse = {
    added: CustomerGroupMember[]
    skipped: string[]
}

export type ListCustomerProfilesResponse =
    PaginatedResponse<CustomerProfileListItem>
export type GetCustomerProfileResponse = CustomerProfile
export type UpdateCustomerProfileResponse = CustomerProfile
export type ListRegistrationRequestsResponse =
    PaginatedResponse<RegistrationRequestListItem>
export type GetRegistrationRequestResponse = RegistrationRequest
export type ListCustomerDocumentsResponse =
    PaginatedResponse<CustomerDocument>
export type ListRegistrationRequestDocumentsResponse =
    PaginatedResponse<CustomerDocument>
export type ListCustomerGroupsResponse = PaginatedResponse<CustomerGroupListItem>
export type ListCustomerGroupMembersResponse =
    PaginatedResponse<CustomerGroupMember>
export type ListCustomerGroupMembershipsResponse =
    PaginatedResponse<CustomerGroupMembership>
