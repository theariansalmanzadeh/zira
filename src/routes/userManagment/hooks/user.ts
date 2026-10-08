'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    createUser,
    getUser,
    getUserDepartments,
    grantUserBranches,
    listUserBranches,
    listUserSessions,
    listUsers,
    resetUserPassword,
    revokeUserBranches,
    setUserDepartments,
    updateUser,
    updateUserBranchMaster,
    updateUserStatus,
} from '@/src/api/admin/user'
import type {
    CreateUserRequest,
    SetUserDepartmentsRequest,
    UpdateUserBranchMasterRequest,
    UpdateUserRequest,
    UpdateUserStatusRequest,
    UserBranchAccessRequest,
} from '@/src/api/types/admin/user'

export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: () => [...userKeys.lists()] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (userId: string) => [...userKeys.details(), userId] as const,
    sessions: (userId: string) =>
        [...userKeys.detail(userId), 'sessions'] as const,
    branches: (userId: string) =>
        [...userKeys.detail(userId), 'branches'] as const,
    departments: (userId: string) =>
        [...userKeys.detail(userId), 'departments'] as const,
}

export const useListUsers = () => {
    return useQuery({
        queryKey: userKeys.list(),
        queryFn: async () => {
            const result = await listUsers()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetUser = (userId: string, enabled = true) => {
    return useQuery({
        queryKey: userKeys.detail(userId),
        enabled: Boolean(userId) && enabled,
        queryFn: async () => {
            const result = await getUser(userId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: CreateUserRequest) => {
            const result = await createUser(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() })
        },
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            userId,
            body,
        }: {
            userId: string
            body: UpdateUserRequest
        }) => {
            const result = await updateUser(userId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() })
            queryClient.invalidateQueries({
                queryKey: userKeys.detail(data.id),
            })
        },
    })
}

export const useUpdateUserStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            userId,
            body,
        }: {
            userId: string
            body: UpdateUserStatusRequest
        }) => {
            const result = await updateUserStatus(userId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() })
            queryClient.invalidateQueries({
                queryKey: userKeys.detail(data.id),
            })
        },
    })
}

export const useResetUserPassword = () => {
    return useMutation({
        mutationFn: async (userId: string) => {
            const result = await resetUserPassword(userId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListUserSessions = (userId: string, enabled = true) => {
    return useQuery({
        queryKey: userKeys.sessions(userId),
        enabled: Boolean(userId) && enabled,
        queryFn: async () => {
            const result = await listUserSessions(userId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListUserBranches = (userId: string, enabled = true) => {
    return useQuery({
        queryKey: userKeys.branches(userId),
        enabled: Boolean(userId) && enabled,
        queryFn: async () => {
            const result = await listUserBranches(userId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGrantUserBranches = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            userId,
            body,
        }: {
            userId: string
            body: UserBranchAccessRequest
        }) => {
            const result = await grantUserBranches(userId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: userKeys.branches(variables.userId),
            })
            queryClient.invalidateQueries({
                queryKey: userKeys.detail(variables.userId),
            })
        },
    })
}

export const useRevokeUserBranches = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            userId,
            body,
        }: {
            userId: string
            body: UserBranchAccessRequest
        }) => {
            const result = await revokeUserBranches(userId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: userKeys.branches(variables.userId),
            })
            queryClient.invalidateQueries({
                queryKey: userKeys.detail(variables.userId),
            })
        },
    })
}

export const useUpdateUserBranchMaster = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            userId,
            body,
        }: {
            userId: string
            body: UpdateUserBranchMasterRequest
        }) => {
            const result = await updateUserBranchMaster(userId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() })
            queryClient.invalidateQueries({
                queryKey: userKeys.detail(data.id),
            })
        },
    })
}

export const useGetUserDepartments = (userId: string, enabled = true) => {
    return useQuery({
        queryKey: userKeys.departments(userId),
        enabled: Boolean(userId) && enabled,
        queryFn: async () => {
            const result = await getUserDepartments(userId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useSetUserDepartments = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            userId,
            body,
        }: {
            userId: string
            body: SetUserDepartmentsRequest
        }) => {
            const result = await setUserDepartments(userId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: userKeys.departments(variables.userId),
            })
            queryClient.invalidateQueries({
                queryKey: userKeys.detail(variables.userId),
            })
        },
    })
}
