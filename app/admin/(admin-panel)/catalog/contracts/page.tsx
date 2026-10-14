import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const Contracts = dynamic(
    () => import('@/src/routes/catalog/contracts/Contracts'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function PricingPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <Contracts />
        </Suspense>
    )
}
