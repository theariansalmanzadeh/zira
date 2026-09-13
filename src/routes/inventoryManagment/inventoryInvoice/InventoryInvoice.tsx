'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, {
    type InventoryInvoiceFilterTab,
    type InventoryInvoiceRowData,
} from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

export const INVENTORY_INVOICE_DUMMY: InventoryInvoiceRowData[] = [
    {
        id: 'RCV-9012',
        origin: 'تامین‌کننده پارس‌نخ',
        destination: 'مرکزی تهران',
        itemCount: '54 قلم',
        status: 'final-approval',
        registeredAt: '2025-12-09T14:53:00.000Z',
        filterTab: 'confirmed',
    },
    {
        id: 'RCV-9011',
        origin: 'تامین‌کننده پارس‌نخ',
        destination: 'مرکزی تهران',
        itemCount: '32 قلم',
        status: 'final-approval',
        registeredAt: '08/12/1404 - 14:10',
        filterTab: 'confirmed',
    },
    {
        id: 'RCV-9010',
        origin: 'تامین‌کننده آرتا',
        destination: 'شعبه اصفهان',
        itemCount: '18 قلم',
        status: 'pending',
        registeredAt: '07/12/1404 - 11:45',
        filterTab: 'pending',
    },
    {
        id: 'RCV-9009',
        origin: 'تامین‌کننده پارس‌نخ',
        destination: 'مرکزی تهران',
        itemCount: '12 قلم',
        status: 'draft',
        registeredAt: '06/12/1404 - 09:30',
        filterTab: 'unassigned',
    },
]

const InventoryInvoice = ({
    data = INVENTORY_INVOICE_DUMMY,
}: {
    data?: InventoryInvoiceRowData[]
}) => {
    const [statusFilter] = useState<InventoryInvoiceFilterTab>('all')

    const filteredData = useMemo(() => {
        if (statusFilter === 'all') return data
        return data.filter((item) => item.filterTab === statusFilter)
    }, [data, statusFilter])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={statusFilter}
                toggleButtonValue={ROUTE_CONFIGS.inventoryInvoice.TOGGLE_BUTTON_VALUE}
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

export default InventoryInvoice
