import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const BundleList = dynamic(
    () => import('@/src/routes/catalog/bundle/bundleList/BundleList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function BundlesPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <BundleList />
        </Suspense>
    )
}
