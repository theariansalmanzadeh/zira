'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

const KARDEX_COLUMNS: TableFilterItem[] = [
    { id: 'date', header_label: 'تاریخ', isChecked: true },
    { id: 'inboundQty', header_label: 'تعداد ورودی', isChecked: true },
    { id: 'inboundDoc', header_label: 'سند ورودی', isChecked: true },
    { id: 'outboundQty', header_label: 'تعداد خروجی', isChecked: true },
    { id: 'outboundDoc', header_label: 'سند خروجی', isChecked: true },
    { id: 'stock', header_label: 'موجودی', isChecked: true },
    { id: 'warehouse', header_label: 'انبار', isChecked: true },
]

export type KardexRow = {
    id: string
    date: string
    inboundQty: number | null
    inboundDoc: string | null
    outboundQty: number | null
    outboundDoc: string | null
    stock: number | null
    warehouse: string | null
}

const displayText = (value: string | null | undefined) =>
    value == null || value.trim() === '' ? '-' : value

const displayQty = (value: number | null | undefined) =>
    value == null ? '-' : formatFaNumber(value)

const KardexHeader = () => {
    const { visibleTableColoumn } = useTable()

    return (
        <TableHeader className='rounded-xl'>
            <TableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-outline'>
                {visibleTableColoumn.map((column) => (
                    <TableHead key={column.id}>{column.header_label}</TableHead>
                ))}
            </TableRow>
        </TableHeader>
    )
}

const KardexTable = ({ rows }: { rows: KardexRow[] }) => {
    const { visibleTableColoumn } = useTable()

    const cells = (row: KardexRow): Record<string, string> => ({
        date: displayText(row.date),
        inboundQty: displayQty(row.inboundQty),
        inboundDoc: displayText(row.inboundDoc),
        outboundQty: displayQty(row.outboundQty),
        outboundDoc: displayText(row.outboundDoc),
        stock: displayQty(row.stock),
        warehouse: displayText(row.warehouse),
    })

    return (
        <div className='rounded-card-lg bg-surface-container-high p-2'>
            <Table className='border-collapse'>
                <KardexHeader />
                <TableBody>
                    {rows.length === 0 ? (
                        <TableEmptyState
                            colSpan={visibleTableColoumn.length || 1}
                            title='گردشی ثبت نشده است.'
                        />
                    ) : null}
                    {rows.map((row) => {
                        const rowCells = cells(row)
                        return (
                            <TableRow key={row.id}>
                                {visibleTableColoumn.map((column) => (
                                    <TableCell key={column.id}>
                                        {rowCells[column.id]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

const Kardex = ({ rows = [] }: { rows?: KardexRow[] }) => (
    <TableListLayout
        TableColoumn={KARDEX_COLUMNS}
        hasHeaderActions={false}
        hasSearch={false}
        hasFilter={false}
        hasSort={false}
        hasTableSettings={false}
        hasExpand={false}
    >
        <KardexTable rows={rows} />
    </TableListLayout>
)

export default Kardex
