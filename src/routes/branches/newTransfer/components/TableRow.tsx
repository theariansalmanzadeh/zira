'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { inputFieldClassName } from '@/src/shared/components/ui/Input'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import type { TransferItemRow } from '../constants'

type TableRowProps = {
    data: TransferItemRow
    index: number
    onQuantityChange: (index: number, quantity: number) => void
    onRemove: (index: number) => void
}

const TableRow = ({
    data,
    index,
    onQuantityChange,
    onRemove,
}: TableRowProps) => {
    return (
        <>
            <UiTableRow className='[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal'>
                <TableCell>
                    <span
                        dir='ltr'
                        className='inline-block text-right text-outline'
                    >
                        {data.productCode}
                    </span>
                </TableCell>

                <TableCell>
                    <div className='flex flex-col gap-0.5'>
                        <span className='text-label-lg font-medium text-on-surface'>
                            {data.productName}
                        </span>
                        <span className='text-label-md text-outline'>
                            {formatPrice(data.unitPrice)} ت / واحد
                        </span>
                    </div>
                </TableCell>

                <TableCell>
                    <span className='inline-flex rounded-md bg-surface-container-high px-2.5 py-1 text-label-md text-on-surface-variant'>
                        {data.unit}
                    </span>
                </TableCell>

                <TableCell>{formatFaNumber(data.sourceStock)}</TableCell>

                <TableCell>
                    <input
                        type='number'
                        min={1}
                        max={data.sourceStock}
                        value={data.quantity}
                        onChange={(event) => {
                            const nextValue = Number(event.target.value)
                            if (Number.isNaN(nextValue)) return
                            onQuantityChange(index, nextValue)
                        }}
                        className={cn(
                            inputFieldClassName,
                            'w-20 rounded-md border border-outline-variant bg-surface-container-lowest px-2 py-1.5 text-center'
                        )}
                    />
                </TableCell>

                <TableCell className='w-[1%] whitespace-nowrap'>
                    <IconButton
                        icon='closeSm400Linear'
                        iconClassName='size-5!'
                        onClick={() => onRemove(index)}
                    />
                </TableCell>
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

export default TableRow
