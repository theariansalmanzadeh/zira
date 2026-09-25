'use client'

import { Pill } from '@/src/shared/components/ui/Pill'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import {
    LOCATION_TYPE_LABEL,
    STATUS_CONFIG,
    type BranchStockRow,
} from '../constants'

type TableRowProps = {
    data: BranchStockRow
}

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable()
    const status = STATUS_CONFIG[data.status]
    const isBelowMinimum = data.stock < data.minStock

    return (
        <>
            <UiTableRow className='[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal'>
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <span
                            dir='ltr'
                            className='inline-block text-right text-outline'
                        >
                            {data.productCode}
                        </span>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{data.productName}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>
                        <div className='flex min-w-0 flex-col items-start gap-1.5'>
                            <span className='rounded-md bg-info-container px-2 py-0.5 text-label-md text-on-info-container'>
                                {LOCATION_TYPE_LABEL[data.locationType]}
                            </span>
                            <span className='truncate text-on-surface'>
                                {data.locationName}
                            </span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell
                        className={cn(
                            'font-semibold',
                            isBelowMinimum ? 'text-warning' : 'text-on-surface'
                        )}
                    >
                        {formatFaNumber(data.stock)}
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{formatFaNumber(data.minStock)}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        {formatPrice(data.stockValue)}{' '}
                        <span className='text-outline'>ت</span>
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>
                        <Pill
                            text={status.text}
                            variant={status.variant}
                            className='border-0'
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

export default TableRow
