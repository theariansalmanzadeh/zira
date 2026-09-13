import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const BrandsList = dynamic(
    () => import('@/src/routes/categories/brands/BrandsList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function BrandsPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <BrandsList />
        </Suspense>
    )
}
