'use client'

import { cn } from '@shared/libs/utils'
import { TABLE_GRID_CLASS, TABLE_COLOUMN } from '../constants'

const TableHeader = () => (
    <div
        className={cn(
            TABLE_GRID_CLASS,
            'px-4 py-3 text-label-lg font-normal text-outline'
        )}
        dir='rtl'
    >
        {TABLE_COLOUMN.map((column) => (
            <div key={column.id}>{column.header_label}</div>
        ))}
    </div>
)

export default TableHeader
