'use client'

import {
    TableHead,
    TableHeader as UiHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { cn } from '@/src/shared/libs/utils'

const CashRegisterTableHeader = () => {
    const { visibleTableColoumn } = useTable()

    return (
        <UiHeader className='rounded-xl'>
            <TableRow className='[&>*]:text-outline [&>*]:text-label-lg [&>*]:font-normal'>
                {visibleTableColoumn.map((column) => (
                    <TableHead key={column.id} className={cn(column.className)}>
                        {column.header_label}
                    </TableHead>
                ))}
            </TableRow>
        </UiHeader>
    )
}

export default CashRegisterTableHeader
