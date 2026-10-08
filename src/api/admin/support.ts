import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthGet,
    staffAuthGetBlob,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../http'
import type {
    AssignTicketRequest,
    AssignTicketResponse,
    CloseTicketRequest,
    CloseTicketResponse,
    CreateTicketRequest,
    CreateTicketResponse,
    EvaluateSlaRequest,
    EvaluateSlaResponse,
    ExportTicketsParams,
    GetSupportCalendarResponse,
    GetTicketResponse,
    ListDepartmentAssigneesResponse,
    ListSlaBreachesParams,
    ListSlaBreachesResponse,
    ListSupportDepartmentsResponse,
    ListTicketMessagesParams,
    ListTicketMessagesResponse,
    ListTicketsParams,
    ListTicketsResponse,
    ReopenTicketRequest,
    ReopenTicketResponse,
    ReplyTicketMessageRequest,
    ReplyTicketMessageResponse,
    TicketsForTargetParams,
    TicketsForTargetResponse,
    TransferTicketDepartmentRequest,
    TransferTicketDepartmentResponse,
    UpdateSupportCalendarRequest,
    UpdateSupportCalendarResponse,
    UpdateTicketPriorityRequest,
    UpdateTicketPriorityResponse,
} from '../types/admin/support'

const appendFormValue = (
    formData: FormData,
    key: string,
    value: string | Blob | null | undefined
) => {
    if (value === undefined || value === null) return
    formData.append(key, value)
}

const toCreateTicketFormData = (body: CreateTicketRequest) => {
    const formData = new FormData()
    formData.append('subject', body.subject)
    formData.append('department_id', body.department_id)
    formData.append('body', body.body)
    appendFormValue(formData, 'priority', body.priority)
    appendFormValue(formData, 'owner_user_id', body.owner_user_id)
    appendFormValue(formData, 'contact_name', body.contact_name)
    appendFormValue(formData, 'phone', body.phone)
    appendFormValue(formData, 'email', body.email)
    appendFormValue(formData, 'branch_id', body.branch_id)
    appendFormValue(formData, 'target_type', body.target_type)
    appendFormValue(formData, 'target_id', body.target_id)
    body.files?.forEach((file) => formData.append('files', file))
    return formData
}

const toReplyMessageFormData = (body: ReplyTicketMessageRequest) => {
    const formData = new FormData()
    formData.append('body', body.body)
    body.files?.forEach((file) => formData.append('files', file))
    return formData
}

const multipartConfig = (
    config?: AxiosRequestConfig
): AxiosRequestConfig => ({
    ...config,
    headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
    },
})

export const listSupportDepartments = (config?: AxiosRequestConfig) =>
    staffAuthGet<ListSupportDepartmentsResponse>(
        '/support/departments',
        config
    )

export const listDepartmentAssignees = (
    departmentId: string,
    params?: { branch_id?: string | null },
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListDepartmentAssigneesResponse>(
        `/support/departments/${departmentId}/assignees`,
        {
            ...config,
            params: {
                ...config?.params,
                ...params,
            },
        }
    )

export const getSupportCalendar = (config?: AxiosRequestConfig) =>
    staffAuthGet<GetSupportCalendarResponse>('/support/calendar', config)

export const updateSupportCalendar = (
    body: UpdateSupportCalendarRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<UpdateSupportCalendarResponse, UpdateSupportCalendarRequest>(
        '/support/calendar',
        body,
        config
    )

export const listSlaBreaches = (
    params?: ListSlaBreachesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListSlaBreachesResponse>('/support/sla-breaches', {
        ...config,
        params: {
            ...config?.params,
            ...params,
        },
    })

export const evaluateSla = (
    body: EvaluateSlaRequest = {},
    config?: AxiosRequestConfig
) =>
    staffAuthPost<EvaluateSlaResponse, EvaluateSlaRequest>(
        '/support/sla/evaluate',
        body,
        config
    )

export const exportTickets = (
    params?: ExportTicketsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob('/support/tickets/export', {
        ...config,
        params: {
            ...config?.params,
            ...params,
        },
    })

export const listTicketsForTarget = (
    params: TicketsForTargetParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<TicketsForTargetResponse>('/support/tickets/for-target', {
        ...config,
        params: {
            ...config?.params,
            ...params,
        },
    })

export const listTickets = (
    params?: ListTicketsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListTicketsResponse>('/support/tickets', {
        ...config,
        params: {
            ...config?.params,
            ...params,
        },
    })

export const createTicket = (
    body: CreateTicketRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CreateTicketResponse, FormData>(
        '/support/tickets',
        toCreateTicketFormData(body),
        multipartConfig(config)
    )

export const getTicket = (ticketId: string, config?: AxiosRequestConfig) =>
    staffAuthGet<GetTicketResponse>(`/support/tickets/${ticketId}`, config)

export const updateTicketPriority = (
    ticketId: string,
    body: UpdateTicketPriorityRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateTicketPriorityResponse, UpdateTicketPriorityRequest>(
        `/support/tickets/${ticketId}`,
        body,
        config
    )

export const assignTicket = (
    ticketId: string,
    body: AssignTicketRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<AssignTicketResponse, AssignTicketRequest>(
        `/support/tickets/${ticketId}/assign`,
        body,
        config
    )

export const transferTicketDepartment = (
    ticketId: string,
    body: TransferTicketDepartmentRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<
        TransferTicketDepartmentResponse,
        TransferTicketDepartmentRequest
    >(`/support/tickets/${ticketId}/department`, body, config)

export const closeTicket = (
    ticketId: string,
    body: CloseTicketRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CloseTicketResponse, CloseTicketRequest>(
        `/support/tickets/${ticketId}/close`,
        body,
        config
    )

export const reopenTicket = (
    ticketId: string,
    body: ReopenTicketRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ReopenTicketResponse, ReopenTicketRequest>(
        `/support/tickets/${ticketId}/reopen`,
        body,
        config
    )

export const listTicketMessages = (
    ticketId: string,
    params?: ListTicketMessagesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListTicketMessagesResponse>(
        `/support/tickets/${ticketId}/messages`,
        {
            ...config,
            params: {
                ...config?.params,
                ...params,
            },
        }
    )

export const replyTicketMessage = (
    ticketId: string,
    body: ReplyTicketMessageRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ReplyTicketMessageResponse, FormData>(
        `/support/tickets/${ticketId}/messages`,
        toReplyMessageFormData(body),
        multipartConfig(config)
    )

export const downloadSupportAttachment = (
    attachmentId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(
        `/support/attachments/${attachmentId}/download`,
        config
    )
