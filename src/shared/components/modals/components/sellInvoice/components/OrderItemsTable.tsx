'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import type { SellInvoiceItem } from '../types'

type OrderItemsTableProps = {
    items: SellInvoiceItem[]
}

const OrderItemsTable = ({ items }: OrderItemsTableProps) => {
    return (
        <div className="overflow-hidden rounded-[12px] border border-outline-variant">
            <Table>
                <TableHeader className="bg-surface-container-high">
                    <TableRow className="hover:bg-transparent [&>*]:text-label-sm [&>*]:font-bold [&>*]:text-outline">
                        <TableHead>ردیف</TableHead>
                        <TableHead>شرح کالا</TableHead>
                        <TableHead className="text-center">تعداد</TableHead>
                        <TableHead className="text-left">فی واحد</TableHead>
                        <TableHead className="text-left">مبلغ کل</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow
                            key={item.row}
                            className="border-b border-outline-variant/60 hover:bg-transparent [&>*]:text-label-md [&>*]:text-on-surface-variant"
                        >
                            <TableCell className="text-outline py-3!">
                                {formatFaNumber(item.row)}
                            </TableCell>
                            <TableCell className="font-semibold text-on-surface">
                                {item.name}
                            </TableCell>
                            <TableCell className="text-center">
                                {formatFaNumber(item.qty)}
                            </TableCell>
                            <TableCell className="text-left">
                                {formatPrice(item.unitPrice)}
                            </TableCell>
                            <TableCell className="text-left font-bold text-on-surface">
                                {formatPrice(item.amount)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default OrderItemsTable
