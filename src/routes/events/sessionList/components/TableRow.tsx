'use client'

import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill } from '@/src/shared/components/ui/Pill'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaTime } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { SessionRowData } from '../../constants'

type TableRowProps = {
    data: SessionRowData
}

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable()
    const {
        id,
        sessionId,
        userName,
        role,
        avatarClassName,
        deviceBrowser,
        ip,
        status,
        expiresAt,
    } = data
    const isActive = status === 'فعال'

    return (
        <Link
            href={`/admin/events/session/${id}`}
            className='grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1.1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_auto] items-center gap-3 rounded-card-md bg-surface-container-lowest px-4 py-3 text-label-lg font-normal text-on-surface-variant transition-colors hover:bg-surface-container-high'
            dir='rtl'
        >
            {TableColoumn[0]?.isChecked && (
                <div className='flex flex-row items-center gap-3'>
                    <div
                        className={cn(
                            'flex size-10 shrink-0 items-center justify-center rounded-full text-label-sm',
                            avatarClassName
                        )}
                    >
                        {userName.charAt(0)}
                    </div>
                    <div className='flex min-w-0 flex-col gap-0.5'>
                        <span className='truncate text-label-lg font-medium text-on-surface'>
                            {userName}
                        </span>
                        <span className='truncate text-label-md text-outline'>
                            {role}
                        </span>
                    </div>
                </div>
            )}
            {TableColoumn[1]?.isChecked && (
                <span className='text-label-lg text-right font-medium text-info' dir='ltr'>
                    {sessionId}
                </span>
            )}
            {TableColoumn[2]?.isChecked && (
                <span className='truncate'>{deviceBrowser}</span>
            )}
            {TableColoumn[3]?.isChecked && (
                <span>{ip}</span>
            )}
            {TableColoumn[4]?.isChecked && (
                <div>
                    <Pill
                        text={status}
                        variant={isActive ? 'success' : 'tonal'}
                        className='border-0'
                    />
                </div>
            )}
            {TableColoumn[5]?.isChecked && (
                <span dir='ltr' className='text-left'>
                    {expiresAt ? formatFaTime(expiresAt) : '—'}
                </span>
            )}
            {TableColoumn[6]?.isChecked && (
                <Icon
                    label='chevronLeft400Linear'
                    className='size-5! text-outline'
                />
            )}
        </Link>
    )
}

export default TableRow
