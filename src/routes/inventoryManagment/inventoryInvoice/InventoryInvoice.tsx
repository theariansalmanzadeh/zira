'use client'

import { useMemo, useState } from 'react'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, {
    type InventoryInvoiceFilterTab,
    type InventoryInvoiceRowData,
} from './components/TableRow'
import { INVENTORY_INVOICE_DUMMY, TABLE_COLOUMN } from './constants'

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
                <div className='flex flex-col gap-2 rounded-card-lg bg-surface-container-high p-2'>
                    <TableHeader />
                    {filteredData.map((item) => (
                        <TableRow key={item.id} data={item} />
                    ))}
                </div>
            </TableListLayout>
        </div>
    )
}

export default InventoryInvoice
