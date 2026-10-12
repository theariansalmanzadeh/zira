'use client'

import { useMemo } from 'react'
import type {
    RegistrationRequestListItem,
    RegistrationRequestStatus,
} from '@/src/api/types/admin/customers'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from '../components/TableHeader'
import { useListRegistrationRequests } from '../hooks/customers'
import { REQUEST_TABLE_COLOUMN } from '../constants'
import TableRow, {
    type CustomerRequestRowData,
    type CustomerRequestStatus,
} from './components/TableRow'

const mapStatus = (
    status: RegistrationRequestStatus
): CustomerRequestStatus => {
    switch (status) {
        case 'APPROVED':
            return 'approved'
        case 'REJECTED':
            return 'rejected'
        default:
            return 'pending'
    }
}

const mapRequestToRow = (
    item: RegistrationRequestListItem
): CustomerRequestRowData => ({
    id: item.id,
    requestNo: item.request_no,
    name: item.full_name || item.customer_store_name || '—',
    level: null,
    nationalId: null,
    licenseNumber: null,
    status: mapStatus(item.status),
})

const RequestList = () => {
    const { data, isPending, isError } = useListRegistrationRequests()

    const requests = useMemo(
        () => (data?.results ?? []).map(mapRequestToRow),
        [data]
    )

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                hasHeaderActions={false}
                TableColoumn={REQUEST_TABLE_COLOUMN}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    {isPending ? (
                        <TableLoadingSkeleton isPending rows={5} />
                    ) : isError ? (
                        <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                            دریافت لیست درخواست‌ها با خطا مواجه شد.
                        </div>
                    ) : requests.length === 0 ? (
                        <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                            درخواستی یافت نشد.
                        </div>
                    ) : (
                        <Table className='border-collapse border-spacing-y-4'>
                            <TableHeader />
                            <TableBody>
                                {requests.map((request) => (
                                    <TableRow
                                        key={request.id}
                                        data={request}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
                <TablePagination
                    className='mt-2'
                    totalAmount={data?.total ?? 0}
                />
            </TableListLayout>
        </div>
    )
}

export default RequestList
