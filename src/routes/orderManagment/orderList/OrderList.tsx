'use client'

import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, {
    type OrderListRowData,
} from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

const ORDER_LIST_DUMMY: OrderListRowData[] = [
    {
        id: 'PO-982032',
        customerName: 'آراد صفوی',
        customerTier: 'سطح طلایی',
        registeredAt: '2025-12-09T14:53:00.000Z',
        itemsCount: 34,
        totalAmount: 7980000,
        settlementType: 'cash',
        status: 'preparing',
        filterTab: 'pending',
    },
    {
        id: 'PO-982031',
        customerName: 'سارا احمدی',
        customerTier: 'سطح نقره‌ای',
        registeredAt: '2025-12-09T12:40:00.000Z',
        itemsCount: 12,
        totalAmount: 2450000,
        settlementType: 'credit',
        status: 'completed',
        filterTab: 'completed',
    },
    {
        id: 'PO-982030',
        customerName: 'رضا کریمی',
        customerTier: 'سطح برنزی',
        registeredAt: '2025-12-08T11:15:00.000Z',
        itemsCount: 8,
        totalAmount: 1120000,
        settlementType: 'cheque',
        status: 'readyToShip',
        filterTab: 'pending',
    },
    {
        id: 'PO-982029',
        customerName: 'مینا رضایی',
        customerTier: 'سطح طلایی',
        registeredAt: '2025-12-08T08:00:00.000Z',
        itemsCount: 21,
        totalAmount: 4320000,
        settlementType: 'cash',
        status: 'awaitingPrep',
        filterTab: 'pending',
    },
    {
        id: 'PO-982028',
        customerName: 'علی محمدی',
        customerTier: 'سطح نقره‌ای',
        registeredAt: '2025-12-07T05:45:00.000Z',
        itemsCount: 5,
        totalAmount: 890000,
        settlementType: 'credit',
        status: 'cancelled',
        filterTab: 'cancelled',
    },
    {
        id: 'PO-982027',
        customerName: 'نگار حسینی',
        customerTier: 'سطح برنزی',
        registeredAt: '2025-12-06T14:20:00.000Z',
        itemsCount: 16,
        totalAmount: 3150000,
        settlementType: 'cheque',
        status: 'returned',
        filterTab: 'returned',
    },
]

const OrderList = () => {
    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                toggleButtonValue={ROUTE_CONFIGS.orderList.TOGGLE_BUTTON_VALUE}
                hasHeaderActions={true}
                TableColoumn={TABLE_COLOUMN}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {ORDER_LIST_DUMMY.map((order) => (
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

export default OrderList
