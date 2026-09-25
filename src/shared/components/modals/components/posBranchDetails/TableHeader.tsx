'use client'

import { cn } from '@/src/shared/libs/utils'
import { POS_DEVICE_COLUMNS, POS_DEVICE_GRID_CLASS } from './constants'

const TableHeader = () => {
    return (
        <div
            className={cn(
                POS_DEVICE_GRID_CLASS,
                'min-w-[1100px] rounded-t-card-md bg-surface-container-high px-3 py-3 text-label-lg font-normal text-outline'
            )}
        >
            {POS_DEVICE_COLUMNS.map((column) => (
                <div key={column.id}>{column.label}</div>
            ))}
        </div>
    )
}

export default TableHeader
