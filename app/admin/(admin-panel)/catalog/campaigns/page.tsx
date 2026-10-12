import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const Campaigne = dynamic(
    () => import('@/src/routes/catalog/campaigne/Campaigne'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function CampaignsPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <Campaigne />
        </Suspense>
    )
}
