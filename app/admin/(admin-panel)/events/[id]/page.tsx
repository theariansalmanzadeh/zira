import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const EventDetails = dynamic(
    () => import('@/src/routes/events/eventDetails/EventDetails'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const EventDetailsPage = () => {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <EventDetails />
        </Suspense>
    )
}

export default EventDetailsPage
