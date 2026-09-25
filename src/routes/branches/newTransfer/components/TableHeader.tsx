'use client'

import {
    TableHead,
    TableHeader as UiHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { TRANSFER_ITEMS_COLUMNS } from '../constants'

const TableHeader = () => {
    return (
        <UiHeader className='rounded-xl'>
            <TableRow className='[&>*]:text-outline [&>*]:text-label-lg [&>*]:font-normal'>
                {TRANSFER_ITEMS_COLUMNS.map((column) => (
                    <TableHead key={column.id}>
                        {column.header_label}
                    </TableHead>
                ))}
            </TableRow>
        </UiHeader>
    )
}

export default TableHeader
