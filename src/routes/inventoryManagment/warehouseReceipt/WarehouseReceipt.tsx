'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    TABLE_COLOUMN,
    WAREHOUSE_RECEIPT_DUMMY,
    WAREHOUSE_RECEIPT_TOGGLE,
} from './constants'
import type { WarehouseReceiptRowData, WarehouseReceiptTab } from './types'

const WarehouseReceipt = ({
    data = WAREHOUSE_RECEIPT_DUMMY,
}: {
    data?: WarehouseReceiptRowData[]
}) => {
    const searchParams = useSearchParams()
    const rawFilter = searchParams.get('cat') ?? 'in-progress'
    const tab: WarehouseReceiptTab =
        rawFilter === 'list' ? 'list' : 'in-progress'

    const filteredData = useMemo(() => {
        if (tab === 'list') return data
        return data.filter((item) => item.tab === 'in-progress')
    }, [data, tab])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value='in-progress'
                toggleButtonValue={WAREHOUSE_RECEIPT_TOGGLE}
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

export default WarehouseReceipt
