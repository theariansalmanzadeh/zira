'use client'

import { cn } from '@shared/libs/utils'
import { TABLE_COLUMNS, TABLE_GRID_CLASS } from '../constants'

const TableHeader = () => (
    <div
        className={cn(
            TABLE_GRID_CLASS,
            'bg-surface-container-high px-4 py-3 text-label-lg font-normal text-outline'
        )}
        dir='rtl'
    >
        {TABLE_COLUMNS.map((column) => (
            <div key={column.id}>{column.label}</div>
        ))}
    </div>
)

export default TableHeader
