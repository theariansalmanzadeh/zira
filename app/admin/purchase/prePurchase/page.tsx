import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const PrePurchase = dynamic(
    () => import('@/src/routes/puchase/prePurchase/PrePurchase'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function PrePurchasePage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <PrePurchase />
        </Suspense>
    )
}
