'use client'

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useTable } from '@/src/shared/context/TableProvider'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import { cn } from '@shared/libs/utils'
import type { ReactNode } from 'react'

type InventoryReviewTableProps = {
    columns: TableFilterItem[]
    children: ReactNode
}

const ReviewTableHeader = () => {
    const { visibleTableColoumn } = useTable()

    return (
        <TableHeader className='rounded-xl'>
            <TableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-outline'>
                {visibleTableColoumn.map((column) => (
                    <TableHead key={column.id} className={cn(column.className)}>
                        {column.header_label}
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
    )
}

const InventoryReviewTable = ({ columns, children }: InventoryReviewTableProps) => {
    return (
        <TableListLayout TableColoumn={columns} hasHeaderActions={false}>
            <div className='rounded-card-lg bg-surface-container-high p-2'>
                <Table className='border-collapse border-spacing-y-4'>
                    <ReviewTableHeader />
                    <TableBody>{children}</TableBody>
                </Table>
            </div>
        </TableListLayout>
    )
}

export default InventoryReviewTable
