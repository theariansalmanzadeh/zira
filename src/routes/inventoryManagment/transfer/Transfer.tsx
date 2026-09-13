'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type TransferFilterTab, type TransferRowData } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

export const TRANSFER_DUMMY: TransferRowData[] = [
    {
        id: 'TRF-3301',
        origin: 'مرکزی تهران',
        destination: 'شعبه کرج',
        itemCount: '54 قلم',
        status: 'transferred',
        registeredAt: '2025-12-09T14:53:00.000Z',
        filterTab: 'completed',
    },
    {
        id: 'TRF-3300',
        origin: 'مرکزی تهران',
        destination: 'شعبه اصفهان',
        itemCount: '32 قلم',
        status: 'pending',
        registeredAt: '2025-12-09T11:40:00.000Z',
        filterTab: 'pending',
    },
    {
        id: 'TRF-3299',
        origin: 'شعبه کرج',
        destination: 'مرکزی تهران',
        itemCount: '18 قلم',
        status: 'in-transit',
        registeredAt: '08/12/1404 - 11:45',
        filterTab: 'in-transit',
    },
    {
        id: 'TRF-3298',
        origin: 'شعبه مشهد',
        destination: 'شعبه تبریز',
        itemCount: '41 قلم',
        status: 'transferred',
        registeredAt: '07/12/1404 - 09:20',
        filterTab: 'completed',
    },
]

const Transfer = ({ data = TRANSFER_DUMMY }: { data?: TransferRowData[] }) => {
    const [statusFilter] = useState<TransferFilterTab>('all')

    const filteredData = useMemo(() => {
        if (statusFilter === 'all') return data
        return data.filter((item) => item.filterTab === statusFilter)
    }, [data, statusFilter])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={statusFilter}
                toggleButtonValue={ROUTE_CONFIGS.transfer.TOGGLE_BUTTON_VALUE}
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

export default Transfer
