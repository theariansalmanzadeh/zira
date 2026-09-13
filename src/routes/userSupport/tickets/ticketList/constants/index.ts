import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

import type { UserTicketRowData } from '../components/TableRow'

export const USER_TICKETS_DUMMY: UserTicketRowData[] = [
    {
        id: 'TC-8271',
        idVariant: 'warning',
        subject: 'خطا در فاکتور',
        department: 'مالی',
        status: 'waitingResponse',
        lastActivity: '۶ ساعت پیش',
    },
    {
        id: 'TC-8270',
        idVariant: 'error',
        subject: 'درخواست مرجوعی',
        department: 'انبار',
        status: 'reviewing',
        lastActivity: 'دیروز',
    },
    {
        id: 'TC-8269',
        idVariant: 'success',
        subject: 'پیگیری سفارش',
        department: 'فنی',
        status: 'waitingUser',
        lastActivity: '2025-12-09T14:53:00.000Z',
    },
    {
        id: 'TC-8268',
        idVariant: 'warning',
        subject: 'مشکل پرداخت',
        department: 'مالی',
        status: 'waitingResponse',
        lastActivity: '۲ ساعت پیش',
    },
    {
        id: 'TC-8267',
        idVariant: 'success',
        subject: 'تأیید موجودی',
        department: 'انبار',
        status: 'closed',
        lastActivity: '2025-12-08T10:40:00.000Z',
    },
    {
        id: 'TC-8266',
        idVariant: 'error',
        subject: 'تغییر آدرس ارسال',
        department: 'فنی',
        status: 'reviewing',
        lastActivity: '۸ دقیقه پیش',
    },
    {
        id: 'TC-8265',
        idVariant: 'warning',
        subject: 'درخواست فاکتور رسمی',
        department: 'مالی',
        status: 'waitingUser',
        lastActivity: 'دیروز',
    },
    {
        id: 'TC-8264',
        idVariant: 'success',
        subject: 'گزارش خرابی کالا',
        department: 'انبار',
        status: 'closed',
        lastActivity: '2025-12-07T08:15:00.000Z',
    },
]

export const filterUserTickets = (
    tickets: UserTicketRowData[],
    filter: string
) => {
    switch (filter) {
        case 'open':
            return tickets.filter((ticket) => ticket.status !== 'closed')
        case 'pending':
            return tickets.filter((ticket) =>
                ['waitingResponse', 'waitingUser', 'reviewing'].includes(
                    ticket.status
                )
            )
        case 'closed':
            return tickets.filter((ticket) => ticket.status === 'closed')
        default:
            return tickets
    }
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "ticketId", header_label: "شناسه تیکت", isChecked: true },
    { id: "subject", header_label: "موضوع", isChecked: true },
    { id: "department", header_label: "دپارتمان", isChecked: true },
    { id: "status", header_label: "وضعیت", isChecked: true },
    { id: "lastActivity", header_label: "آخرین فعالیت", isChecked: true },
    { id: "actions", header_label: "", isChecked: true, className: "w-[1%]" },
]
