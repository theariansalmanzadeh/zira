'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, {
    type PreparationExitFilterTab,
    type PreparationExitRowData,
} from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

export const PREPARATION_EXIT_DUMMY: PreparationExitRowData[] = [
    {
        id: 'PCK-5530',
        orderId: 'PO-982032',
        customerName: 'نام مشتری',
        itemCount: '54 قلم',
        status: 'preparing',
        filterTab: 'confirmed',
    },
    {
        id: 'PCK-5529',
        orderId: 'PO-982031',
        customerName: 'نام مشتری',
        itemCount: '190 قلم',
        status: 'shipped',
        filterTab: 'confirmed',
    },
    {
        id: 'PCK-5528',
        orderId: 'PO-982030',
        customerName: 'نام مشتری',
        itemCount: '32 قلم',
        status: 'preparing',
        filterTab: 'pending',
    },
    {
        id: 'PCK-5527',
        orderId: 'PO-982029',
        customerName: 'نام مشتری',
        itemCount: '18 قلم',
        status: 'preparing',
        filterTab: 'unassigned',
    },
]

const PreparationExit = ({
    data = PREPARATION_EXIT_DUMMY,
}: {
    data?: PreparationExitRowData[]
}) => {
    const [statusFilter] = useState<PreparationExitFilterTab>('all')

    const filteredData = useMemo(() => {
        if (statusFilter === 'all') return data
        return data.filter((item) => item.filterTab === statusFilter)
    }, [data, statusFilter])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={statusFilter}
                toggleButtonValue={ROUTE_CONFIGS.preparationExit.TOGGLE_BUTTON_VALUE}
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

export default PreparationExit
