import type { ComponentType } from 'react'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import EventsPlaceholder from '@/src/routes/events/components/EventsPlaceholder'
import {
    EVENTS_SUB_PARAMS,
    type EventsSubParam,
} from '@/src/routes/events/constants'

const EventList = dynamic(
    () => import('@/src/routes/events/eventList/EventList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const SessionList = dynamic(
    () => import('@/src/routes/events/sessionList/SessionList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const EVENTS_PAGE_COMPONENTS: Partial<
    Record<EventsSubParam, ComponentType>
> = {
    list: EventList,
    sessions: SessionList,
}

async function EventsPage({
    searchParams,
}: {
    searchParams: Promise<{ sub?: string }>
}) {
    const { sub } = await searchParams
    const section =
        sub && EVENTS_SUB_PARAMS.includes(sub as EventsSubParam)
            ? (sub as EventsSubParam)
            : 'list'
    const Component = EVENTS_PAGE_COMPONENTS[section]

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            {Component ? (
                <Component />
            ) : (
                <EventsPlaceholder
                    title={
                        section === 'sensitive'
                            ? 'رخدادهای حساس'
                            : section === 'maintenance'
                              ? 'نگه‌داری و آرشیو'
                              : 'خروجی‌ها'
                    }
                />
            )}
        </Suspense>
    )
}

export default EventsPage
