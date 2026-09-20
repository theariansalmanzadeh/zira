'use client'

import { useState } from 'react'
import IconButton from '@/src/shared/components/ui/IconButton'
import { useTable } from '@/src/shared/context/TableProvider'
import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import { formatFaDate } from '@/src/shared/libs/formatter'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@shared/libs/utils'
import { DETAIL_COLUMNS, DETAIL_GRID_CLASS } from '../constants'
import type {
    InventoryInvoiceRowData,
    InventoryInvoiceStatus,
} from '../types'

export type {
    InventoryInvoiceFilterTab,
    InventoryInvoiceRowData,
    InventoryInvoiceStatus,
} from '../types'

const STATUS_CONFIG: Record<
    InventoryInvoiceStatus,
    { text: string; variant: VariantProps<typeof PillVariants>['variant'] }
> = {
    'final-approval': { text: 'تایید نهایی', variant: 'success' },
    pending: { text: 'در انتظار تایید', variant: 'warning' },
    draft: { text: 'پیش‌نویس', variant: 'tonal' },
}

export type TableRowProps = {
    data: InventoryInvoiceRowData
}

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn, visibleTableColoumn } = useTable()
    const [isExpanded, setIsExpanded] = useState(false)
    const {
        productCode,
        mainCategory,
        subCategory,
        productName,
        size,
        model,
        status,
        details,
    } = data
    const statusConfig = STATUS_CONFIG[status]
    const detail = details[0]
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
                {TableColoumn[0]?.isChecked && <div>{productCode}</div>}
                {TableColoumn[1]?.isChecked && <div>{mainCategory}</div>}
                {TableColoumn[2]?.isChecked && <div>{subCategory}</div>}
                {TableColoumn[3]?.isChecked && <div>{productName}</div>}
                {TableColoumn[4]?.isChecked && <div>{size}</div>}
                {TableColoumn[5]?.isChecked && <div>{model}</div>}
                {TableColoumn[6]?.isChecked && (
                    <div>
                        <Pill
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            hasDot
                            className='border-0'
                        />
                    </div>
                )}
                {TableColoumn[7]?.isChecked && (
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
                <div className='overflow-x-auto rounded-card-md bg-surface-container-lowest p-3'>
                    <div
                        className={cn(
                            DETAIL_GRID_CLASS,
                            'min-w-[1100px] px-2 py-2 text-label-md font-medium text-outline'
                        )}
                    >
                        {DETAIL_COLUMNS.map((column) => (
                            <div key={column.id}>{column.label}</div>
                        ))}
                    </div>

                    <div
                        className={cn(
                            DETAIL_GRID_CLASS,
                            'min-w-[1100px] rounded-card-sm bg-surface-container-high/40 px-2 py-2.5 text-label-lg text-on-surface-variant'
                        )}
                    >
                        <div>{detail.size}</div>
                        <div>{detail.color}</div>
                        <div>{detail.material}</div>
                        <div>{detail.labels}</div>
                        <div>{detail.supplier}</div>
                        <div>{detail.warehouseName}</div>
                        <div>{formatFaDate(detail.requestDate, { timeZone: 'UTC' })}</div>
                        <div>{formatFaDate(detail.receiveDate, { timeZone: 'UTC' })}</div>
                        <div>{detail.countedQty}</div>
                        <div>{detail.productAddress}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TableRow
