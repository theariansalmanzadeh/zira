'use client'

import { useParams } from 'next/navigation'
import { useGetActiveSession } from '@/src/routes/events/hooks/sessions'
import SessionDetail from '@/src/routes/events/sessionDetail/SessionDetail'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const SessionDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const { data: session, isPending } = useGetActiveSession(id)

    if (isPending) return <TableLoadingSkeleton isPending />

    if (!session) return null

    return <SessionDetail session={session} />
}

export default SessionDetailPage
