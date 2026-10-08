'use client'

import Link from 'next/link'
import { Pill } from '@/src/shared/components/ui/Pill'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaDateTime } from '@/src/shared/libs/formatter'
import {
    PRIORITY_CONFIG,
    type AnnouncementRowData,
} from '../constants'

type TableRowProps = {
    data: AnnouncementRowData
}

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable()
    const { id, title, body, subject, recipients, priority, sentAt } = data
    const priorityConfig = PRIORITY_CONFIG[priority]

    return (
        <Link
            href={`/admin/user-management/announcement/${id}`}
            className='grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1.2fr)] items-center gap-3 rounded-card-md bg-surface-container-lowest px-4 py-3 text-label-lg font-normal text-on-surface-variant transition-colors hover:bg-surface-container-low'
            dir='rtl'
        >
            {TableColoumn[0]?.isChecked && (
                <div className='flex min-w-0 flex-col gap-0.5'>
                    <span className='truncate font-semibold text-on-surface'>
                        {title}
                    </span>
                    <span className='truncate text-label-md text-outline'>
                        {body}
                    </span>
                </div>
            )}
            {TableColoumn[1]?.isChecked && (
                <span className='truncate'>{subject}</span>
            )}
            {TableColoumn[2]?.isChecked && (
                <span className='truncate'>{recipients}</span>
            )}
            {TableColoumn[3]?.isChecked && (
                <div>
                    <Pill
                        text={priorityConfig.label}
                        variant={priorityConfig.variant}
                        className='border-0'
                    />
                </div>
            )}
            {TableColoumn[4]?.isChecked && (
                <span dir='ltr' className='text-right'>
                    {formatFaDateTime(sentAt, { timeZone: 'UTC' })}
                </span>
            )}
        </Link>
    )
}

export default TableRow
