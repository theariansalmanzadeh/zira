'use client'

import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import IconButton from '@/src/shared/components/ui/IconButton'
import { useRouter } from 'next/navigation'
import type { DepartmentUserRow } from '../constants'

const TableRow = ({ data }: { data: DepartmentUserRow }) => {
    const { push } = useRouter()

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant!">
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.display_name}</TableCell>
                <TableCell className="w-[1%] whitespace-nowrap">
                    <IconButton
                        icon="chevronLeft400Broken"
                        iconClassName="size-6! text-on-surface-variant"
                        onClick={() =>
                            push(
                                `/admin/user-management/user-details/${encodeURIComponent(data.id)}`
                            )
                        }
                    />
                </TableCell>
            </UiTableRow>
            <div className="py-1" />
        </>
    )
}

export default TableRow
