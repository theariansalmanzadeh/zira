'use client'

import { useTable } from '@/src/shared/context/TableProvider'
import { cn } from '@shared/libs/utils'

const TableHeader = () => {
    const { visibleTableColoumn } = useTable()
    const gridTemplateColumns = visibleTableColoumn
        .map((_, index) =>
            index === visibleTableColoumn.length - 1 ? 'auto' : 'minmax(0, 1fr)'
        )
        .join(' ')

    return (
        <div
            className={cn(
                'grid items-center gap-3 px-4 py-3 text-label-lg font-normal text-outline'
            )}
            style={{ gridTemplateColumns }}
            dir='rtl'
        >
            {visibleTableColoumn.map((column) => (
                <div key={column.id}>{column.header_label}</div>
            ))}
        </div>
    )
}

export default TableHeader
