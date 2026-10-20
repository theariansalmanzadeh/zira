import type { PaginatedResponse } from './common'

export type TicketStatus = 'WAITING' | 'ANSWERED' | 'CLOSED'

export type TicketStatusQuery = TicketStatus | 'active'

export type TicketPriority = 'URGENT' | 'IMPORTANT' | 'NORMAL'

export type TicketChannel = 'PANEL' | 'WEB_FORM' | 'ADMIN'

export type TicketDirection = 'INBOUND' | 'OUTBOUND'

export type ContactRole = 'CUSTOMER' | 'VISITOR'

export type SupportDepartmentChoice = {
    id: string
    code: string
    name: string
}

export type SupportEligibleAssignee = {
    id: string
    display_name: string
}

export type SupportCalendar = {
    id: string
    singleton: string
    timezone: string
    work_start_hour: number
    work_end_hour: number
    weekdays: number[]
    closed_dates: string[]
    covered_from?: string | null
    covered_through?: string | null
    revision: number
}

export type UpdateSupportCalendarRequest = {
    closed_dates?: string[] | null
    covered_from?: string | null
    covered_through?: string | null
}

export type TicketAdminListItem = {
    id: string
    tracking_code: string
    subject: string
    department_id?: string | null
    department_name?: string | null
    category_code?: string | null
    category_name?: string | null
    priority: string
    status: string
    channel: string
    direction: string
    contact_name: string
    contact_role: string
    assigned_to_id?: string | null
    branch_id?: string | null
    created_at: string
    updated_at: string
    replied_at?: string | null
    closed_at?: string | null
    due_at?: string | null
    is_sla_breached?: boolean
}

export type TicketAdminDetail = TicketAdminListItem & {
    owner_user_id?: string | null
    contact_id?: string | null
    contact_phone?: string | null
    contact_email?: string | null
    first_replied_at?: string | null
    resolution?: string | null
    last_reopen_reason?: string | null
    first_response_minutes?: number | null
}

export type TicketAdminPage = {
    items: TicketAdminListItem[]
    total: number
    page: number
    page_size: number
}

export type ListTicketsParams = {
    status?: TicketStatusQuery | null
    department_id?: string | null
    category_id?: string | null
    priority?: TicketPriority | null
    channel?: TicketChannel | null
    direction?: TicketDirection | null
    contact_role?: ContactRole | null
    unassigned?: boolean | null
    assigned_to_id?: string | null
    branch_id?: string | null
    date_from?: string | null
    date_to?: string | null
    search?: string | null
    ordering?: string | null
    page?: number
    page_size?: number
}

export type ListSlaBreachesParams = {
    status?: TicketStatus | null
    department_id?: string | null
    category_id?: string | null
    priority?: TicketPriority | null
    page?: number
    page_size?: number
}

export type ExportTicketsParams = Omit<ListTicketsParams, 'page' | 'page_size'>

export type TicketsForTargetParams = {
    target_type: string
    target_id: string
    page?: number
    page_size?: number
}

export type CreateTicketRequest = {
    subject: string
    department_id: string
    body: string
    priority?: TicketPriority
    owner_user_id?: string | null
    contact_name?: string | null
    phone?: string | null
    email?: string | null
    branch_id?: string | null
    target_type?: string | null
    target_id?: string | null
    files?: File[] | null
}

export type UpdateTicketPriorityRequest = {
    priority: TicketPriority
}

export type AssignTicketRequest = {
    assignee_id?: string | null
}

export type TransferTicketDepartmentRequest = {
    department_id: string
    reason: string
}

export type CloseTicketRequest = {
    resolution: string
}

export type ReopenTicketRequest = {
    reason: string
}

export type TicketAttachment = {
    id: string
    original_name: string
    content_type: string
    size_bytes: number
    direction: string
    uploaded_at: string
}

export type TicketMessage = {
    id: string
    sequence: number
    sender_role: string
    sender_name: string
    body: string
    sent_at: string
    is_reply: boolean
    attachments?: TicketAttachment[]
}

export type TicketMessagePage = {
    items: TicketMessage[]
    total: number
}

export type ListTicketMessagesParams = {
    cursor?: number | null
    page_size?: number
}

export type ReplyTicketMessageRequest = {
    body: string
    files?: File[] | null
}

export type EvaluateSlaRequest = {
    ticket_ids?: string[] | null
}

export type EvaluateSlaResponse = {
    scanned: number
    new_breaches: number
}

export type ListSupportDepartmentsResponse =
    PaginatedResponse<SupportDepartmentChoice>
export type ListDepartmentAssigneesResponse =
    PaginatedResponse<SupportEligibleAssignee>
export type GetSupportCalendarResponse = SupportCalendar
export type UpdateSupportCalendarResponse = SupportCalendar
export type ListSlaBreachesResponse = TicketAdminPage
export type ListTicketsResponse = TicketAdminPage
export type TicketsForTargetResponse = TicketAdminPage
export type CreateTicketResponse = TicketAdminDetail
export type GetTicketResponse = TicketAdminDetail
export type UpdateTicketPriorityResponse = TicketAdminDetail
export type AssignTicketResponse = TicketAdminDetail
export type TransferTicketDepartmentResponse = TicketAdminDetail
export type CloseTicketResponse = TicketAdminDetail
export type ReopenTicketResponse = TicketAdminDetail
export type ListTicketMessagesResponse = TicketMessagePage
export type ReplyTicketMessageResponse = TicketMessage
