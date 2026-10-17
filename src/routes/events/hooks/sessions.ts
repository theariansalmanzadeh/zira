'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { revokeSession } from '@/src/api/admin/sessions'
import {
    clearSessionLimit,
    clearSessionTimeout,
    getActiveSession,
    listActiveSessions,
    listSessionLimits,
    listSessionTimeouts,
    setSessionLimit,
    setSessionTimeout,
    terminateActiveSession,
} from '@/src/api/admin/securityAndEvents'
import type {
    ListActiveSessionsParams,
    ListSessionRulesParams,
    SessionLimitRequest,
    SessionTerminateRequest,
    SessionTimeoutRequest,
} from '@/src/api/types/admin/securityAndEvents'

export const activeSessionKeys = {
    all: ['events', 'sessions', 'active'] as const,
    lists: () => [...activeSessionKeys.all, 'list'] as const,
    list: (params?: ListActiveSessionsParams) =>
        [...activeSessionKeys.lists(), params ?? {}] as const,
    detail: (sessionId: string) =>
        [...activeSessionKeys.all, sessionId] as const,
    limits: (params?: ListSessionRulesParams) =>
        [...activeSessionKeys.all, 'limits', params ?? {}] as const,
    timeouts: (params?: ListSessionRulesParams) =>
        [...activeSessionKeys.all, 'timeouts', params ?? {}] as const,
}

export const useListActiveSessions = (params?: ListActiveSessionsParams) => {
    return useQuery({
        queryKey: activeSessionKeys.list(params),
        queryFn: async () => {
            const result = await listActiveSessions(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useRevokeSession = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (sessionId: string) => {
            const result = await revokeSession(sessionId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: activeSessionKeys.all })
        },
    })
}

export const useTerminateActiveSession = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            sessionId,
            body,
        }: {
            sessionId: string
            body?: SessionTerminateRequest
        }) => {
            const result = await terminateActiveSession(sessionId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: activeSessionKeys.all })
        },
    })
}

export const useListSessionLimits = (params?: ListSessionRulesParams) => {
    return useQuery({
        queryKey: activeSessionKeys.limits(params),
        queryFn: async () => {
            const result = await listSessionLimits(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useSetSessionLimit = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: SessionLimitRequest) => {
            const result = await setSessionLimit(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: activeSessionKeys.all })
        },
    })
}

export const useClearSessionLimit = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (ruleId: string) => {
            const result = await clearSessionLimit(ruleId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: activeSessionKeys.all })
        },
    })
}

export const useListSessionTimeouts = (params?: ListSessionRulesParams) => {
    return useQuery({
        queryKey: activeSessionKeys.timeouts(params),
        queryFn: async () => {
            const result = await listSessionTimeouts(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useSetSessionTimeout = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: SessionTimeoutRequest) => {
            const result = await setSessionTimeout(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: activeSessionKeys.all })
        },
    })
}

export const useClearSessionTimeout = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (ruleId: string) => {
            const result = await clearSessionTimeout(ruleId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: activeSessionKeys.all })
        },
    })
}

export const useGetActiveSession = (sessionId: string) => {
    return useQuery({
        queryKey: activeSessionKeys.detail(sessionId),
        queryFn: async () => {
            const result = await getActiveSession(sessionId)
            if (!result.success) throw result.error
            return result.data
        },
        enabled: Boolean(sessionId),
    })
}
