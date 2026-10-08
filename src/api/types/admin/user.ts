export type UserDepartment = {
    id: string
    code: string
    name: string
    is_active: boolean
}

export type User = {
    id: string
    phone_number: string
    username?: string | null
    email?: string | null
    first_name?: string | null
    last_name?: string | null
    national_id?: string | null
    personnel_code?: string | null
    department?: string | null
    departments?: UserDepartment[]
    job_title?: string | null
    user_type: string
    status: string
    is_active: boolean
    is_verified: boolean
    primary_branch_id?: string | null
    direct_manager_id?: string | null
    commission_percent: number
    last_login_at?: string | null
    created_by_id?: string | null
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
