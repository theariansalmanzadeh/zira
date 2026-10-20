import type { PaginatedResponse } from './common'

export type DepartmentPickerItem = {
    id: string
    code: string
    name: string
    is_active: boolean
}

export type Department = {
    id: string
    code: string
    name: string
    description: string
    is_active: boolean
    created_at: string
    updated_at: string
}

export type ListDepartmentPickerResponse = PaginatedResponse<DepartmentPickerItem>

export type CreateDepartmentRequest = {
    code: string
    name: string
    description?: string
}

export type CreateDepartmentResponse = Department

export type ListDepartmentsResponse = PaginatedResponse<Department>

export type GetDepartmentResponse = Department

export type UpdateDepartmentRequest = {
    name: string
    description: string
    is_active: boolean
}

export type UpdateDepartmentResponse = Department

export type DepartmentUser = {
    id: string
    display_name: string
}

export type ListDepartmentUsersResponse = PaginatedResponse<DepartmentUser>
