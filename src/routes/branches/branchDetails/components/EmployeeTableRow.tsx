'use client'

import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import type { BranchEmployee } from '@/src/api/types/admin/organization'
import IconButton from '@/src/shared/components/ui/IconButton'
import { TableCell, TableRow } from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { CASH_BOX_SHIFT_LABEL } from '../constants'

type EmployeeTableRowProps = {
    data?: BranchEmployee
}

const EmployeeTableRow = ({ data }: EmployeeTableRowProps) => {
    const { push } = useRouter()
    const { visibleTableColoumn } = useTable()
    const userId = data?.user_id || data?.id || ''
    const cells: Record<string, ReactNode> = {
        full_name: data?.full_name,
        phone_number: (
            <span dir='ltr' className='inline-block text-right'>
                {formatFaNumber(data?.phone_number ?? '', { useGrouping: false })}
            </span>
        ),
        national_id: (
            <span dir='ltr' className='inline-block text-right'>
                {formatFaNumber(data?.national_id ?? '', { useGrouping: false })}
            </span>
        ),
        personnel_code: (
            <span dir='ltr' className='inline-block text-right'>
                {data?.personnel_code}
            </span>
        ),
        position: data?.position,
        shift: CASH_BOX_SHIFT_LABEL[data?.shift ?? ''] ?? data?.shift,
        start_date: formatFaNumber(data?.start_date ?? ''),
        is_active: data?.is_active ? 'فعال' : 'غیرفعال',
        chevron: (
            <IconButton
                icon='chevronLeft400Linear'
                variant='ghost'
                className='size-8!'
                iconClassName='size-5! text-on-surface-variant'
                aria-label='جزئیات کاربر'
                onClick={() =>
                    push(
                        `/admin/user-management/user-details/${encodeURIComponent(userId)}`
                    )
                }
            />
        ),
    }

    return (
        <TableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant'>
            {visibleTableColoumn.map((column) => (
                <TableCell key={column.id}>{cells[column.id]}</TableCell>
            ))}
        </TableRow>
    )
}

export default EmployeeTableRow
