import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const TicketDetail = dynamic(
    () => import('@/src/routes/support/tickets/ticketDetails/TicketDetail'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

type TicketDetailPageProps = {
    params: Promise<{ id: string }>
}

const page = async ({ params }: TicketDetailPageProps) => {
    const { id } = await params

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <TicketDetail id={id} />
        </Suspense>
    )
}

export default page
