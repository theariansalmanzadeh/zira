'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    getNotification,
    listNotifications,
    sendNotification,
} from '@/src/api/admin/notification'
import type { SendNotificationRequest } from '@/src/api/types/admin/notification'

export const notificationKeys = {
    all: ['notifications'] as const,
    lists: () => [...notificationKeys.all, 'list'] as const,
    list: () => [...notificationKeys.lists()] as const,
    details: () => [...notificationKeys.all, 'detail'] as const,
    detail: (notificationId: string) =>
        [...notificationKeys.details(), notificationId] as const,
}

export const useListNotifications = () => {
    return useQuery({
        queryKey: notificationKeys.list(),
        queryFn: async () => {
            const result = await listNotifications()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetNotification = (
    notificationId: string,
    enabled = true
) => {
    return useQuery({
        queryKey: notificationKeys.detail(notificationId),
        enabled: Boolean(notificationId) && enabled,
        queryFn: async () => {
            const result = await getNotification(notificationId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useSendNotification = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: SendNotificationRequest) => {
            const result = await sendNotification(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: notificationKeys.lists(),
            })
        },
    })
}
