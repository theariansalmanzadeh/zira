'use client'

import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaDateTime } from '@/src/shared/libs/formatter'
import {
    RECIPIENT_AVATAR_COLORS,
    RECIPIENT_STATUS_CONFIG,
    type AnnouncementRecipientRowData,
} from '../constants'

type TableRowProps = {
    data: AnnouncementRecipientRowData
    index: number
}

const TableRow = ({ data, index }: TableRowProps) => {
    const { TableColoumn } = useTable()
    const statusConfig = RECIPIENT_STATUS_CONFIG[data.status]
    const initial = data.name.trim().charAt(0) || '؟'
    const avatarClassName =
        RECIPIENT_AVATAR_COLORS[index % RECIPIENT_AVATAR_COLORS.length]

    return (
        <>
            <UiTableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant'>
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className='flex items-center gap-2'>
                            <Avatar size='sm'>
                                <AvatarFallback className={avatarClassName}>
                                    {initial}
                                </AvatarFallback>
                            </Avatar>
                            <div className='flex min-w-0 flex-col gap-0.5'>
                                <span className='truncate font-semibold text-on-surface'>
                                    {data.name}
                                </span>
                                <span
                                    className='truncate text-label-md text-outline'
                                    dir='ltr'
                                >
                                    {data.personnelCode}
                                </span>
                            </div>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{data.role}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{data.branch}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>
                        <Pill
                            className='border-0'
                            text={statusConfig.label}
                            variant={statusConfig.variant}
                        />
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        {data.viewedOrClosedAt
                            ? formatFaDateTime(data.viewedOrClosedAt)
                            : '—'}
                    </TableCell>
                )}
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

export default TableRow
