'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatFaDateTime } from '@/src/shared/libs/formatter'
import IconButton from '@/src/shared/components/ui/IconButton'
import { useTable } from '@/src/shared/context/TableProvider'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { Button } from '@/src/shared/components/ui/button'
import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@shared/libs/utils'
import { EXPANDED_ITEM_COLUMNS, ITEM_GRID_CLASS } from '../constants'
import type { StockReturnRowData, StockReturnStatus } from '../types'
export type {
    StockReturnFilterTab,
    StockReturnItem,
    StockReturnRowData,
    StockReturnStatus,
} from '../types'

const STATUS_CONFIG: Record<
    StockReturnStatus,
    { text: string; variant: VariantProps<typeof PillVariants>['variant'] }
> = {
    'returned-to-stock': { text: 'بازگشت به موجودی', variant: 'success' },
    'awaiting-receipt': { text: 'در انتظار دریافت', variant: 'warning' },
    'quality-check': { text: 'در حال بررسی کیفیت', variant: 'info' },
}

export type TableRowProps = {
    data: StockReturnRowData
}

const TableRow = ({ data }: TableRowProps) => {
    const { push } = useRouter()
    const { TableColoumn, visibleTableColoumn } = useTable()
    const [isExpanded, setIsExpanded] = useState(false)
    const {
        id,
        customerName,
        consignmentId,
        itemCount,
        status,
        registeredAt,
        items = [],
    } = data
    const statusConfig = STATUS_CONFIG[status]
    const showActions = statusConfig.variant === 'info'
    const expandedColumns = showActions
        ? EXPANDED_ITEM_COLUMNS
        : EXPANDED_ITEM_COLUMNS.filter((column) => column.id !== 'action')
    const expandedGridClass = showActions
        ? ITEM_GRID_CLASS
        : 'grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-3'
    const gridTemplateColumns = visibleTableColoumn
        .map((_, index) =>
            index === visibleTableColoumn.length - 1 ? 'auto' : 'minmax(0, 1fr)'
        )
        .join(' ')

    return (
        <div className='flex flex-col gap-1' dir='rtl'>
            <div
                className='grid items-center gap-3 rounded-card-md bg-surface-container-lowest px-4 py-3 text-label-lg font-normal text-on-surface-variant'
                style={{ gridTemplateColumns }}
            >
                {TableColoumn[0]?.isChecked && <div>{id}</div>}
                {TableColoumn[1]?.isChecked && (
                    <div className='flex flex-row items-center gap-2'>
                        <Avatar size='sm'>
                            <AvatarFallback className='bg-surface-container-highest text-label-sm text-on-surface-variant'>
                                {customerName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <span>{customerName}</span>
                    </div>
                )}
                {TableColoumn[2]?.isChecked && <div>{consignmentId}</div>}
                {TableColoumn[3]?.isChecked && <div>{itemCount}</div>}
                {TableColoumn[4]?.isChecked && (
                    <div>
                        <Pill
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            hasDot
                            className='border-0'
                        />
                    </div>
                )}
                {TableColoumn[5]?.isChecked && (
                    <div>{formatFaDateTime(registeredAt)}</div>
                )}
                {TableColoumn[6]?.isChecked && (
                    <div className='flex justify-end'>
                        <IconButton
                            icon='chevronLeft300Linear'
                            iconClassName={cn(
                                'size-6! transition-transform',
                                isExpanded && '-rotate-90'
                            )}
                            onClick={() => setIsExpanded((prev) => !prev)}
                        />
                    </div>
                )}
            </div>

            {isExpanded && (
                <div className='rounded-card-md bg-surface-container-lowest p-3'>
                    <div
                        className={cn(
                            expandedGridClass,
                            'px-2 py-2 text-label-md font-medium text-outline'
                        )}
                    >
                        {expandedColumns.map((column) => (
                            <div key={column.id}>{column.label}</div>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2'>
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={cn(
                                    expandedGridClass,
                                    'rounded-card-sm bg-surface-container-high/40 px-2 py-2.5 text-label-lg text-on-surface-variant'
                                )}
                            >
                                <div>{item.productName}</div>
                                <div>{item.unit}</div>
                                <div>{item.declaredQty}</div>
                                {showActions && (
                                    <div className='flex flex-row items-center justify-end gap-2'>
                                        <Button
                                            type='button'
                                            variant='ghost'
                                            className='rounded-button-md bg-success-container px-4 text-label-sm text-on-success-container hover:bg-success-container/80'
                                            onClick={() =>
                                                push(
                                                    `/admin/inventory-managment/stock-returns/${id}`
                                                )
                                            }
                                        >
                                            تایید و ثبت دریافت
                                        </Button>
                                        <Button
                                            type='button'
                                            variant='ghost'
                                            className='rounded-button-md bg-error-container px-4 text-label-sm text-error hover:bg-error-container/80'
                                        >
                                            رد
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TableRow
