import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const ProductDetail = dynamic(
    () => import('@/src/routes/catalog/productDetail/ProductDetail'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function ProductDetailPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <ProductDetail />
        </Suspense>
    )
}
