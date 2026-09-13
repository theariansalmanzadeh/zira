import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const ProductDetail = dynamic(
    () => import('@/src/routes/categories/productDetail/ProductDetail'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function ProductDetailByIdPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <ProductDetail />
        </Suspense>
    )
}
