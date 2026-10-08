'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    assignTicket,
    closeTicket,
    createTicket,
    downloadSupportAttachment,
    evaluateSla,
    exportTickets,
    getSupportCalendar,
    getTicket,
    listDepartmentAssignees,
    listSlaBreaches,
    listSupportDepartments,
    listTicketMessages,
    listTickets,
    listTicketsForTarget,
    reopenTicket,
    replyTicketMessage,
    transferTicketDepartment,
    updateSupportCalendar,
    updateTicketPriority,
} from '@/src/api/admin/support'
import type {
    AssignTicketRequest,
    CloseTicketRequest,
    CreateTicketRequest,
    EvaluateSlaRequest,
    ExportTicketsParams,
    ListSlaBreachesParams,
    ListTicketMessagesParams,
    ListTicketsParams,
    ReopenTicketRequest,
    ReplyTicketMessageRequest,
    TicketsForTargetParams,
    TransferTicketDepartmentRequest,
    UpdateSupportCalendarRequest,
    UpdateTicketPriorityRequest,
} from '@/src/api/types/admin/support'

export const supportKeys = {
    all: ['support'] as const,
    departments: () => [...supportKeys.all, 'departments'] as const,
    assignees: (departmentId: string, branchId?: string | null) =>
        [...supportKeys.departments(), departmentId, 'assignees', branchId ?? null] as const,
    calendar: () => [...supportKeys.all, 'calendar'] as const,
    slaBreaches: (params?: ListSlaBreachesParams) =>
        [...supportKeys.all, 'sla-breaches', params ?? {}] as const,
    tickets: () => [...supportKeys.all, 'tickets'] as const,
    ticketList: (params?: ListTicketsParams) =>
        [...supportKeys.tickets(), 'list', params ?? {}] as const,
    ticketsForTarget: (params: TicketsForTargetParams) =>
        [...supportKeys.tickets(), 'for-target', params] as const,
    ticketDetail: (ticketId: string) =>
        [...supportKeys.tickets(), 'detail', ticketId] as const,
    ticketMessages: (ticketId: string, params?: ListTicketMessagesParams) =>
        [...supportKeys.ticketDetail(ticketId), 'messages', params ?? {}] as const,
}

export const useListSupportDepartments = () => {
    return useQuery({
        queryKey: supportKeys.departments(),
        queryFn: async () => {
            const result = await listSupportDepartments()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListDepartmentAssignees = (
    departmentId: string,
    branchId?: string | null,
    enabled = true
) => {
    return useQuery({
        queryKey: supportKeys.assignees(departmentId, branchId),
        enabled: Boolean(departmentId) && enabled,
        queryFn: async () => {
            const result = await listDepartmentAssignees(departmentId, {
                branch_id: branchId,
            })
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetSupportCalendar = () => {
    return useQuery({
        queryKey: supportKeys.calendar(),
        queryFn: async () => {
            const result = await getSupportCalendar()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateSupportCalendar = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: UpdateSupportCalendarRequest) => {
            const result = await updateSupportCalendar(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: supportKeys.calendar() })
        },
    })
}

export const useListSlaBreaches = (
    params?: ListSlaBreachesParams,
    enabled = true
) => {
    return useQuery({
        queryKey: supportKeys.slaBreaches(params),
        enabled,
        queryFn: async () => {
            const result = await listSlaBreaches(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useEvaluateSla = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: EvaluateSlaRequest = {}) => {
            const result = await evaluateSla(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [...supportKeys.all, 'sla-breaches'],
            })
            queryClient.invalidateQueries({ queryKey: supportKeys.tickets() })
        },
    })
}

export const useExportTickets = () => {
    return useMutation({
        mutationFn: async (params?: ExportTicketsParams) => {
            const result = await exportTickets(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListTicketsForTarget = (
    params: TicketsForTargetParams,
    enabled = true
) => {
    return useQuery({
        queryKey: supportKeys.ticketsForTarget(params),
        enabled:
            Boolean(params.target_type) &&
            Boolean(params.target_id) &&
            enabled,
        queryFn: async () => {
            const result = await listTicketsForTarget(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListTickets = (params?: ListTicketsParams, enabled = true) => {
    return useQuery({
        queryKey: supportKeys.ticketList(params),
        enabled,
        queryFn: async () => {
            const result = await listTickets(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateTicket = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: CreateTicketRequest) => {
            const result = await createTicket(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: supportKeys.tickets() })
        },
    })
}

export const useGetTicket = (ticketId: string, enabled = true) => {
    return useQuery({
        queryKey: supportKeys.ticketDetail(ticketId),
        enabled: Boolean(ticketId) && enabled,
        queryFn: async () => {
            const result = await getTicket(ticketId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateTicketPriority = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            ticketId,
            body,
        }: {
            ticketId: string
            body: UpdateTicketPriorityRequest
        }) => {
            const result = await updateTicketPriority(ticketId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: supportKeys.tickets() })
            queryClient.invalidateQueries({
                queryKey: supportKeys.ticketDetail(data.id),
            })
        },
    })
}

export const useAssignTicket = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            ticketId,
            body,
        }: {
            ticketId: string
            body: AssignTicketRequest
        }) => {
            const result = await assignTicket(ticketId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: supportKeys.tickets() })
            queryClient.invalidateQueries({
                queryKey: supportKeys.ticketDetail(data.id),
            })
        },
    })
}

export const useTransferTicketDepartment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            ticketId,
            body,
        }: {
            ticketId: string
            body: TransferTicketDepartmentRequest
        }) => {
            const result = await transferTicketDepartment(ticketId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: supportKeys.tickets() })
            queryClient.invalidateQueries({
                queryKey: supportKeys.ticketDetail(data.id),
            })
        },
    })
}

export const useCloseTicket = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            ticketId,
            body,
        }: {
            ticketId: string
            body: CloseTicketRequest
        }) => {
            const result = await closeTicket(ticketId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: supportKeys.tickets() })
            queryClient.invalidateQueries({
                queryKey: supportKeys.ticketDetail(data.id),
            })
        },
    })
}

export const useReopenTicket = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            ticketId,
            body,
        }: {
            ticketId: string
            body: ReopenTicketRequest
        }) => {
            const result = await reopenTicket(ticketId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: supportKeys.tickets() })
            queryClient.invalidateQueries({
                queryKey: supportKeys.ticketDetail(data.id),
            })
        },
    })
}

export const useListTicketMessages = (
    ticketId: string,
    params?: ListTicketMessagesParams,
    enabled = true
) => {
    return useQuery({
        queryKey: supportKeys.ticketMessages(ticketId, params),
        enabled: Boolean(ticketId) && enabled,
        queryFn: async () => {
            const result = await listTicketMessages(ticketId, params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useReplyTicketMessage = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            ticketId,
            body,
        }: {
            ticketId: string
            body: ReplyTicketMessageRequest
        }) => {
            const result = await replyTicketMessage(ticketId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: supportKeys.ticketDetail(variables.ticketId),
            })
            queryClient.invalidateQueries({
                queryKey: [
                    ...supportKeys.ticketDetail(variables.ticketId),
                    'messages',
                ],
            })
            queryClient.invalidateQueries({ queryKey: supportKeys.tickets() })
        },
    })
}

export const useDownloadSupportAttachment = () => {
    return useMutation({
        mutationFn: async (attachmentId: string) => {
            const result = await downloadSupportAttachment(attachmentId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}
