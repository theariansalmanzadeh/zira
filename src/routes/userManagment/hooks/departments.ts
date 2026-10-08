'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    createDepartment,
    getDepartment,
    listDepartmentPicker,
    listDepartments,
    updateDepartment,
} from '@/src/api/admin/departments'
import type {
    CreateDepartmentRequest,
    UpdateDepartmentRequest,
} from '@/src/api/types/admin/department'

export const departmentKeys = {
    all: ['departments'] as const,
    lists: () => [...departmentKeys.all, 'list'] as const,
    list: () => [...departmentKeys.lists()] as const,
    pickers: () => [...departmentKeys.all, 'picker'] as const,
    picker: () => [...departmentKeys.pickers()] as const,
    details: () => [...departmentKeys.all, 'detail'] as const,
    detail: (departmentId: string) =>
        [...departmentKeys.details(), departmentId] as const,
}

export const useListDepartmentPicker = () => {
    return useQuery({
        queryKey: departmentKeys.picker(),
        queryFn: async () => {
            const result = await listDepartmentPicker()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListDepartments = () => {
    return useQuery({
        queryKey: departmentKeys.list(),
        queryFn: async () => {
            const result = await listDepartments()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetDepartment = (departmentId: string, enabled = true) => {
    return useQuery({
        queryKey: departmentKeys.detail(departmentId),
        enabled: Boolean(departmentId) && enabled,
        queryFn: async () => {
            const result = await getDepartment(departmentId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateDepartment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: CreateDepartmentRequest) => {
            const result = await createDepartment(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: departmentKeys.lists() })
            queryClient.invalidateQueries({ queryKey: departmentKeys.pickers() })
        },
    })
}

export const useUpdateDepartment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            departmentId,
            body,
        }: {
            departmentId: string
            body: UpdateDepartmentRequest
        }) => {
            const result = await updateDepartment(departmentId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: departmentKeys.lists() })
            queryClient.invalidateQueries({ queryKey: departmentKeys.pickers() })
            queryClient.invalidateQueries({
                queryKey: departmentKeys.detail(data.id),
            })
        },
    })
}
