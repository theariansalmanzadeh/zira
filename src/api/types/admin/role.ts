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
}

export type ListRolesResponse = Role[]

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
