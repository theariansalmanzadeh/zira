'use client'

import { useMemo } from 'react'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import type { Notification } from '@/src/api/types/admin/notification'
import { useListNotifications } from '../hooks/notification'
import {
    ANNOUNCEMENT_TABLE_COLOUMN,
    type AnnouncementPriority,
    type AnnouncementRowData,
} from './constants'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'

const mapPriority = (priority: string): AnnouncementPriority => {
    const normalized = priority.toUpperCase()
    if (
        normalized === 'URGENT' ||
        normalized === 'HIGH' ||
        normalized === 'فوری'
    ) {
        return 'high'
    }
    if (
        normalized === 'IMPORTANT' ||
        normalized === 'MEDIUM' ||
        normalized === 'متوسط'
    ) {
        return 'medium'
    }
    return 'low'
}

const mapRecipientMode = (mode: string) => {
    switch (mode.toUpperCase()) {
        case 'ALL':
            return 'همه کاربران'
        case 'ROLE':
        case 'ROLES':
            return 'بر اساس نقش'
        case 'USER':
        case 'USERS':
            return 'کاربران منتخب'
        default:
            return mode || '—'
    }
}

const mapNotificationToRow = (
    notification: Notification
): AnnouncementRowData => ({
    id: notification.id,
    title: notification.title || 'بدون عنوان',
    body: notification.body,
    subject: notification.topic || '—',
    recipients: mapRecipientMode(notification.recipient_mode),
    priority: mapPriority(notification.priority),
    sentAt: notification.sent_at || notification.created_at,
})

const AnnouncementList = () => {
    const { data, isPending, isError } = useListNotifications()

    const announcements = useMemo(
        () => (data?.results ?? []).map(mapNotificationToRow),
        [data]
    )

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={ANNOUNCEMENT_TABLE_COLOUMN}
                hasHeaderActions={false}
                hasSearch={false}
                hasFilter={false}
                hasSort={false}
                hasTableSettings={false}
                hasExpand={false}
            >
                <div className='flex flex-col gap-2 rounded-card-lg bg-surface-container-high p-2'>
                    {isPending ? (
                        <TableLoadingSkeleton isPending rows={5} />
                    ) : isError ? (
                        <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                            دریافت لیست اعلان‌ها با خطا مواجه شد.
                        </div>
                    ) : announcements.length === 0 ? (
                        <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                            اعلانی یافت نشد.
                        </div>
                    ) : (
                        <>
                            <TableHeader />
                            {announcements.map((item) => (
                                <TableRow key={item.id} data={item} />
                            ))}
                        </>
                    )}
                </div>
            </TableListLayout>
        </div>
    )
}

export default AnnouncementList
