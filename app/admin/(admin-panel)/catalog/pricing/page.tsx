import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const Pricing = dynamic(
    () => import('@/src/routes/catalog/pricing/Pricing'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function PricingPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <Pricing />
        </Suspense>
    )
}
