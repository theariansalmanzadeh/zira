import type { PaginatedResponse } from './common'

export type Role = {
    id: string
    code: string
    name: string
    description: string
    level: number
    department: string
    is_system: boolean
    is_active: boolean
    created_at: string
}

export type ListRolesParams = {
    search?: string | null
    department?: string | null
    is_active?: boolean | null
    page?: number | null
    page_size?: number | null
}

export type ListRolesResponse = PaginatedResponse<Role>

export type GetRoleResponse = Role

export type CreateRoleRequest = {
    code: string
    name: string
    description?: string
    level?: number
    department?: string
}

export type CreateRoleResponse = Role

export type UpdateRoleRequest = {
    name?: string | null
    description?: string | null
    level?: number | null
    department?: string | null
    is_active?: boolean | null
}

export type UpdateRoleResponse = Role

export type UserRoleAssignment = {
    id: string
    user_id: string
    role_id: string
    assigned_at: string
    expires_at?: string | null
    is_active: boolean
}

export type ListRoleAssignmentsParams = {
    query?: string | null
    role_id?: string | null
    user_id?: string | null
    is_active?: boolean | null
    page?: number | null
    page_size?: number | null
}

export type ListRoleAssignmentsResponse = PaginatedResponse<UserRoleAssignment>
