'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import type { ActivityLogListItem } from '@/src/api/types/admin/securityAndEvents'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import { useTableActionsStore } from '@/src/shared/store/table-actions-store'
import { useListActivityLogs } from '../hooks/activity'
import {
    EVENT_SUMMARY_CARDS,
    TABLE_COLOUMN,
    type EventFilterTab,
    type EventRowData,
} from '../constants'
import EventSummaryCards from './components/EventSummaryCards'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'

const AVATAR_COLORS = [
    'bg-error-container text-error',
    'bg-info-container text-info',
    'bg-warning-container text-warning',
    'bg-success-container text-success',
    'bg-primary-container text-primary',
] as const

const ACTOR_KIND_LABEL = {
    USER: 'کاربر',
    SYSTEM: 'سیستم',
    ANONYMOUS: 'ناشناس',
} as const

const mapActivityLogToRow = (
    log: ActivityLogListItem,
    index: number
): EventRowData => {
    const isFailed = log.result === 'FAILURE' || log.result === 'DENIED'
    const isSensitive = log.severity === 'CRITICAL'

    return {
        id: log.id,
        rowNumber: index + 1,
        role: ACTOR_KIND_LABEL[log.actor_kind] ?? log.actor_kind,
        userName: log.actor_user_id || ACTOR_KIND_LABEL[log.actor_kind],
        avatarClassName: AVATAR_COLORS[index % AVATAR_COLORS.length],
        occurredAt: log.occurred_at,
        activityType: log.event_title,
        activityDetails: log.summary,
        isSensitive,
        filterTab: isFailed ? 'failed' : isSensitive ? 'sensitive' : undefined,
    }
}

const EventList = () => {
    const searchParams = useSearchParams()
    const search = useTableActionsStore((state) => state.search)
    const filterValue =
        (searchParams.get('cat') as EventFilterTab | null) ?? 'all'
    const { data, isPending, isError } = useListActivityLogs({
        page: 1,
        page_size: 20,
        query: search || undefined,
    })

    const rows = useMemo(
        () => (data?.results ?? []).map(mapActivityLogToRow),
        [data]
    )

    const filteredData = useMemo(() => {
        if (filterValue === 'all') return rows
        if (filterValue === 'sensitive') {
            return rows.filter(
                (item) => item.isSensitive || item.filterTab === 'sensitive'
            )
        }
        return rows.filter((item) => item.filterTab === filterValue)
    }, [rows, filterValue])

    const summaryCards = useMemo(
        () =>
            EVENT_SUMMARY_CARDS.map((card) =>
                card.id === 'total' ? { ...card, value: data?.total ?? 0 } : card
            ),
        [data?.total]
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
                خطا در دریافت رخدادها
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <EventSummaryCards items={summaryCards} />

            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value='all'
                toggleButtonValue={ROUTE_CONFIGS.events.TOGGLE_BUTTON_VALUE}
                hasFilter={false}
                hasSort={false}
                hasTableSettings={false}
                hasExpand={false}
                defaultSearchOpen
                searchPlaceholder='جستجو در رخدادها...'
            >
                <div className='flex flex-col gap-2 rounded-card-lg bg-surface-container-high p-2'>
                    <TableHeader />
                    {filteredData.length === 0 ? (
                        <p className='px-4 py-6 text-center text-label-md text-outline'>
                            رخدادی یافت نشد
                        </p>
                    ) : (
                        filteredData.map((item) => (
                            <TableRow key={item.id} data={item} />
                        ))
                    )}
                </div>
            </TableListLayout>
        </div>
    )
}

export default EventList
