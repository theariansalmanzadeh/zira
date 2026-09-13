'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, {
    type StockReturnFilterTab,
    type StockReturnRowData,
} from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

export const STOCK_RETURN_DUMMY: StockReturnRowData[] = [
    {
        id: 'RTN-770',
        customerName: 'نام مشتری',
        consignmentId: 'PCK-5530',
        itemCount: '24 قلم',
        status: 'returned-to-stock',
        registeredAt: '2025-12-09T14:53:00.000Z',
    },
    {
        id: 'RTN-769',
        customerName: 'نام مشتری',
        consignmentId: 'PCK-5529',
        itemCount: '24 قلم',
        status: 'awaiting-receipt',
        registeredAt: '2025-12-09T14:53:00.000Z',
        filterTab: 'awaiting-receipt',
    },
    {
        id: 'RTN-768',
        customerName: 'نام مشتری',
        consignmentId: 'PCK-5528',
        itemCount: '24 قلم',
        status: 'quality-check',
        registeredAt: '2025-12-09T14:53:00.000Z',
        filterTab: 'under-review',
    },
    {
        id: 'RTN-767',
        customerName: 'نام مشتری',
        consignmentId: 'PCK-5527',
        itemCount: '12 قلم',
        status: 'quality-check',
        registeredAt: '08/12/1404 - 14:10',
        filterTab: 'under-review',
    },
]

const StockReturn = ({ data = STOCK_RETURN_DUMMY }: { data?: StockReturnRowData[] }) => {
    const [statusFilter] = useState<StockReturnFilterTab>('all')

    const filteredData = useMemo(() => {
        if (statusFilter === 'all') return data
        return data.filter((item) => item.filterTab === statusFilter)
    }, [data, statusFilter])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={statusFilter}
                toggleButtonValue={ROUTE_CONFIGS.stockReturn.TOGGLE_BUTTON_VALUE}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id} data={item} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default StockReturn
