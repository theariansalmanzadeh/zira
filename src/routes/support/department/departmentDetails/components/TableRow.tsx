'use client'

import Link from 'next/link'
import { formatFaDateTime } from '@/src/shared/libs/formatter'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { Pill } from '@/src/shared/components/ui/Pill'
import IconButton from '@/src/shared/components/ui/IconButton'
import { cn } from '@shared/libs/utils'
import { PILL_VARIANT_ICON } from '@/src/routes/support/constants/pillVariantIcons'
import type {
    TicketRowData,
    TicketStatus,
} from '@/src/routes/support/tickets/components/TableRow'

const STATUS_CONFIG: Record<
    TicketStatus,
    { text: string; variant: 'success' | 'warning' | 'info' | 'tonal' }
> = {
    open: { text: 'باز', variant: 'success' },
    waiting: { text: 'منتظر کاربر', variant: 'warning' },
    reviewing: { text: 'در حال بررسی', variant: 'info' },
    closed: { text: 'بسته', variant: 'tonal' },
}

const ID_VARIANT_CLASS = {
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
} as const

const TableRow = ({ data }: { data: TicketRowData }) => {
    const { TableColoumn } = useTable()
    const statusConfig = STATUS_CONFIG[data.status]

    return (
        <>
            <UiTableRow className='[&>*]:text-on-surface-variant!'>
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className='flex flex-row-reverse items-center justify-end gap-2'>
                            <span>{data.trackingCode}</span>
                            <span
                                className={cn(
                                    'size-2 shrink-0 rounded-full',
                                    ID_VARIANT_CLASS[data.idVariant]
                                )}
                            />
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        <div className='flex flex-row-reverse items-center justify-end gap-2'>
                            <span>{data.contact}</span>
                            <Avatar size='sm'>
                                <AvatarFallback className='bg-surface-container-highest text-label-sm text-on-surface-variant'>
                                    {data.contact.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && <TableCell>{data.subject}</TableCell>}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>
                        <Pill
                            className='gap-1 border-0'
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            icon={PILL_VARIANT_ICON[statusConfig.variant]}
                        />
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{formatFaDateTime(data.lastActivity)}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell className='w-[1%] whitespace-nowrap'>
                        <Link href={`/admin/support/ticket/${data.id}`}>
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
