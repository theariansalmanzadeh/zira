'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import type { NotificationSeenUser } from '@/src/api/types/admin/notification'
import { useListNotificationSeenUsers } from '@/src/routes/userManagment/hooks/notification'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import {
    RECIPIENT_TABLE_COLUMNS,
    RECIPIENT_TOGGLE_BUTTONS,
    type AnnouncementRecipientRowData,
    type AnnouncementRecipientStatus,
} from '../constants'

type RecipientsTableProps = {
    notificationId: string
}

const toRecipient = (
    user: NotificationSeenUser
): AnnouncementRecipientRowData => ({
    id: user.user_id,
    name:
        [user.first_name, user.last_name].filter(Boolean).join(' ') ||
        user.username,
    personnelCode: user.username,
    role: '—',
    branch: '—',
    status: 'seen',
    viewedOrClosedAt: user.seen_at,
})

const RecipientsTable = ({ notificationId }: RecipientsTableProps) => {
    const searchParams = useSearchParams()
    const activeFilter = searchParams.get('cat') ?? 'all'
    const { data } = useListNotificationSeenUsers(notificationId)

    const recipients = useMemo(() => {
        const rows = (data?.results ?? []).map(toRecipient)
        if (activeFilter === 'all') return rows
        return rows.filter(
            (item) =>
                item.status === (activeFilter as AnnouncementRecipientStatus)
        )
    }, [data, activeFilter])

    return (
        <TableListLayout
            TableColoumn={RECIPIENT_TABLE_COLUMNS}
            hasHeaderActions
            toggleButtonValue={[...RECIPIENT_TOGGLE_BUTTONS]}
            value={activeFilter}
            hasSearch={false}
            hasFilter={false}
            hasSort={false}
            hasTableSettings={false}
            hasExpand={false}
        >
            <div className='rounded-card-lg border border-outline-variant bg-surface-container-high p-2'>
                <Table className='border-collapse border-spacing-y-4'>
                    <TableHeader />
                    <TableBody>
                        {recipients.map((recipient, index) => (
                            <TableRow
                                key={recipient.id}
                                data={recipient}
                                index={index}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TableListLayout>
    )
}

export default RecipientsTable
