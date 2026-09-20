'use client'

import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill } from '@/src/shared/components/ui/Pill'
import { useTable } from '@/src/shared/context/TableProvider'
import {
    formatFaDate,
    formatFaNumber,
    formatFaTime,
} from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { EventRowData } from '../../constants'

type TableRowProps = {
    data: EventRowData
}

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable()
    const {
        id,
        rowNumber,
        role,
        userName,
        avatarClassName,
        occurredAt,
        activityType,
        activityDetails,
        isSensitive,
    } = data

    return (
        <Link
            href={`/admin/events/${id}`}
            className='grid grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,1.6fr)] items-center gap-3 rounded-card-md bg-surface-container-lowest px-4 py-3 text-label-lg font-normal text-on-surface-variant transition-colors hover:bg-surface-container-high'
            dir='rtl'
        >
            {TableColoumn[0]?.isChecked && (
                <div>{formatFaNumber(rowNumber)}</div>
            )}
            {TableColoumn[1]?.isChecked && (
                <div>
                    <Pill
                        text={role}
                        variant='tonal'
                        className='border-0'
                    />
                </div>
            )}
            {TableColoumn[2]?.isChecked && (
                <div className='flex flex-row items-center gap-2'>
                    <Avatar size='sm'>
                        <AvatarFallback
                            className={cn(
                                'text-label-sm',
                                avatarClassName
                            )}
                        >
                            {userName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <span>{userName}</span>
                </div>
            )}
            {TableColoumn[3]?.isChecked && (
                <div>{formatFaDate(occurredAt, { timeZone: 'UTC' })}</div>
            )}
            {TableColoumn[4]?.isChecked && (
                <div>{formatFaTime(occurredAt, { timeZone: 'UTC' })}</div>
            )}
            {TableColoumn[5]?.isChecked && (
                <div className='flex flex-row items-center gap-2'>
                    <span
                        className={cn(
                            'flex size-8 shrink-0 items-center justify-center rounded-card-sm',
                            isSensitive
                                ? 'bg-error-container'
                                : 'bg-surface-container-high'
                        )}
                    >
                        <Icon
                            label='history400Linear'
                            className={cn(
                                'size-4!',
                                isSensitive ? 'text-error' : 'text-outline'
                            )}
                        />
                    </span>
                    <span className='truncate'>{activityType}</span>
                    {isSensitive && (
                        <Pill
                            text='حساس'
                            variant='error'
                            className='border-0'
                        />
                    )}
                </div>
            )}
            {TableColoumn[6]?.isChecked && (
                <div className='flex flex-row flex-wrap items-center gap-2'>
                    <span>{activityDetails}</span>
                </div>
            )}
        </Link>
    )
}

export default TableRow
