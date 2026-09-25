import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const ProductTurnoverDetail = dynamic(
    () =>
        import(
            '@/src/routes/branches/productTurnover/ProductTurnoverDetail'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function ProductTurnoverDetailPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <ProductTurnoverDetail />
        </Suspense>
    )
}
