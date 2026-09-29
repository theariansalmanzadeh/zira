import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const PackDetail = dynamic(
    () => import('@/src/routes/categories/packDetail/PackDetail'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function PackDetailPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <PackDetail />
        </Suspense>
    )
}
