'use client'

import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ORDER_HISTORY_DUMMY } from '../constants/orderHistory'
import OrderHistoryTableHeader from './OrderHistoryTableHeader'
import OrderHistoryTableRow from './OrderHistoryTableRow'

const OrderHistory = () => {
    return (
        <div
            className="overflow-hidden rounded-card-md border border-outline-variant bg-surface-container-lowest"
            dir="rtl"
        >
            <div className="flex flex-row flex-wrap items-center justify-between gap-2 border-b border-outline-variant px-5 py-4">
                <span className="text-title-md font-semibold text-on-surface">
                    تاریخچه سفارشات
                </span>
                <span className="text-label-sm text-outline">
                    برای مشاهده جزئیات و فاکتور روی هر ردیف کلیک کنید
                </span>
            </div>

            <div className="overflow-x-auto">
                <Table className="min-w-[780px] border-collapse">
                    <OrderHistoryTableHeader />
                    <TableBody>
                        {ORDER_HISTORY_DUMMY.map((order) => (
                            <OrderHistoryTableRow key={order.id} data={order} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default OrderHistory
