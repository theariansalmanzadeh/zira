'use client'

import { useTable } from '@/src/shared/context/TableProvider'
import { cn } from '@shared/libs/utils'

const TableHeader = () => {
    const { visibleTableColoumn } = useTable()

    return (
        <div
            className='grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1.2fr)] items-center gap-3 rounded-card-md bg-surface-container-high px-4 py-3 text-label-lg font-normal text-outline'
            dir='rtl'
        >
            {visibleTableColoumn.map((column) => (
                <div key={column.id} className={cn(column.className)}>
                    {column.header_label}
                </div>
            ))}
        </div>
    )
}

export default TableHeader
