import type { TicketAdminDetail, TicketAdminListItem } from '@/src/api/types/admin/support'
import type { VariantProps } from 'class-variance-authority'
import type { PillVariants } from '@/src/shared/components/ui/Pill'
import type {
    TicketIdVariant,
    TicketRowData,
    TicketStatus,
} from '../components/TableRow'

type PillVariant = VariantProps<typeof PillVariants>['variant']

export const mapApiStatusToRowStatus = (status: string): TicketStatus => {
    switch (status) {
        case 'WAITING':
            return 'waiting'
        case 'ANSWERED':
            return 'reviewing'
        case 'CLOSED':
            return 'closed'
        default:
            return 'open'
    }
}

export const mapPriorityToIdVariant = (
    priority: string,
    isSlaBreached?: boolean
): TicketIdVariant => {
    if (isSlaBreached) return 'error'
    switch (priority) {
        case 'URGENT':
            return 'error'
        case 'IMPORTANT':
            return 'warning'
        default:
            return 'success'
    }
}

export const mapTicketListItemToRow = (
    ticket: TicketAdminListItem
): TicketRowData => ({
    id: ticket.id,
    trackingCode: ticket.tracking_code,
    idVariant: mapPriorityToIdVariant(
        ticket.priority,
        ticket.is_sla_breached
    ),
    contact: ticket.contact_name,
    subject: ticket.subject,
    department: ticket.department_name ?? '—',
    status: mapApiStatusToRowStatus(ticket.status),
    lastActivity: ticket.updated_at || ticket.replied_at || ticket.created_at,
})

export const getTicketStatusLabel = (status: string) => {
    switch (status) {
        case 'WAITING':
            return 'منتظر پاسخ'
        case 'ANSWERED':
            return 'پاسخ‌داده‌شده'
        case 'CLOSED':
            return 'بسته'
        default:
            return status
    }
}

export const getTicketStatusVariant = (status: string): PillVariant => {
    switch (status) {
        case 'WAITING':
            return 'warning'
        case 'ANSWERED':
            return 'success'
        case 'CLOSED':
            return 'tonal'
        default:
            return 'info'
    }
}

export const getContactRoleLabel = (role: string) => {
    switch (role) {
        case 'CUSTOMER':
            return 'مشتری'
        case 'VISITOR':
            return 'بازدیدکننده'
        default:
            return role || '—'
    }
}

export const getPriorityLabel = (priority: string) => {
    switch (priority) {
        case 'URGENT':
            return 'فوری'
        case 'IMPORTANT':
            return 'مهم'
        case 'NORMAL':
            return 'عادی'
        default:
            return priority
    }
}

export const TICKET_STATUS_OPTIONS = [
    { label: 'منتظر پاسخ', value: 'WAITING' },
    { label: 'پاسخ‌داده‌شده', value: 'ANSWERED' },
    { label: 'بسته', value: 'CLOSED' },
]

export const TICKET_PRIORITY_OPTIONS = [
    { label: 'فوری', value: 'URGENT' },
    { label: 'مهم', value: 'IMPORTANT' },
    { label: 'عادی', value: 'NORMAL' },
]

export type TicketDetailView = {
    id: string
    trackingCode: string
    subject: string
    status: string
    statusText: string
    statusVariant: PillVariant
    contactName: string
    contactRole: string
    departmentName: string
    relatedEntity: string
    createdAt: string
    assigneeLabel: string
    priority: string
    dueAt?: string | null
    isSlaBreached?: boolean
    firstResponseMinutes?: number | null
}

export const mapTicketDetailToView = (
    ticket: TicketAdminDetail
): TicketDetailView => ({
    id: ticket.id,
    trackingCode: ticket.tracking_code,
    subject: ticket.subject,
    status: ticket.status,
    statusText: getTicketStatusLabel(ticket.status),
    statusVariant: getTicketStatusVariant(ticket.status),
    contactName: ticket.contact_name,
    contactRole: getContactRoleLabel(ticket.contact_role),
    departmentName: ticket.department_name ?? '—',
    relatedEntity: ticket.category_name || ticket.category_code || '—',
    createdAt: ticket.created_at,
    assigneeLabel: ticket.assigned_to_id ? 'اپراتور تخصیص‌یافته' : 'تخصیص‌نشده',
    priority: ticket.priority,
    dueAt: ticket.due_at,
    isSlaBreached: ticket.is_sla_breached,
    firstResponseMinutes: ticket.first_response_minutes,
})
