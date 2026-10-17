'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import {
    exportActivityLogs,
    getActivityLog,
    getEventType,
    listActivityLogChanges,
    listActivityLogs,
    listEventTypes,
} from '@/src/api/admin/securityAndEvents'
import type {
    ListActivityLogChangesParams,
    ListActivityLogsParams,
    ListEventTypesParams,
} from '@/src/api/types/admin/securityAndEvents'

export const activityLogKeys = {
    all: ['events', 'activity-log'] as const,
    lists: () => [...activityLogKeys.all, 'list'] as const,
    list: (params?: ListActivityLogsParams) =>
        [...activityLogKeys.lists(), params ?? {}] as const,
    detail: (logId: string) => [...activityLogKeys.all, logId] as const,
    changes: (logId: string, params?: ListActivityLogChangesParams) =>
        [...activityLogKeys.detail(logId), 'changes', params ?? {}] as const,
}

export const eventTypeKeys = {
    all: ['events', 'event-types'] as const,
    list: (params?: ListEventTypesParams) =>
        [...eventTypeKeys.all, 'list', params ?? {}] as const,
    detail: (eventTypeId: string) =>
        [...eventTypeKeys.all, eventTypeId] as const,
}

export const useListActivityLogs = (params?: ListActivityLogsParams) => {
    return useQuery({
        queryKey: activityLogKeys.list(params),
        queryFn: async () => {
            const result = await listActivityLogs(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useExportActivityLogs = () => {
    return useMutation({
        mutationFn: async (params?: ListActivityLogsParams) => {
            const result = await exportActivityLogs(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetActivityLog = (logId: string, enabled = true) => {
    return useQuery({
        queryKey: activityLogKeys.detail(logId),
        enabled: Boolean(logId) && enabled,
        queryFn: async () => {
            const result = await getActivityLog(logId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListActivityLogChanges = (
    logId: string,
    params?: ListActivityLogChangesParams,
    enabled = true
) => {
    return useQuery({
        queryKey: activityLogKeys.changes(logId, params),
        enabled: Boolean(logId) && enabled,
        queryFn: async () => {
            const result = await listActivityLogChanges(logId, params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListEventTypes = (params?: ListEventTypesParams) => {
    return useQuery({
        queryKey: eventTypeKeys.list(params),
        queryFn: async () => {
            const result = await listEventTypes(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetEventType = (eventTypeId: string, enabled = true) => {
    return useQuery({
        queryKey: eventTypeKeys.detail(eventTypeId),
        enabled: Boolean(eventTypeId) && enabled,
        queryFn: async () => {
            const result = await getEventType(eventTypeId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}
