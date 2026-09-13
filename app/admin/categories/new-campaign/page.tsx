import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const NewCampaigne = dynamic(
    () => import('@/src/routes/categories/newCampaigne/NewCampaigne'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function NewCampaignPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <NewCampaigne />
        </Suspense>
    )
}
