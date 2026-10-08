'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaDateTime } from '@/src/shared/libs/formatter'
import type { UserSession } from '@/src/api/types/admin/user'
import { useListUserSessions } from '../../../hooks/user'

const mapStatus = (session: UserSession) => {
    if (session.terminated_at) return { text: 'غیرفعال', variant: 'tonal' as const }
    if (!session.is_alive) return { text: 'منقضی', variant: 'tonal' as const }
    const normalized = session.status.toLowerCase()
    if (
        normalized === 'active' ||
        normalized === 'alive' ||
        normalized === 'فعال'
    ) {
        return { text: 'فعال', variant: 'success' as const }
    }
    return { text: session.status || 'غیرفعال', variant: 'tonal' as const }
}

const SessionManagement = () => {
    const params = useParams<{ id: string }>()
    const userId = params.id ?? ''
    const { data, isPending, isError } = useListUserSessions(
        userId,
        Boolean(userId)
    )

    const sessions = useMemo(() => data ?? [], [data])

    if (isPending) {
        return <TableLoadingSkeleton isPending rows={4} />
    }

    if (isError) {
        return (
            <div className='rounded-card-md bg-surface-container-lowest p-6 text-center text-label-md text-error'>
                خطا در دریافت نشست‌ها
            </div>
        )
    }

    if (sessions.length === 0) {
        return (
            <div className='rounded-card-md bg-surface-container-lowest p-6 text-center text-label-md text-outline'>
                نشستی برای این کاربر ثبت نشده است
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-2' dir='rtl'>
            {sessions.map((session) => {
                const status = mapStatus(session)

                return (
                    <Link
                        key={session.id}
                        href={`/admin/events/session/${session.id}`}
                        className='flex items-center justify-between gap-3 rounded-card-md bg-surface-container-lowest px-4 py-3 transition-colors hover:bg-surface-container-high'
                    >
                        <div className='flex min-w-0 flex-col gap-1'>
                            <span className='text-label-lg font-semibold text-on-surface'>
                                {session.id}
                            </span>
                            <span className='text-label-md text-outline'>
                                {session.device_type}
                                {session.browser ? ` · ${session.browser}` : ''}
                                {session.ip_address
                                    ? ` · ${session.ip_address}`
                                    : ''}
                            </span>
                            <span className='text-label-sm text-outline'>
                                آخرین فعالیت:{' '}
                                {formatFaDateTime(session.last_activity_at)}
                            </span>
                        </div>
                        <Pill
                            text={status.text}
                            variant={status.variant}
                            className='border-0'
                        />
                    </Link>
                )
            })}
        </div>
    )
}

export default SessionManagement
