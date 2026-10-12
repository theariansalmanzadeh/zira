import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const Factor = dynamic(
    () => import('@/src/routes/puchase/factors/Factor'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function FactorsPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <Factor />
        </Suspense>
    )
}
