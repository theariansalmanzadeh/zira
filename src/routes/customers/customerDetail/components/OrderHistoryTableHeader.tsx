'use client'

import {
    TableHead,
    TableHeader as UiHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { ORDER_HISTORY_HEADERS } from '../constants/orderHistory'

const OrderHistoryTableHeader = () => {
    return (
        <UiHeader className="bg-surface-container-high">
            <TableRow className="border-b border-outline-variant hover:bg-transparent [&>*]:text-label-sm [&>*]:font-bold [&>*]:text-outline">
                {ORDER_HISTORY_HEADERS.map((label) => (
                    <TableHead
                        key={label}
                        className={
                            label === 'فاکتور'
                                ? 'text-center'
                                : undefined
                        }
                    >
                        {label}
                    </TableHead>
                ))}
            </TableRow>
        </UiHeader>
    )
}

export default OrderHistoryTableHeader
