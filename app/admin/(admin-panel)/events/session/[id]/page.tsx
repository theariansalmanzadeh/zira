import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const SessionDetail = dynamic(
    () => import('@/src/routes/events/sessionDetail/SessionDetail'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const SessionDetailPage = () => {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <SessionDetail />
        </Suspense>
    )
}

export default SessionDetailPage
