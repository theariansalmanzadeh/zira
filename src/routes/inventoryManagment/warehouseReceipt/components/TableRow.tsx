'use client'

import { useMemo } from 'react'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { randomColorGenerator } from '@/src/shared/libs/color'
import { cn } from '@/src/shared/libs/utils'
import { STATUS_CONFIG, TABLE_GRID_CLASS } from '../constants'
import type { WarehouseReceiptRowData } from '../types'

type TableRowProps = {
    data: WarehouseReceiptRowData
}

const TableRow = ({ data }: TableRowProps) => {
    const statusConfig = STATUS_CONFIG[data.status]
    const badgeColor = useMemo(() => randomColorGenerator(), [])

    return (
        <div
            className={cn(
                TABLE_GRID_CLASS,
                'rounded-card-md bg-surface-container-lowest px-4 py-3 text-label-lg font-normal text-on-surface-variant'
            )}
            dir='rtl'
        >
            <div>{formatFaNumber(data.row)}</div>
            <div>{data.invoiceNumber}</div>
            <div>{data.customerCode}</div>
            <div className='flex items-center gap-2'>
                <span
                    className={cn(
                        'inline-flex size-8 shrink-0 items-center justify-center rounded-full text-label-md',
                        badgeColor.className
                    )}
                >
                    {formatFaNumber(data.itemCount)}
                </span>
                <span>{data.customerName}</span>
            </div>
            <div>{data.date}</div>
            <div>{formatFaNumber(data.itemCount)} قلم</div>
            <div className='grid grid-cols-3 items-center gap-3'>
                <div>{data.senderWarehouse}</div>
                <div>{data.shippingMethod}</div>
                <div>
                    <Pill
                        variant={statusConfig.variant}
                        text={statusConfig.text}
                        hasDot
                        className='w-fit border-0'
                    />
                </div>
            </div>
        </div>
    )
}

export default TableRow
