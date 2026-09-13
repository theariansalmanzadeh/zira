'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type WasteFilterTab, type WasteRowData } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

export const WASTE_DUMMY: WasteRowData[] = [
    {
        id: 'SCR-450',
        productTitle: 'عنوان کالا',
        quantity: 4,
        reason: 'معیوب از مرجوعی',
        registeredAt: '2025-12-09T14:53:00.000Z',
        totalAmount: '-',
        status: 'under-review',
        filterTab: 'under-review',
    },
    {
        id: 'SCR-449',
        productTitle: 'عنوان کالا',
        quantity: 4,
        reason: 'آسیب در انبار',
        registeredAt: '2025-12-09T14:53:00.000Z',
        totalAmount: '-',
        status: 'under-review',
        filterTab: 'under-review',
    },
    {
        id: 'SCR-448',
        productTitle: 'عنوان کالا',
        quantity: 2,
        reason: 'آسیب در انبار',
        registeredAt: '08/12/1404 - 11:10',
        totalAmount: '1,200,000',
        status: 'approved',
        filterTab: 'approved',
    },
    {
        id: 'SCR-447',
        productTitle: 'عنوان کالا',
        quantity: 1,
        reason: 'معیوب از مرجوعی',
        registeredAt: '07/12/1404 - 09:45',
        totalAmount: '-',
        status: 'rejected',
        filterTab: 'rejected',
    },
]

const WasteTable = ({ data = WASTE_DUMMY }: { data?: WasteRowData[] }) => {
    const [statusFilter] = useState<WasteFilterTab>('all')

    const filteredData = useMemo(() => {
        if (statusFilter === 'all') return data
        return data.filter((item) => item.filterTab === statusFilter)
    }, [data, statusFilter])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={statusFilter}
                toggleButtonValue={ROUTE_CONFIGS.waste.TOGGLE_BUTTON_VALUE}
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

export default WasteTable
