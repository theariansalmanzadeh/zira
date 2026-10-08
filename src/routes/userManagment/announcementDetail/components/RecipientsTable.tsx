'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import {
    ANNOUNCEMENT_RECIPIENTS_DUMMY,
    RECIPIENT_TABLE_COLUMNS,
    RECIPIENT_TOGGLE_BUTTONS,
    type AnnouncementRecipientRowData,
    type AnnouncementRecipientStatus,
} from '../constants'

type RecipientsTableProps = {
    data?: AnnouncementRecipientRowData[]
}

const RecipientsTable = ({
    data = ANNOUNCEMENT_RECIPIENTS_DUMMY,
}: RecipientsTableProps) => {
    const searchParams = useSearchParams()
    const activeFilter = searchParams.get('cat') ?? 'all'

    const recipients = useMemo(() => {
        if (activeFilter === 'all') return data
        return data.filter(
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
