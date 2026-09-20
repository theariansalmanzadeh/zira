'use client'

import { useState } from 'react'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaDate } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import { DETAIL_COLUMNS, DETAIL_GRID_CLASS } from '../constants'
import type { ChangeAddressRowData } from '../types'

export type {
    ChangeAddressFilterTab,
    ChangeAddressRowData,
} from '../types'

export type TableRowProps = {
    data: ChangeAddressRowData
}

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn, visibleTableColoumn } = useTable()
    const [isExpanded, setIsExpanded] = useState(false)
    const {
        trackingCode,
        warehouseCode,
        warehouseName,
        productCode,
        productName,
        unit,
        quantity,
        details,
    } = data
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
                {TableColoumn[0]?.isChecked && <div>{trackingCode}</div>}
                {TableColoumn[1]?.isChecked && <div>{warehouseCode}</div>}
                {TableColoumn[2]?.isChecked && <div>{warehouseName}</div>}
                {TableColoumn[3]?.isChecked && <div>{productCode}</div>}
                {TableColoumn[4]?.isChecked && <div>{productName}</div>}
                {TableColoumn[5]?.isChecked && <div>{unit}</div>}
                {TableColoumn[6]?.isChecked && <div>{quantity}</div>}
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
                <div className='rounded-card-md bg-surface-container-lowest p-3'>
                    <div
                        className={cn(
                            DETAIL_GRID_CLASS,
                            'px-2 py-2 text-label-md font-medium text-outline'
                        )}
                    >
                        {DETAIL_COLUMNS.map((column) => (
                            <div key={column.id}>{column.label}</div>
                        ))}
                    </div>

                    <div
                        className={cn(
                            DETAIL_GRID_CLASS,
                            'rounded-card-sm bg-surface-container-high/40 px-2 py-2.5 text-label-lg text-on-surface-variant'
                        )}
                    >
                        <div>{detail.oldAddress}</div>
                        <div>{detail.newAddress}</div>
                        <div>{formatFaDate(detail.date, { timeZone: 'UTC' })}</div>
                        <div className='flex flex-row items-center gap-2'>
                            <Avatar size='sm'>
                                <AvatarFallback className='bg-surface-container-highest text-label-sm text-on-surface-variant'>
                                    {detail.managerName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <span>{detail.managerName}</span>
                        </div>
                        <div>{detail.description}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TableRow
