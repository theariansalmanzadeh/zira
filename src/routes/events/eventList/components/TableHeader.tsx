'use client'

import { useTable } from '@/src/shared/context/TableProvider'
import { cn } from '@shared/libs/utils'

const TableHeader = () => {
    const { visibleTableColoumn } = useTable()

    return (
        <div
            className='grid grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,1.6fr)] items-center gap-3 px-4 py-3 text-label-lg font-normal text-outline'
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
