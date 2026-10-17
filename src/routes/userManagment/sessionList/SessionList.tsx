'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import type { SessionListItem } from '@/src/api/types/admin/securityAndEvents'
import {
    SESSION_TABLE_COLOUMN,
    type SessionRowData,
} from '@/src/routes/events/constants'
import TableHeader from '@/src/routes/events/sessionList/components/TableHeader'
import TableRow from '@/src/routes/events/sessionList/components/TableRow'
import { useListActiveSessions } from '@/src/routes/events/hooks/sessions'

const AVATAR_COLORS = [
    'bg-error-container text-error',
    'bg-info-container text-info',
    'bg-warning-container text-warning',
    'bg-success-container text-success',
    'bg-primary-container text-primary',
] as const

const mapSessionStatus = (status: string) => {
    const normalized = status.toLowerCase()
    if (
        normalized === 'active' ||
        normalized === 'alive' ||
        normalized === 'فعال'
    ) {
        return 'فعال'
    }
    if (
        normalized === 'expired' ||
        normalized === 'منقضی'
    ) {
        return 'منقضی'
    }
    return status || 'غیرفعال'
}

const mapSessionToRow = (
    session: SessionListItem,
    index: number
): SessionRowData => {
    const device = session.device_type || 'نامشخص'
    const browser = session.browser || 'نامشخص'
    const location = session.approx_location
        ? ` / ${session.approx_location}`
        : ''

    return {
        id: session.id,
        sessionId: session.id,
        userName: session.user_id,
        role: session.role_id || session.branch_id || '—',
        avatarClassName: AVATAR_COLORS[index % AVATAR_COLORS.length],
        deviceBrowser: `${device} ، ${browser}`,
        ip: `${session.ip_address || '—'}${location}`,
        status: mapSessionStatus(session.status),
        expiresAt: session.expires_at,
    }
}

type SessionListProps = {
    userId?: string
}

const SessionList = ({ userId: userIdProp }: SessionListProps) => {
    const searchParams = useSearchParams()
    const userId = userIdProp || searchParams.get('user') || ''

    const { data, isPending, isError } = useListActiveSessions({
        page: 1,
        page_size: 20,
        user_id: userId || undefined,
    })

    const sessions = useMemo(
        () => (data?.results ?? []).map(mapSessionToRow),
        [data]
    )

    if (isPending) {
        return <TableLoadingSkeleton isPending rows={5} />
    }

    if (isError) {
        return (
            <div
                className='rounded-card-md bg-surface-container-lowest p-6 text-center text-label-md text-error'
                dir='rtl'
            >
                خطا در دریافت نشست‌ها
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={SESSION_TABLE_COLOUMN}
                hasHeaderActions={false}
                hasSearch={false}
                hasFilter={false}
                hasSort={false}
                hasTableSettings={false}
                hasExpand={false}
            >
                <div className='flex flex-col gap-2 rounded-card-lg bg-surface-container-high p-2'>
                    <TableHeader />
                    {sessions.length === 0 ? (
                        <p className='px-4 py-6 text-center text-label-md text-outline'>
                            نشستی یافت نشد
                        </p>
                    ) : (
                        sessions.map((item) => (
                            <TableRow key={item.id} data={item} />
                        ))
                    )}
                </div>
            </TableListLayout>
        </div>
    )
}

export default SessionList
