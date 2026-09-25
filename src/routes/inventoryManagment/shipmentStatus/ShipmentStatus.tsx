'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    SHIPMENT_STATUS_DUMMY,
    SHIPMENT_STATUS_TOGGLE,
    TABLE_COLOUMN,
} from './constants'
import type { ShipmentStatusFilter, ShipmentStatusRowData } from './types'

const ShipmentStatus = ({
    data = SHIPMENT_STATUS_DUMMY,
}: {
    data?: ShipmentStatusRowData[]
}) => {
    const searchParams = useSearchParams()
    const rawFilter = searchParams.get('cat') ?? 'all'
    const statusFilter = (
        SHIPMENT_STATUS_TOGGLE.some((item) => item.value === rawFilter)
            ? rawFilter
            : 'all'
    ) as ShipmentStatusFilter

    const filteredData = useMemo(() => {
        if (statusFilter === 'all') return data
        return data.filter((item) => item.status === statusFilter)
    }, [data, statusFilter])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value='all'
                toggleButtonValue={[...SHIPMENT_STATUS_TOGGLE]}
            >
                <div className='flex flex-col gap-2 rounded-card-lg bg-surface-container-high p-2'>
                    <TableHeader />
                    {filteredData.map((item) => (
                        <TableRow key={item.id} data={item} />
                    ))}
                </div>
                <TablePagination
                    className='mt-2'
                    totalAmount={filteredData.length}
                />
            </TableListLayout>
        </div>
    )
}

export default ShipmentStatus
