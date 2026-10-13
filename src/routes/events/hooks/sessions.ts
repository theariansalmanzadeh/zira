'use client'

import { useQuery } from '@tanstack/react-query'

import { getActiveSession } from '@/src/api/admin/securityAndEvents'

export const activeSessionKeys = {
    all: ['events', 'sessions', 'active'] as const,
    detail: (sessionId: string) =>
        [...activeSessionKeys.all, sessionId] as const,
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
