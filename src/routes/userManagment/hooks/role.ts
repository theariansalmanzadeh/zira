'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    createRole,
    deleteRole,
    getRole,
    listRoles,
    updateRole,
} from '@/src/api/admin/role'
import type {
    CreateRoleRequest,
    ListRolesParams,
    UpdateRoleRequest,
} from '@/src/api/types/admin/role'

export const roleKeys = {
    all: ['roles'] as const,
    lists: () => [...roleKeys.all, 'list'] as const,
    list: (params?: ListRolesParams) =>
        [...roleKeys.lists(), params ?? {}] as const,
    details: () => [...roleKeys.all, 'detail'] as const,
    detail: (roleId: string) => [...roleKeys.details(), roleId] as const,
}

export const useListRoles = (params?: ListRolesParams) => {
    return useQuery({
        queryKey: roleKeys.list(params),
        queryFn: async () => {
            const result = await listRoles(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetRole = (roleId: string, enabled = true) => {
    return useQuery({
        queryKey: roleKeys.detail(roleId),
        enabled: Boolean(roleId) && enabled,
        queryFn: async () => {
            const result = await getRole(roleId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateRole = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: CreateRoleRequest) => {
            const result = await createRole(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: roleKeys.lists() })
        },
    })
}

export const useUpdateRole = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            roleId,
            body,
        }: {
            roleId: string
            body: UpdateRoleRequest
        }) => {
            const result = await updateRole(roleId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: roleKeys.lists() })
            queryClient.invalidateQueries({
                queryKey: roleKeys.detail(data.id),
            })
        },
    })
}

export const useDeleteRole = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (roleId: string) => {
            const result = await deleteRole(roleId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: roleKeys.lists() })
        },
    })
}
