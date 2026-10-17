'use client'

import { useRouter } from 'next/navigation'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaDateTime } from '@/src/shared/libs/formatter'
import {
    ROLE_STATUS_CONFIG,
    ROLE_TYPE_CONFIG,
    type RoleListRowData,
} from '../constants'

type TableRowProps = {
    data: RoleListRowData
}

const TableRow = ({ data }: TableRowProps) => {
    const { push } = useRouter()
    const { TableColoumn } = useTable()
    const typeConfig = ROLE_TYPE_CONFIG[data.type]
    const statusConfig = ROLE_STATUS_CONFIG[data.status]

    return (
        <>
            <UiTableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant'>
                {TableColoumn[0]?.isChecked && (
                    <TableCell dir='ltr' className='text-right'>
                        {data.code}
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{data.name}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{data.department}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>
                        <Pill
                            className='border-0'
                            text={typeConfig.label}
                            variant={typeConfig.variant}
                        />
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        <Pill
                            className='border-0'
                            text={statusConfig.label}
                            variant={statusConfig.variant}
                        />
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        {formatFaDateTime(data.createdAt)}
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className='w-[1%] whitespace-nowrap text-end'>
                        <IconButton
                            icon='chevronLeft400Linear'
                            className='shrink-0'
                            onClick={() =>
                                push(
                                    `/admin/user-management/role-details/${encodeURIComponent(data.id)}`
                                )
                            }
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

export default TableRow
