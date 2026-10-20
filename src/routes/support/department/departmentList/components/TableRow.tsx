'use client'

import Link from 'next/link'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import IconButton from '@/src/shared/components/ui/IconButton'
import { useListDepartmentAssignees } from '@/src/routes/support/hooks/support'

export type DepartmentRowData = {
    id: string
    name: string
    code: string
}

const TableRow = ({ data }: { data: DepartmentRowData }) => {
    const { TableColoumn } = useTable()
    const { data: assignees } = useListDepartmentAssignees(data.id)
    const manager = assignees?.results?.[0]?.display_name || '—'

    return (
        <>
            <UiTableRow className='[&>*]:text-on-surface-variant!'>
                {TableColoumn[0]?.isChecked && <TableCell>{data.name}</TableCell>}
                {TableColoumn[1]?.isChecked && <TableCell>{data.code}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>
                        <div className='flex flex-row-reverse items-center justify-end gap-2'>
                            <span>{manager}</span>
                            <Avatar size='sm'>
                                <AvatarFallback className='bg-surface-container-highest text-label-sm text-on-surface-variant'>
                                    {manager.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[3]?.isChecked && <TableCell>—</TableCell>}
                {TableColoumn[4]?.isChecked && (
                    <TableCell className='w-[1%] whitespace-nowrap'>
                        <Link href={`/admin/support/department/${data.id}`}>
                            <IconButton
                                icon='chevronLeft400Broken'
                                iconClassName='size-6! text-on-surface-variant'
                            />
                        </Link>
                    </TableCell>
                )}
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

export default TableRow
