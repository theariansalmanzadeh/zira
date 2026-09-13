"use client"

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableHeader from '../components/TableHeader'
import TicketRow, { type TicketRowData } from '../components/TableRow'
import { TABLE_COLOUMN } from '../constants'

const TICKET_DUMMY: TicketRowData[] = [
    {
        id: 'TC-8271',
        idVariant: 'success',
        contact: 'آراد صفوی',
        subject: 'درخواست مرجوعی',
        department: 'انبار',
        status: 'open',
        lastActivity: '۸ دقیقه پیش',
    },
    {
        id: 'TC-8270',
        idVariant: 'warning',
        contact: 'سارا احمدی',
        subject: 'پیگیری سفارش',
        department: 'فنی',
        status: 'waiting',
        lastActivity: 'دیروز',
    },
    {
        id: 'TC-8269',
        idVariant: 'error',
        contact: 'رضا کریمی',
        subject: 'مشکل پرداخت',
        department: 'مالی',
        status: 'reviewing',
        lastActivity: '2025-12-09T14:53:00.000Z',
    },
    {
        id: 'TC-8268',
        idVariant: 'success',
        contact: 'مینا رضایی',
        subject: 'تأیید موجودی',
        department: 'انبار',
        status: 'closed',
        lastActivity: '2025-12-08T10:40:00.000Z',
    },
    {
        id: 'TC-8267',
        idVariant: 'warning',
        contact: 'علی محمدی',
        subject: 'تغییر آدرس ارسال',
        department: 'فنی',
        status: 'open',
        lastActivity: '۲ ساعت پیش',
    },
]

const filterTickets = (tickets: TicketRowData[], filter: string) => {
    switch (filter) {
        case 'open':
            return tickets.filter((ticket) => ticket.status === 'open')
        case 'pending':
            return tickets.filter((ticket) => ticket.status === 'waiting' || ticket.status === 'reviewing')
        case 'closed':
            return tickets.filter((ticket) => ticket.status === 'closed')
        default:
            return tickets
    }
}

const Tickets = () => {
    const [activeFilter] = useState('all')
    const filteredTickets = useMemo(
        () => filterTickets(TICKET_DUMMY, activeFilter),
        [activeFilter]
    )

    return (
        <div className='flex flex-col gap-3'>
            <div className='mt-3'>
                <span className='text-label-md text-outline'>
                    تیکت ها
                </span>
            </div>

            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={activeFilter}
                hasHeaderActions={true}
                toggleButtonValue={ROUTE_CONFIGS.tickets.TOGGLE_BUTTON_VALUE}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {filteredTickets.map((ticket) => (
                                <TicketRow key={ticket.id} data={ticket} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination className='mt-2' totalAmount={100} />
            </TableListLayout>
        </div>
    )
}

export default Tickets
