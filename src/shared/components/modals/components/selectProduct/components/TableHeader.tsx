'use client'

import { TableHead, TableHeader as UiHeader, TableRow } from '@shared/components/ui/Table'
import { cn } from '@shared/libs/utils'
import { SELECT_PRODUCT_HEADERS } from '../constants'

const TableHeader = () => {
    return (
        <UiHeader className="overflow-hidden rounded-xl">
            <TableRow className="border-0 hover:bg-transparent [&>*]:h-12 [&>*]:px-4 [&>*]:text-outline [&>*]:text-label-lg [&>*]:font-medium [&>*:first-child]:rounded-r-xl">
                {SELECT_PRODUCT_HEADERS.map((header) => (
                    <TableHead key={header.id} className={cn(header.className)}>
                        {header.label}
                    </TableHead>
                ))}
            </TableRow>
        </UiHeader>
    )
}

export default TableHeader
