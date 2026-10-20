'use client'

import {
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'

const EmployeeTableHeader = () => {
    const { visibleTableColoumn } = useTable()

    return (
        <TableHeader className='rounded-xl'>
            <TableRow className='[&>*]:text-outline [&>*]:text-label-lg [&>*]:font-normal'>
                {visibleTableColoumn.map((column) => (
                    <TableHead key={column.id}>{column.header_label}</TableHead>
                ))}
            </TableRow>
        </TableHeader>
    )
}

export default EmployeeTableHeader
