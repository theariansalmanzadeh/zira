'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    changeMyPassword,
    dismissStaffNotifications,
    getStaffNotificationPreferences,
    getStaffProfile,
    listStaffNotifications,
    markStaffNotificationsSeen,
    updateStaffNotificationPreferences,
} from '@/src/api/admin/me'
import type {
    ChangeMyPasswordRequest,
    DeliveryActionRequest,
    UpdateStaffNotificationPreferencesRequest,
} from '@/src/api/types/admin/me'

export const meKeys = {
    all: ['me'] as const,
    profile: () => [...meKeys.all, 'profile'] as const,
    notifications: () => [...meKeys.all, 'notifications'] as const,
    preferences: () => [...meKeys.all, 'preferences'] as const,
}

export const useGetStaffProfile = () => {
    return useQuery({
        queryKey: meKeys.profile(),
        retry: false,
        queryFn: async () => {
            const result = await getStaffProfile()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useChangeMyPassword = () => {
    return useMutation({
        mutationFn: async (body: ChangeMyPasswordRequest) => {
            const result = await changeMyPassword(body)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListStaffNotifications = () => {
    return useQuery({
        queryKey: meKeys.notifications(),
        queryFn: async () => {
            const result = await listStaffNotifications()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useMarkStaffNotificationsSeen = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: DeliveryActionRequest) => {
            const result = await markStaffNotificationsSeen(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: meKeys.notifications(),
            })
        },
    })
}

export const useDismissStaffNotifications = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: DeliveryActionRequest) => {
            const result = await dismissStaffNotifications(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: meKeys.notifications(),
            })
        },
    })
}

export const useGetStaffNotificationPreferences = () => {
    return useQuery({
        queryKey: meKeys.preferences(),
        queryFn: async () => {
            const result = await getStaffNotificationPreferences()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateStaffNotificationPreferences = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: UpdateStaffNotificationPreferencesRequest) => {
            const result = await updateStaffNotificationPreferences(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: meKeys.preferences() })
        },
    })
}
