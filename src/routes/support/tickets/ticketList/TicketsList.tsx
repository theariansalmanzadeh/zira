'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import type { ListTicketsParams, TicketStatusQuery } from '@/src/api/types/admin/support'
import { useListTickets } from '../../hooks/support'
import TableHeader from '../components/TableHeader'
import TicketRow from '../components/TableRow'
import { TABLE_COLOUMN } from '../constants'
import { mapTicketListItemToRow } from '../utils/mapTicket'

const FILTER_TO_STATUS: Record<string, TicketStatusQuery | undefined> = {
    all: undefined,
    open: 'active',
    pending: 'WAITING',
    closed: 'CLOSED',
}

const Tickets = () => {
    const searchParams = useSearchParams()
    const activeFilter = searchParams.get('cat') ?? 'all'

    const listParams = useMemo<ListTicketsParams>(
        () => ({
            status: FILTER_TO_STATUS[activeFilter],
            page: 1,
            page_size: 20,
        }),
        [activeFilter]
    )

    const { data, isPending, isError } = useListTickets(listParams)

    const tickets = useMemo(
        () => (data?.items ?? []).map(mapTicketListItemToRow),
        [data?.items]
    )

    return (
        <div className='flex flex-col gap-3'>
            <div className='mt-3'>
                <span className='text-label-md text-outline'>تیکت ها</span>
            </div>

            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={activeFilter}
                hasHeaderActions={true}
                toggleButtonValue={ROUTE_CONFIGS.tickets.TOGGLE_BUTTON_VALUE}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    {isPending ? (
                        <TableLoadingSkeleton isPending rows={6} />
                    ) : isError ? (
                        <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                            دریافت لیست تیکت‌ها با خطا مواجه شد.
                        </div>
                    ) : tickets.length === 0 ? (
                        <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                            تیکتی یافت نشد.
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
                <TablePagination
                    className='mt-2'
                    page={data?.page ?? 1}
                    totalAmount={data?.total ?? 0}
                />
            </TableListLayout>
        </div>
    )
}

export default Tickets
