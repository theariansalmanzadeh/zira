'use client'

import {
    TableHead,
    TableHeader as UiHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { cn } from '@shared/libs/utils'

const TableHeader = () => {
    const { visibleTableColoumn } = useTable()

    return (
        <UiHeader className='rounded-xl'>
            <TableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-outline'>
                {visibleTableColoumn.map((column) => (
                    <TableHead key={column.id} className={cn(column.className)}>
                        {column.header_label}
                    </TableHead>
                ))}
            </TableRow>
        </UiHeader>
    )
}

export default TableHeader
