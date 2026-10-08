'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { revokeSession } from '@/src/api/admin/sessions'
import { userKeys } from './user'

export const useRevokeSession = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (sessionId: string) => {
            const result = await revokeSession(sessionId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all })
        },
    })
}
