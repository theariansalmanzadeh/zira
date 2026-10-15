export type UserDepartment = {
    id: string
    code: string
    name: string
    is_active: boolean
}

export type UserIdentity = {
    id: string
    user_id: string
    birth_certificate_no: string
    father_name: string
    birth_date: string
    issue_place: string
    gender: string
    marital_status: string
    children_count: number
    social_security_no: string
    educational_qualification: string
    created_at: string
    updated_at: string
}

export type UserAddress = {
    id: string
    user_id: string
    province: string
    city: string
    full_address: string
    postal_code: string
    phone: string
    mobile_1: string
    mobile_2: string
    created_at: string
    updated_at: string
}

export type UserBankAccount = {
    id: string
    user_id: string
    bank_name: string
    iban: string
    account_no: string
    card_no: string
    created_at: string
    updated_at: string
}

export type UserNextOfKin = {
    id: string
    user_id: string
    full_name: string
    relation: string
    phone: string
    address: string
    created_at: string
    updated_at: string
}

export type UserDocument = {
    id: string
    user_id: string
    doc_type: string
    slot: string
    file: string
    uploaded_at: string
    created_at: string
    updated_at: string
}

export type User = {
    id: string
    phone_number: string
    username: string
    email: string
    first_name: string
    last_name: string
    national_id: string
    personnel_code: string
    department: string
    departments: UserDepartment[]
    job_title: string
    job_description: string
    account_description: string
    has_commission_contract: boolean
    commission_percent: number
    user_type: string
    status: string
    is_active: boolean
    is_verified: boolean
    primary_branch_id: string
    direct_manager_id: string
    last_login_at: string
    last_activity_at: string
    created_at: string
    created_by_id: string
    roles: string[]
    active_sessions_count: number
    identity: UserIdentity
    addresses: UserAddress[]
    bank_accounts: UserBankAccount[]
    next_of_kin: UserNextOfKin[]
    documents: UserDocument[]
}

export type UserSession = {
    id: string
    user_id: string
    branch_id?: string | null
    device_type: string
    browser?: string | null
    ip_address?: string | null
    approx_location?: string | null
    status: string
    started_at: string
    last_activity_at: string
    expires_at: string
    terminated_at?: string | null
    is_alive: boolean
}

export type UserDepartmentAssignment = {
    id: string
    code: string
    name: string
    is_active: boolean
    assigned_at: string
    assigned_by_id: string
}

export type MessageResponse = {
    message: string
}

export type ListUsersResponse = User[]

export type StaffUser = {
    id: string
    phone_number: string
    username: string
    email: string
    first_name: string
    last_name: string
    national_id: string
    personnel_code: string
    user_type: string
    status: string
    is_active: boolean
    is_verified: boolean
    job_title: string
    job_description: string
    account_description: string
    has_commission_contract: boolean
    commission_percent: number
    primary_branch_id: string
    direct_manager_id: string
    created_at: string
    created_by_id: string
    last_login_at: string
    last_activity_at: string
    roles: string[]
    active_sessions_count: number
}

export type StaffNextOfKin = {
    full_name: string
    relation: string
    phone: string
    address: string
}

export type StaffDocument = {
    slot: string
    file: string
}

export type UploadStaffDocumentRequest = {
    file: File
    slot?: string | null
}

export type UploadStaffDocumentResponse = {
    file: string
    slot: string | null
    file_size: number
    content_type: string
}

export type CreateStaffUserRequest = {
    first_name: string
    last_name: string
    national_id: string
    birth_certificate_no: string
    issue_place: string
    father_name: string
    birth_date: string
    gender: string
    marital_status: string
    children_count: number
    educational_qualification: string
    social_security_no: string
    province: string
    city: string
    full_address: string
    postal_code: string
    phone: string
    email: string
    mobile_1: string
    mobile_2: string
    next_of_kin: StaffNextOfKin[]
    account_no: string
    bank_name: string
    iban: string
    card_no: string
    phone_number: string
    password: string
    user_type: string
    role_id: string
    status: string
    username: string
    account_description: string
    department_id: string
    primary_branch_id: string
    direct_manager_id: string
    job_title: string
    job_description: string
    has_commission_contract: boolean
    commission_percent: number
    documents: StaffDocument[]
}

export type ListStaffUsersResponse = {
    total: number
    page: number
    page_size: number
    results: StaffUser[]
}

export type CreateStaffUserResponse = StaffUser

export type CreateUserRequest = {
    phone_number: string
    username: string
    email: string
    first_name: string
    last_name: string
    national_id: string
    personnel_code: string
    job_title: string
    user_type: string
    primary_branch_id: string
    direct_manager_id: string
}

export type CreateUserResponse = User

export type GetUserResponse = User

export type UpdateUserRequest = {
    first_name: string
    last_name: string
    email: string
    national_id: string
    job_title: string
    user_type: string
    primary_branch_id: string
    direct_manager_id: string
    is_active: boolean
}

export type UpdateUserResponse = User

export type UpdateUserStatusRequest = {
    status: string
}

export type UpdateUserStatusResponse = User

export type ListUserSessionsResponse = UserSession[]

export type ListUserBranchesResponse = string[]

export type UserBranchAccessRequest = {
    branch_ids: string[]
}

export type UpdateUserBranchMasterRequest = {
    is_branch_master: boolean
}

export type UpdateUserBranchMasterResponse = User

export type GetUserDepartmentsResponse = {
    user_id: string
    departments: UserDepartmentAssignment[]
}

export type SetUserDepartmentsRequest = {
    department_ids: string[]
    expected_department_ids: string[]
    reason?: string | null
}

export type SetUserDepartmentsResponse = GetUserDepartmentsResponse
