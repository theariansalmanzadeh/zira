'use client'

import { cn } from '@/src/shared/libs/utils'
import {
    RELATED_WAREHOUSE_COLUMNS,
    RELATED_WAREHOUSE_GRID_CLASS,
} from './constants'

const TableHeader = () => {
    return (
        <div
            className={cn(
                RELATED_WAREHOUSE_GRID_CLASS,
                'rounded-t-card-md bg-surface-container-high px-3 py-3 text-label-lg font-normal text-outline'
            )}
        >
            {RELATED_WAREHOUSE_COLUMNS.map((column) => (
                <div key={column.id}>{column.label}</div>
            ))}
        </div>
    )
}

export default TableHeader
