'use client'

import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import {
    formatFaDate,
    formatFaNumber,
    formatPrice,
} from '@/src/shared/libs/formatter'
import type { TransactionRowData } from '../constants/transactions'

type TransactionsTableRowProps = {
    data: TransactionRowData
}

const TransactionsTableRow = ({ data }: TransactionsTableRowProps) => {
    const { TableColoumn } = useTable()
    const {
        row,
        date,
        debit,
        credit,
        description,
        invoiceBalance,
        totalBalance,
    } = data

    return (
        <UiTableRow className="[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant">
            {TableColoumn[0]?.isChecked && (
                <TableCell>{formatFaNumber(row)}</TableCell>
            )}
            {TableColoumn[1]?.isChecked && (
                <TableCell>
                    <span dir="ltr">{formatFaDate(date)}</span>
                </TableCell>
            )}
            {TableColoumn[2]?.isChecked && (
                <TableCell
                    className={debit > 0 ? 'text-error' : undefined}
                >
                    {formatPrice(debit)}
                </TableCell>
            )}
            {TableColoumn[3]?.isChecked && (
                <TableCell
                    className={credit > 0 ? 'text-success' : undefined}
                >
                    {formatPrice(credit)}
                </TableCell>
            )}
            {TableColoumn[4]?.isChecked && (
                <TableCell>{description}</TableCell>
            )}
            {TableColoumn[5]?.isChecked && (
                <TableCell>{formatPrice(invoiceBalance)}</TableCell>
            )}
            {TableColoumn[6]?.isChecked && (
                <TableCell className="font-bold text-on-surface">
                    {formatPrice(totalBalance)}
                </TableCell>
            )}
        </UiTableRow>
    )
}

export default TransactionsTableRow
