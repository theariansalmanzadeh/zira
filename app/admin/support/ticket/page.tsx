import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const TicketDetail = dynamic(
    () => import('@/src/routes/support/tickets/ticketDetails/TicketDetail'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const TicketDetailPage = () => {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <TicketDetail />
        </Suspense>
    )
}

export default TicketDetailPage
