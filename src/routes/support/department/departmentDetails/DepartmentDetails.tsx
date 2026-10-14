'use client'

import { useMemo } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import type { Department } from '@/src/api/types/admin/department'
import type {
    SupportCalendar,
    SupportDepartmentChoice,
    SupportEligibleAssignee,
    TicketAdminPage,
} from '@/src/api/types/admin/support'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import TableHeader from '@/src/routes/support/tickets/components/TableHeader'
import { mapTicketListItemToRow } from '@/src/routes/support/tickets/utils/mapTicket'
import DepartmentSummary from './components/DepartmentSummary'
import TicketRow from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

const formatHour = (hour: number) =>
    `${formatFaNumber(String(hour).padStart(2, '0'))}:${formatFaNumber('00')}`

type DepartmentDetailsProps = {
    id: string
    departments: SupportDepartmentChoice[]
    assignees: SupportEligibleAssignee[]
    calendar: SupportCalendar | null
    departmentRecord: Department | null
    ticketsPage: TicketAdminPage | null
    isTicketsError: boolean
}

const DepartmentDetails = ({
    id,
    departments,
    assignees,
    calendar,
    departmentRecord,
    ticketsPage,
    isTicketsError,
}: DepartmentDetailsProps) => {
    const department = departments.find((item) => item.id === id)
    const managerName = assignees?.[0]?.display_name || '—'
    const responseHours = calendar
        ? `${formatHour(calendar.work_start_hour)} - ${formatHour(calendar.work_end_hour)}`
        : '—'

    const tickets = useMemo(
        () => (ticketsPage?.items ?? []).map(mapTicketListItemToRow),
        [ticketsPage?.items]
    )

    return (
        <div className='flex flex-col gap-6'>
            <DepartmentSummary
                name={department?.name || departmentRecord?.name || '—'}
                managerName={managerName}
                expertCount={assignees?.length ?? 0}
                responseHours={responseHours}
                description={departmentRecord?.description || '—'}
            />

            <TableListLayout TableColoumn={TABLE_COLOUMN} hasHeaderActions={false}>
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    {isTicketsError ? (
                        <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                            دریافت تیکت‌های دپارتمان با خطا مواجه شد.
                        </div>
                    ) : tickets.length === 0 ? (
                        <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                            تیکتی برای این دپارتمان یافت نشد.
                        </div>
                    ) : (
                        <Table className='border-collapse border-spacing-y-4'>
                            <TableHeader />
                            <TableBody>
                                {tickets.map((ticket) => (
                                    <TicketRow key={ticket.id} data={ticket} />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </TableListLayout>
        </div>
    )
}

export default DepartmentDetails
