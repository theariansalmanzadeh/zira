import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const Discount = dynamic(
    () => import('@/src/routes/catalog/discount/Discount'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function DiscountsPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <Discount />
        </Suspense>
    )
}
