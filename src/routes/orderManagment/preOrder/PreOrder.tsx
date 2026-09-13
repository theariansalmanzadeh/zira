'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type PreOrderFilterTab, type PreOrderRowData } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

const PRE_ORDER_DUMMY: PreOrderRowData[] = [
    {
        id: 'PO-982032',
        customerName: 'مهرا راد',
        customerTier: 'سطح برنزی',
        registeredAt: '2025-12-09T14:53:00.000Z',
        productName: 'سوتین پوش‌آپ گیپور',
        productCode: 'PC-2216',
        quantity: 100,
        settlementType: 'credit',
        status: 'confirmed',
        filterTab: 'confirmed',
    },
    {
        id: 'PO-982031',
        customerName: 'آترین کشاورز',
        customerTier: 'سطح طلایی',
        registeredAt: '2025-12-09T12:40:00.000Z',
        productName: 'بادی کبریتی',
        productCode: 'PC-2216',
        quantity: 240,
        settlementType: 'cash',
        status: 'pendingPayment',
        filterTab: 'pendingPayment',
    },
    {
        id: 'PO-982030',
        customerName: 'مهسا صفوی',
        customerTier: 'سطح نقره‌ای',
        registeredAt: '2025-12-08T11:15:00.000Z',
        productName: 'سوتین پوش‌آپ گیپور',
        productCode: 'PC-2216',
        quantity: 140,
        settlementType: 'cheque',
        status: 'cancelled',
        filterTab: 'cancelled',
    },
    {
        id: 'PO-982029',
        customerName: 'نگار حسینی',
        customerTier: 'سطح برنزی',
        registeredAt: '2025-12-08T08:00:00.000Z',
        productName: 'بادی کبریتی',
        productCode: 'PC-2216',
        quantity: 600,
        settlementType: 'credit',
        status: 'rejected',
        filterTab: 'rejected',
    },
    {
        id: 'PO-982028',
        customerName: 'سارا احمدی',
        customerTier: 'سطح طلایی',
        registeredAt: '2025-12-07T05:45:00.000Z',
        productName: 'سوتین پوش‌آپ گیپور',
        productCode: 'PC-2216',
        quantity: 120,
        settlementType: 'cash',
        status: 'confirmed',
        filterTab: 'confirmed',
    },
]

const filterPreOrders = (orders: PreOrderRowData[], filter: string) => {
    if (filter === 'all') return orders
    return orders.filter((order) => order.filterTab === filter)
}

const PreOrder = () => {
    const [activeFilter] = useState<PreOrderFilterTab | string>('all')

    const filteredOrders = useMemo(
        () => filterPreOrders(PRE_ORDER_DUMMY, activeFilter),
        [activeFilter]
    )

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={activeFilter}
                toggleButtonValue={ROUTE_CONFIGS.preOrder.TOGGLE_BUTTON_VALUE}
                hasHeaderActions={true}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.id} data={order} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination className='mt-2' totalAmount={100} />
            </TableListLayout>
        </div>
    )
}

export default PreOrder
