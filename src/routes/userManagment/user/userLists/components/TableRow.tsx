'use client'

import { useRouter } from 'next/navigation'
import IconButton from '@/src/shared/components/ui/IconButton'
import { useTable } from '@/src/shared/context/TableProvider'
import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { statusType } from '../../../utils'
import type { VariantProps } from 'class-variance-authority'
import type { UserListRowData } from '../constants'

export type { UserListRowData }

type UserListTableRowProps = {
    data: UserListRowData
}

const TableRow = ({ data }: UserListTableRowProps) => {
    const { push } = useRouter()
    const { TableColoumn } = useTable()
    const pillData = statusType(data.status)

    return (
        <>
            <UiTableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant'>
                {TableColoumn[0]?.isChecked && (
                    <TableCell>{data.personnelCode}</TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{data.firstName}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{data.lastName}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell dir='ltr' className='text-right'>
                        {data.mobile}
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && <TableCell>{data.role}</TableCell>}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        <Pill
                            className='border-0'
                            variant={
                                pillData.variant as VariantProps<
                                    typeof PillVariants
                                >['variant']
                            }
                            text={pillData.text}
                        />
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>{data.lastLogin}</TableCell>
                )}
                {TableColoumn[8]?.isChecked && (
                    <TableCell className='w-[1%] whitespace-nowrap text-end'>
                        <IconButton
                            icon='chevronLeft400Linear'
                            className='shrink-0'
                            onClick={() =>
                                push(
                                    `/admin/user-management/user-details/${encodeURIComponent(data.id)}`
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
